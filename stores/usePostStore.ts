import { create } from 'zustand';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  users: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const posts = await response.json();
      set({ posts, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },


  refreshData: async () => {
    const { fetchPosts } = get();
    await Promise.all([fetchPosts()]);
  },
}));