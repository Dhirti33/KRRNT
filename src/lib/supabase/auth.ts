import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const CreateUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const SignInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const SignOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

// Function to upload an image to Supabase storage
export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `posts/${fileName}`;

  const { error } = await supabase.storage
    .from('post-images')
    .upload(filePath, file);


  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath);

    console.log('Uploaded image public URL:', publicUrl);

  return publicUrl;
};

// Insert a new post into the 'posts' table
// Returns the inserted post or null if an error occurs
export const insertPost = async (
  content: string, 
  images: string[], 
  userId: string, 
  date: string
) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        content,
        images,
        user_id: userId,
        created_at: date,
      })
      .select() // Add this to return the inserted data
      .single();

    if (error) {
      console.error('Insert error details:', {
        message: error.message,
        code: error.code,
        details: error.details
      });
      throw error;
    }
    

    return data;
  } catch (err) {
    console.error('Full insertPost error:', err);
    throw new Error('Failed to create post: ' + (err as Error).message);
  }
};

// Function to fetch posts from the 'posts' table
// Returns an array of posts or an empty array if an error occurs
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

// fetch a single post by ID
export const fetchPostById = async (postId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

// fetch profiles
export const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};


// insert the post likes
export const updatePostLikes = async (postId: string, likes: number) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ likes })
    .eq('id', postId)
    .select()
    .single();

  if (error) {
    console.error('Update likes error:', error);
    throw new Error(error.message);
  }

  return data;
}


// Function to update the number of comments on a post
export const updatePostComments = async (postId: string, comments: number) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ comments })
    .eq('id', postId)
    .select()
    .single();

  if (error) {
    console.error('Update comments error:', error);
    throw new Error(error.message);
  }

  return data;
}

// Add this function to push a comment object into the comments array column
export const addCommentToPost = async (
  postId: string,
  commentObj: { comment_by: string; comment: string }
) => {
  // Fetch the current comments array
  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('comments')
    .eq('id', postId)
    .single();

  if (fetchError) {
    console.error('Fetch post error:', fetchError);
    throw new Error(fetchError.message);
  }

  // Append the new comment object
  const currentComments = Array.isArray(post.comments) ? post.comments : [];
  const updatedComments = [...currentComments, commentObj];

  // Update the post with the new comments array
  const { data, error: updateError } = await supabase
    .from('posts')
    .update({ comments: updatedComments })
    .eq('id', postId)
    .select()
    .single();

  if (updateError) {
    console.error('Update comments error:', updateError);
    throw new Error(updateError.message);
  }

  return data;
};

// insert a new profile into the 'profiles' table
export const insertProfile = async (userId: string, name: string, username: string, location: string, gender: string, DOB: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      name,
      username,
      location,
      gender,
      DOB,
    })
    .select()
    .single();

  if (error) {
    console.error('Insert profile error:', error);
    throw new Error(error.message);
  }

  return data;
}

// Function to fetch a profile by user ID
export const fetchProfileById = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Fetch profile error:', error);
    return null;
  }

  return data;
}

// Function to update a profile by user ID
export const updateProfile = async (
  userId: string,
  name?: string,
  username?: string,
  location?: string,
  gender?: string,
  DOB?: string,
  bio?: string
) => {
  // Build update object with only provided fields
  const updateObj: Record<string, string> = {};
  if (name !== undefined && name !== "") updateObj.name = name;
  if (username !== undefined && username !== "") updateObj.username = username;
  if (location !== undefined && location !== "") updateObj.location = location;
  if (gender !== undefined && gender !== "") updateObj.gender = gender;
  if (DOB !== undefined && DOB !== "") updateObj.DOB = DOB;
  if (bio !== undefined && bio !== "") updateObj.bio = bio;

  if (Object.keys(updateObj).length === 0) {
    throw new Error("No profile fields provided to update.");
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updateObj)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Update profile error:', error);
    throw new Error(error.message);
  }

  return data;
};


// sign out user
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw new Error(error.message);
  }
}





