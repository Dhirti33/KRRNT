import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://kepsoencjtypmdqdrjqb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcHNvZW5janR5cG1kcWRyanFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3ODUxMzgsImV4cCI6MjA2NTM2MTEzOH0.vcvNGhAFYlcemWYcoWXBQs8_6MoIhs6eX7RB_ckwFYU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample data for profiles
const sampleNames = [
  'Alex Johnson', 'Taylor Swift', 'Jamie Smith', 'Morgan Lee', 
  'Casey Brown', 'Jordan Miller', 'Riley Wilson', 'Drew Taylor',
  'Skyler White', 'Peyton Green', 'Quinn Davis', 'Cameron Hall',
  'Blake Martin', 'Avery Clark', 'Reagan Young', 'Spencer King',
  'Addison Wright', 'Emerson Scott', 'Hayden Adams', 'Rowan Baker'
];

const sampleUsernames = [
  'alexj', 'tswift', 'jamies', 'morganl', 'caseyb', 'jmill', 
  'rileydubs', 'drewt', 'skylerw', 'peyton_g', 'quinn_d', 
  'camhall', 'blakem', 'averyc', 'reagany', 'spencerk', 
  'addisonw', 'emersons', 'haydena', 'rowanb'
];

const sampleLocations = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
  'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington DC'
];

const sampleGenders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const sampleDOBs = [
  '1990-05-15', '1988-11-22', '1992-03-08', '1985-07-30', 
  '1995-01-10', '1993-09-18', '1989-12-05', '1991-04-25',
  '1987-08-12', '1994-06-20', '1996-02-14', '1986-10-07'
];

// Sample image URLs from Pexels
const sampleImages = [
  'https://images.pexels.com/photos/15286/pexels-photo.jpg',
  'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
  'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg',
  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
  'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
  'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
  'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
  'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg'
];

// Sample post content
const samplePostContent = [
  'Just enjoying the beautiful weather today! ☀️',
  'Check out this amazing place I visited!',
  'Life is what happens when you\'re busy making other plans.',
  'The journey of a thousand miles begins with one step.',
  'Happiness is not something ready made. It comes from your own actions.',
  'Success is not final, failure is not fatal: It is the courage to continue that counts.',
  'The only way to do great work is to love what you do.',
  'In the middle of every difficulty lies opportunity.',
  'Be the change that you wish to see in the world.',
  'What you get by achieving your goals is not as important as what you become by achieving your goals.',
  'The best way to predict the future is to create it.',
  'Do not watch the clock. Do what it does. Keep going.',
  'Believe you can and you\'re halfway there.',
  'The only limit to our realization of tomorrow is our doubts of today.',
  'It always seems impossible until it\'s done.',
  'You miss 100% of the shots you don\'t take.',
  'Strive not to be a success, but rather to be of value.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'Life is really simple, but we insist on making it complicated.',
  'The secret of getting ahead is getting started.'
];

// Sample comments
const sampleComments = [
  'Great post!', 'I totally agree!', 'Nice one!', 'Love this!', 'So true!',
  'Thanks for sharing!', 'Amazing!', 'Beautiful!', 'Inspiring!', 'Well said!',
  'Couldn\'t agree more!', 'This made my day!', 'Keep it up!', 'Fantastic!',
  'You nailed it!', 'So relatable!', 'Brilliant!', 'Absolutely!', 'Perfect!',
  'This is gold!', 'Spot on!', 'You\'re awesome!', 'Mind blown!', 'Epic!',
  'Legendary!', 'Phenomenal!', 'Outstanding!', 'Superb!', 'Tremendous!',
  'First class!'
];

// Function to get random element from array
const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

// Function to generate random date within the last year
const getRandomDate = () => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
};

// Main function to populate database
const populateDatabase = async () => {
  try {
    // Create 20 users
    const users = [];
    for (let i = 0; i < 20; i++) {
      const email = `user${i+1}@mockmail.dev`;
      const password = `Password${i+1}!`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
      
      // Wait for user confirmation if email confirmation is enabled
      if (!authData.user) {
        console.warn(`User ${email} not created (possibly needs email confirmation). Skipping.`);
        continue;
      }
      
      users.push(authData.user);
      
      // Create profile for the user
      const profileData = {
        id: authData.user.id, // Use 'id' as primary key for profiles
        name: sampleNames[i],
        username: sampleUsernames[i],
        location: getRandomElement(sampleLocations),
        gender: getRandomElement(sampleGenders),
        DOB: getRandomElement(sampleDOBs)
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);
        
      if (profileError) throw profileError;
    }
    
    console.log('Created 20 users and profiles');
    
    // Create 50 posts
    const posts = [];
    for (let i = 0; i < 50; i++) {
      const randomUser = getRandomElement(users);
      const postImages = Math.random() > 0.5 ? [getRandomElement(sampleImages)] : [];
      
      const postData = {
        content: getRandomElement(samplePostContent),
        images: postImages,
        user_id: randomUser.id,
        created_at: getRandomDate().toISOString()
      };
      
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert(postData)
        .select()
        .single();
        
      if (postError) throw postError;
      
      posts.push(post);
    }
    
    console.log('Created 50 posts');
    
    // Create likes for posts
    for (const post of posts) {
      const likeCount = Math.floor(Math.random() * 10); // 0-9 likes per post
      const likers = new Set();
      
      for (let i = 0; i < likeCount; i++) {
        const randomUser = getRandomElement(users);
        
        // Ensure a user only likes a post once
        if (!likers.has(randomUser.id)) {
          likers.add(randomUser.id);
          
          const { error: likeError } = await supabase
            .from('likes')
            .insert({
              post_id: post.id,
              user_id: randomUser.id,
              created_at: new Date().toISOString()
            });
            
          if (likeError) throw likeError;
        }
      }
    }
    
    console.log('Created likes for posts');
    
    // Create comments for posts
    for (const post of posts) {
      const commentCount = Math.floor(Math.random() * 5); // 0-4 comments per post
      
      for (let i = 0; i < commentCount; i++) {
        const randomUser = getRandomElement(users);
        
        const { error: commentError } = await supabase
          .from('comments')
          .insert({
            post_id: post.id,
            user_id: randomUser.id,
            content: getRandomElement(sampleComments),
            created_at: new Date().toISOString()
          });
          
        if (commentError) throw commentError;
      }
    }
    
    console.log('Created comments for posts');
    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// Run the population script
populateDatabase();