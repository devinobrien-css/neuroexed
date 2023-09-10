import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  BlogMd,
  BlogStyledMd,
} from '../../../shared/components/custom.library';
import Loader from '../../../shared/components/Loader';
import useBlogs from '../../../shared/hooks/useBlogs';

const LandingBlogs = () => {
  const { blogs } = useBlogs();

  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(0);
  const step = 4;

  return (
    <div
      id="blogs"
      className="mx-auto my-4 max-w-screen-2xl bg-cover bg-center bg-no-repeat p-4 text-center transition-all"
    >
      <p className="mb-8 font-raleway text-4xl font-light md:text-6xl">
        Blog Posts and Podcasts
      </p>
      {blogs ? (
        <>
          <div className="gap-x-6 space-y-12 md:flex">
            <div className="h-max-content flex flex-col justify-between space-y-12 md:w-1/2">
              <BlogMd data={blogs[paginate]} />
              <BlogStyledMd data={blogs[paginate + 1]} index={paginate + 1} />
            </div>
            <div className="h-max-content flex flex-col flex-wrap-reverse justify-between space-y-12 md:w-1/2">
              <BlogStyledMd data={blogs[paginate + 2]} index={paginate + 2} />
              <BlogMd data={blogs[paginate + 3]} />
            </div>
          </div>
          <div className="flex w-full justify-between shadow">
            <a
              href="#blogs"
              className={`group border-l px-8 py-6 ${
                paginate - step >= 0
                  ? ''
                  : 'pointer-events-none cursor-not-allowed'
              }`}
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
                className="rounded-full text-4xl text-gray-300 transition-colors duration-500 group-hover:bg-gray-200 group-hover:text-white group-hover:shadow-xl"
              />
            </a>
            <p className="my-6 font-raleway text-lg italic text-gray-400">
              page {page} of {Math.round(blogs?.length / step)}
            </p>
            <a
              href="#blogs"
              className={`group border-r px-8 py-6 ${
                paginate + step >= blogs?.length - 1
                  ? 'pointer-events-none cursor-not-allowed'
                  : ''
              }`}
              onClick={() => {
                if (paginate + step < blogs?.length) {
                  setPage(page + 1);
                  setPaginate(paginate + step);
                } else {
                  // setPage(Math.round(blogs.length / step));
                  // setPaginate(blogs?.length);
                }
              }}
            >
              <Icon
                icon="lucide:chevron-last"
                className="rounded-full text-4xl text-gray-300 transition-colors duration-500 group-hover:bg-gray-200 group-hover:text-white group-hover:shadow-xl"
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
