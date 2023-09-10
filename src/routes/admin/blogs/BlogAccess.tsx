import { useState } from 'react';
import useBlogs from '../../../shared/hooks/useBlogs';
import { Button } from '../../../shared/components/form/Button';
import { EditableBlog } from './components/EditableBlog';
import { NewBlog } from './components/NewBlog';

const BlogAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [search, setSearch] = useState('');
  const [newBlog, setNewBlog] = useState(false);

  const { blogs } = useBlogs();

  if (blogs) {
    return (
      <>
        {editOrder ? (
          <div className="absolute left-10 w-4/5 rounded bg-gray-100 shadow-lg ">
            <button
              className="absolute right-0 top-0 z-[55] rounded bg-gray-200 px-2 hover:bg-blue-100"
              onClick={() => {
                setEditOrder(false);
              }}
            >
              X
            </button>
            <p className="px-2 italic text-red-400">
              (confirming changes will refresh the page)
            </p>
            {/* <SortableBlogList items={blogs} /> */}
          </div>
        ) : (
          <></>
        )}
        <div>
          <div className="flex flex-col justify-between gap-y-4 py-8 md:flex-row">
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
          <div className="divide-y md:px-24">
            {newBlog ? <NewBlog /> : <></>}
            {blogs
              ?.filter(
                (blog) =>
                  blog?.media_title
                    ?.toLowerCase()
                    .includes(search.toLowerCase()),
              )
              .map((blog) => (
                <EditableBlog key={blog.media_title} blog={blog} />
              ))}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default BlogAccess;
