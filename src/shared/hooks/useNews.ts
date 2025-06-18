import { useQuery } from '@tanstack/react-query';
import { fetchData } from './dba';
import { Post } from '../types/post.types';

// Mock data to use when API is unavailable
const mockPosts: Post[] = [
  {
    title: 'New Research on Experiential Learning',
    content: 'Our lab has completed a new study on the effects of experiential learning on cognitive development...',
    date: new Date().toISOString(),
  },
  {
    title: 'Upcoming Conference Presentation',
    content: 'We will be presenting our latest findings at the International Neuroscience Education Conference...',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Modified hook to handle potential API failures more gracefully
const useNews = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['news'],
    queryFn: async () => {
      try {
        // Try to fetch from API
        return await fetchData<Post[]>('/news', 'GET');
      } catch (err) {
        // Return mock data if API fails
        return mockPosts;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once
  });

  const updatePost = (_post: Post) => {
    // Placeholder function - implement actual post update functionality when backend is available
  };

  const deletePost = (_postId: string) => {
    // Placeholder function - implement actual post deletion functionality when backend is available
  };

  return { 
    posts: posts || mockPosts, 
    isLoading,
    error: error ? (error as Error).message : undefined,
    updatePost,
    deletePost
  };
};

export default useNews;