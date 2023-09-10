import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchData, putData, removeData } from '../api/dba';
import { BlogFormInput, BlogResponse, blog } from '../types/blog.types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { sort_order } from '../types/object_schema';

const useBlogs = () => {
  const { data: blogs, refetch: refetchBlogs } = useQuery({
    queryKey: ['BLOGS'],
    queryFn: async () => {
      const sort = (await fetchData('sort-orders')) as Record<string, string[]>;
      const res = (await fetchData('blogs')) as BlogResponse[];
      return sort['blogs'].map(
        (title) => res.filter((m) => m.media_title === title)[0],
      );
    },
  });

  const { mutate: updateBlog } = useMutation<void, AxiosError, BlogFormInput>({
    mutationFn: async (data: BlogFormInput) => {
      await putData(
        'blogs',
        blog(data.title, data.type, data.date, data.source, data.content),
      );
    },
    onSuccess: () => {
      toast.success('Blog has been updated!');
      refetchBlogs();
    },
    onError: () => toast.error('Blog could not be updated'),
  });

  const { mutate: deleteBlog } = useMutation<void, AxiosError, string>({
    mutationFn: async (title) => {
      await removeData('blogs', {
        title: { S: title },
      });
      const sort = await fetchData('sort-orders');
      const output = sort['blogs'].filter((blog: string) => {
        return blog !== title;
      });
      await putData('sort-orders', sort_order('blogs', output));
    },
    onSuccess: async () => {
      await refetchBlogs();
      toast.success('Blog has been deleted!');
    },
    onError: () => toast.error('Blog could not be deleted'),
  });

  return {
    blogs: blogs,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogs;
