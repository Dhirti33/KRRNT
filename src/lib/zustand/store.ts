// lib/stores/usePostStore.ts
import { create } from 'zustand'

interface PostState {
  // State from Login User
  ID: string
  email: string

  // profile state
  name?: string
  username?: string
  bio?: string
  location?: string
  // Post State
  // These fields are used to create a new post
  imageUrls: string[]
  status: string

  // Update for the user ID and email can be added if needed
  setID: (id: string) => void
  setUserEmail: (email: string) => void

  // Setting profile information
  setName: (name: string) => void
  setUsername: (username: string) => void
  setBio: (bio: string) => void
  setLocation: (location: string) => void
  // Methods to update the post state
  setImageUrls: (urls: string[]) => void
  setStatus: (status: string) => void
  reset: () => void
}

export const usePostStore = create<PostState>(set => ({
  // State from Login User
  ID: '',
  email: '',
  // Profile state
  name: '',
  username: '',
  bio: '',
  location: '',
  // Post State
  imageUrls: [],
  status: '',
  // Methods to update the state
  setID: id => set({ ID: id }),
  setUserEmail: email => set({ email }),
  // Setting profile information
  setName: name => set({ name }),
  setUsername: username => set({ username }),
  setBio: bio => set({ bio }),
  setLocation: location => set({ location }),
  // Methods to update the post state
  setImageUrls: imageUrls => set({ imageUrls }),
  setStatus: status => set({ status }),
  reset: () =>
    set({
      ID: '',
      email: '',
      name: '',
      username: '',
      bio: '',
      location: '',
      imageUrls: [],
      status: '',
    }),
}))
