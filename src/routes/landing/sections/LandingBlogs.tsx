import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { BlogMd } from '../../../shared/components/custom.library';
import Loader from '../../../shared/components/Loader';
import useBlogs from '../../../shared/hooks/useBlogs';
import { BlogResponse } from '../../../shared/types/blog.types';

const partitionItems = (items: any[], step: number): any[] => {
  const output: any[] = [];

  for (let i = 0; i < items.length; i++) {
    const current_list = [];
    for (let j = 0; j < 4; j++) {
      if (j + i === items.length) continue;
      else current_list.push(items[i + j]);
    }
    output.push(current_list);
    i += 3;
  }
  return output;
};

const LandingBlogs = () => {
  const step = 4;

  const { blogs } = useBlogs();

  const [partitionedBlogs, setBlogs] = useState<any[]>();
  useEffect(() => {
    setBlogs(partitionItems(blogs ?? [], step));
  }, [blogs]);

  const [paginate, setPaginate] = useState(0);
  const increment = () => {
    if (paginate - 1 < partitionedBlogs!.length) {
      setPaginate(paginate + 1);
    }
  };
  const decrement = () => {
    if (paginate > 0) {
      setPaginate(paginate - 1);
    }
  };

  return (
    <div
      id="blogs"
      className="mx-auto my-4 max-w-screen-2xl bg-cover bg-center bg-no-repeat p-4 text-center transition-all"
    >
      <p className="mb-8 font-raleway text-4xl font-light md:text-6xl">
        Blog Posts and Podcasts
      </p>
      {partitionedBlogs ? (
        <>
          <div className="flex flex-wrap gap-6">
            {partitionedBlogs[paginate]?.map((blog: BlogResponse) => {
              return <BlogMd className="md:w-[45%]" {...blog} />;
            })}
          </div>
          <div className="flex w-full justify-between shadow">
            <a
              href="#blogs"
              className={`group border-l px-8 py-6 ${
                paginate > 0 ? '' : 'pointer-events-none cursor-not-allowed'
              }`}
              onClick={decrement}
            >
              <Icon
                icon="lucide:chevron-first"
                className="rounded-full text-4xl text-gray-300 transition-colors duration-500 group-hover:bg-gray-200 group-hover:text-white group-hover:shadow-xl"
              />
            </a>
            <p className="my-6 font-raleway text-lg italic text-gray-400">
              page {paginate + 1} of {partitionedBlogs!.length}
            </p>
            <a
              href="#blogs"
              className={`group border-r px-8 py-6 ${
                paginate === partitionedBlogs!.length - 1
                  ? 'pointer-events-none cursor-not-allowed'
                  : ''
              }`}
              onClick={increment}
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
