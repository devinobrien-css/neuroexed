import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchData, putData, removeData, updateData } from '../api/dba';
import { BlogFormInput, BlogResponse } from '../types/blog.types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { sort_order } from '../types/object_schema';

/** Custom hook for blogs
 */
const useBlogs = () => {
  /** GET blogs
   * @returns BlogResponse[]
   * @example
   * [
   *  {
   *    title: 'blog1',
   *    type: 'blog',
   *    date: '2021-01-01',
   *    source: 'https://www.google.com',
   *    content: 'This is a blog'
   *  },
   * ]
   */
  const { data: blogs, refetch: refetchBlogs } = useQuery({
    queryKey: ['BLOGS'],
    queryFn: async () => {
      const blogs: BlogResponse[] = await fetchData('blogs');
      return blogs;
    },
  });

  /** GET blogs, partitioned into groups of 4
   * @returns BlogResponse[][]
   * @example
   * [
   *   [blog1, blog2, blog3, blog4],
   *   [blog5, blog6, blog7, blog8],
   *   [blog9, blog10, blog11, blog12],
   * ]
   * @see https://stackoverflow.com/questions/8495687/split-array-into-chunks
   */
  const { data: partitioned_blogs } = useQuery({
    queryKey: ['PARTITIONED_BLOGS'],
    queryFn: async () => {
      const blogs: BlogResponse[] = await fetchData('blogs');

      const partitionedBlogs: BlogResponse[][] = [];
      for (let i = 0; i < blogs.length; i++) {
        const current_list = [];
        for (let j = 0; j < 4; j++) {
          if (j + i === blogs.length) continue;
          else current_list.push(blogs[i + j]);
        }
        partitionedBlogs.push(current_list);
        i += 3;
      }
      return partitionedBlogs;
    },
  });

  /** PUT blog
   * @param {*} data - BlogFormInput
   * @returns void
   */
  const { mutate: updateBlog } = useMutation<void, AxiosError, BlogFormInput>({
    mutationFn: async (data: BlogFormInput) => {
      await updateData('blogs', {
        id: data.id,
        media_title: data.title,
        media_type: data.type,
        media_date: data.date,
        media_source: data.source,
        media_content: data.content,
        order: data.order,
      });
    },
    onSuccess: () => {
      toast.success('Blog has been updated!');
      refetchBlogs();
    },
    onError: () => {
      toast.error('Blog could not be updated');
    },
  });

  /** DELETE blog
   * @param {*} title - string
   * @returns void
   */
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
    partitioned_blogs: partitioned_blogs,
    updateBlog,
    deleteBlog,
    refetchBlogs,
  };
};

export default useBlogs;
