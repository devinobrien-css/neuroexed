import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { fetchData } from "../../../shared/api/dba";
import {
  BlogMd,
  BlogStyledMd,
} from "../../../shared/components/custom.library";
import Loader from "../../../shared/components/Loader.component";

function orderJsonObjects(order, objects) {
  const output = [];
  order.forEach((order_by) => {
    output.push(
      objects.filter((object) => {
        return object.title.S === order_by.S;
      })[0],
    );
  });
  return output;
}

const LandingBlogs = () => {
  // const { blogs: getAllBlogs } = useBlogs();
  const [blogs, setBlogs] = useState();
  const getBlogs = async () => {
    const sort = await fetchData("sort-orders");
    const res = await fetchData("blogs");

    if (
      sort?.Items.filter((order) => {
        return order.type.S === "blogs";
      })[0].sort.L.length !== 0
    )
      setBlogs(
        orderJsonObjects(
          sort.Items.filter((order) => {
            return order.type.S === "blogs";
          })[0].sort.L,
          res.Items,
        ),
      );
    else setBlogs(res.Items);
  };
  useEffect(() => {
    getBlogs();
  }, []);

  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(0);
  const step = 4;

  return (
    <div
      id="blogs"
      className="p-4 text-center bg-cover bg-no-repeat my-4 transition-all bg-center max-w-screen-2xl mx-auto"
    >
      <p className="md:text-6xl text-4xl font-raleway font-light mb-8">
        Blog Posts and Podcasts
      </p>
      {blogs ? (
        <>
          <div className="md:flex gap-x-6 space-y-12">
            <div className="md:w-1/2 space-y-12 h-max-content flex flex-col justify-between">
              <BlogMd data={blogs[paginate].data.M} />
              <BlogStyledMd
                data={blogs[paginate + 1].data.M}
                index={paginate + 1}
              />
            </div>
            <div className="md:w-1/2 space-y-12 h-max-content flex flex-wrap-reverse flex-col justify-between">
              <BlogStyledMd
                data={blogs[paginate + 2].data.M}
                index={paginate + 2}
              />
              <BlogMd data={blogs[paginate + 3].data.M} />
            </div>
          </div>
          <div className="w-full shadow flex justify-between">
            <a
              href="#blogs"
              className={`py-6 border-l px-8 group ${
                paginate - step >= 0 ? "" : "cursor-not-allowed"
              }`}
              disabled={paginate - step < 0}
              onClick={() => {
                if (paginate - step >= 0) {
                  setPage(page - 1);
                  setPaginate(paginate - step);
                } else {
                  setPage(1);
                  setPaginate(0);
                }
              }}
            >
              <Icon
                icon="lucide:chevron-first"
                className="text-4xl text-gray-300 rounded-full group-hover:bg-gray-200 group-hover:shadow-xl group-hover:text-white transition-colors duration-500"
              />
            </a>
            <p className="italic text-gray-400 font-raleway text-lg my-6">
              page {page} of {Math.round(blogs?.length / step)}
            </p>
            <a
              href="#blogs"
              className={`group py-6 border-r px-8 ${
                paginate + step >= blogs?.length - 1 ? "cursor-not-allowed" : ""
              }`}
              disabled={paginate + step >= blogs?.length - 1}
              onClick={() => {
                if (paginate + step < blogs?.length) {
                  setPage(page + 1);
                  setPaginate(paginate + step);
                } else {
                  setPage(Math.round(blogs.length / step));
                  setPaginate(blogs?.length);
                }
              }}
            >
              <Icon
                icon="lucide:chevron-last"
                className="text-4xl text-gray-300 rounded-full group-hover:bg-gray-200 group-hover:shadow-xl group-hover:text-white transition-colors duration-500"
              />
            </a>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LandingBlogs;
