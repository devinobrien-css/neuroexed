import { useQuery } from '@tanstack/react-query';
import { fetchData, putData, removeData, updateData } from '../api/dba';
import { BlogFormInput, BlogResponse } from '../types/blog.types';
import { createAPIMutation, createAPIQuery } from '../api/api';

const BLOGS_TABLE = 'blogs';
export const BLOGS_QUERY_KEY = ['/blogs'];

/** GET blogs
 * @returns BlogResponse[]
 */
export const useBlogsQuery = createAPIQuery<BlogResponse[]>({
  queryKey: BLOGS_QUERY_KEY,
  queryFn: async () => {
    const res = (await fetchData(BLOGS_TABLE)) as BlogResponse[];
    return res;
  },
});

/** DELETE blog
 * @param {*} id - string
 * @returns void
 * @example
 * deleteBlog({
 *  id: 'blog1'
 * })
 */
interface DeleteBlogParams {
  id: string;
}
export const useDeleteBlog = createAPIMutation<void, DeleteBlogParams>({
  mutationFn: async ({ id }: DeleteBlogParams) => {
    await removeData(BLOGS_TABLE, {
      title: { S: id },
    });
  },
});

/** UPDATE blog
 * @param {*} blog - BlogFormInput
 * @returns void
 * @example
 * updateBlog({
 *  id: 'blog1',
 *  title: 'blog1',
 *  type: 'blog',
 *  date: '2021-01-01',
 *  source: 'https://www.google.com',
 *  content: 'This is a blog'
 * })
 */
interface UpdateBlogProps {
  blog: BlogFormInput;
}
export const useUpdateBlog = createAPIMutation<void, UpdateBlogProps>({
  mutationFn: async ({ blog }: UpdateBlogProps) => {
    await updateData(BLOGS_TABLE, {
      id: blog.id,
      media_title: blog.title,
      media_type: blog.type,
      media_date: blog.date,
      media_source: blog.source,
      media_content: blog.content,
      order: blog.order,
    });
  },
});

/** CREATE blog
 * @param {*} blog - BlogFormInput
 * @returns void
 * @example
 * createBlog({
 *  id: 'blog1',
 *  title: 'blog1',
 *  type: 'blog',
 *  date: '2021-01-01',
 *  source: 'https://www.google.com',
 *  content: 'This is a blog'
 * })
 */
interface CreateBlogProps {
  blog: BlogFormInput;
}
export const useCreateBlog = createAPIMutation<void, CreateBlogProps>({
  mutationFn: async ({ blog }: CreateBlogProps) => {
    await putData(BLOGS_TABLE, {
      id: blog.id,
      media_title: blog.title,
      media_type: blog.type,
      media_date: blog.date,
      media_source: blog.source,
      media_content: blog.content,
      order: blog.order,
    });
  },
});

/** Custom hook for blogs
 */
const useBlogs = () => {
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

  return {
    partitioned_blogs: partitioned_blogs,
  };
};

export default useBlogs;
