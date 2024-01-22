import { useState } from 'react';
import { useBlogsQuery } from '../../../shared/hooks/blogHooks';
import { Button } from '../../../shared/components/form/Button';
import { EditableBlog } from './components/EditableBlog';
import { NewBlog } from './components/NewBlog';
import { SortBlogsModal } from './components/SortBlogsModal';

const BlogAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [search, setSearch] = useState('');
  const [newBlog, setNewBlog] = useState(false);

  const { data: blogs, refetch: refetchBlogs } = useBlogsQuery();

  return (
    <>
      {editOrder && (
        <SortBlogsModal
          blogs={blogs}
          closeModal={() => setEditOrder(false)}
          refetchBlogs={() => refetchBlogs()}
        />
      )}
      <div>
        <div className="sticky top-0 z-100 flex flex-col justify-between gap-y-4 bg-gray-50 py-8 shadow md:flex-row">
          <input
            id="search"
            name="search"
            value={search}
            placeholder="search..."
            className="mx-8 my-auto rounded-xl border-2 p-4 shadow md:w-1/3"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="mx-auto flex gap-x-2 md:mx-4">
            <Button
              color="gray"
              onClick={() => {
                setEditOrder(true);
              }}
              title="edit order"
            />
            <Button
              color="gray"
              onClick={() => setNewBlog(true)}
              title="add new blog"
            />
          </div>
        </div>
        <div className="mx-auto divide-y p-4 md:w-9/12">
          {newBlog && <NewBlog setNewBlog={setNewBlog} />}
          {blogs
            ?.filter(
              (blog) =>
                blog?.media_title?.toLowerCase().includes(search.toLowerCase()),
            )
            ?.map((blog) => (
              <EditableBlog key={blog.media_title} blog={blog} />
            ))}
        </div>
      </div>
    </>
  );
};

export default BlogAccess;
