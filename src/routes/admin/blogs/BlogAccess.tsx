import { useState } from "react";
import useBlogs from "../../../shared/hooks/useBlogs";
import { Button } from "../../../shared/components/form/Button";
import { EditableBlog } from "./components/EditableBlog";

const BlogAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [search, setSearch] = useState("");
  const [newBlog, setNewBlog] = useState(false);

  const { blogs } = useBlogs();

  if (blogs) {
    return (
      <>
        {editOrder ? (
          <div className="absolute bg-gray-100 shadow-lg w-4/5 rounded left-10 ">
            <button
              className="px-2 rounded hover:bg-blue-100 absolute top-0 right-0 z-[55] bg-gray-200"
              onClick={() => {
                setEditOrder(false);
              }}
            >
              X
            </button>
            <p className="text-red-400 italic px-2">
              (confirming changes will refresh the page)
            </p>
            {/* <SortableBlogList items={blogs} /> */}
          </div>
        ) : (
          <></>
        )}
        <div>
          <div className="flex flex-col md:flex-row gap-y-4 justify-between py-8">
            <input
              id="search"
              name="search"
              value={search}
              placeholder="search..."
              className="my-auto border-2 shadow rounded-xl md:w-1/3 p-4 mx-8"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <div className="flex gap-x-2 mx-auto md:mx-4">
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
            {/* {newBlog ? <NewBlog remove={setNewBlog} /> : <></>} */}
            {blogs
              .filter((blog) =>
                blog.title.S.toLowerCase().includes(search.toLowerCase()),
              )
              .map((blog) => (
                <EditableBlog
                  key={blog.data.M.media_title.S}
                  data={blog.data.M}
                />
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
