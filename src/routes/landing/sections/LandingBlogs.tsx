import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Loader } from '../../../shared/components/Loader';
import useBlogs from '../../../shared/hooks/blogHooks';
import { BlogResponse } from '../../../shared/types/blog.types';
import cx from 'classnames';
import { Modal } from '../../../shared/components/modals/Modal';

const BlogMd = ({
  media_title,
  media_type,
  media_date,
  media_source,
  media_content,
  className,
}: BlogResponse & { className?: string }) => {
  const [viewDescription, setViewDescription] = useState(false);

  return (
    <>
      {viewDescription && (
        <Modal
          closeModal={() => setViewDescription(false)}
          className="max-w-2xl p-12 md:h-full md:w-2/3"
        >
          <div className="flex justify-between border-b">
            <p
              className={
                'flex pb-2 font-lato text-2xl font-light text-moonstone'
              }
            >
              {media_type === 'BLOG' ? 'Blog' : 'Podcast'}
            </p>
            <p className="my-auto font-lato text-xl font-light text-paynes-grey">
              {new Date(media_date).toDateString()}
            </p>
          </div>
          <p className={'font-lato text-xl font-light'}>{media_title}</p>
          <p className={'font-lato text-xl font-light'}>-</p>
          <p className={'font-lato text-lg font-light'}>{media_content}</p>
          <a
            className={cx(
              className,
              'mx-auto my-4 block h-min rounded border border-paynes-grey bg-opacity-90  px-4 py-1 text-center text-lg text-paynes-grey shadow transition-colors hover:bg-tiffany-blue active:scale-105',
            )}
            href={media_source}
            rel="noreferrer noopener"
            target="_blank"
          >
            read the full post
          </a>
        </Modal>
      )}
      <div
        className={cx(
          'h-128 group mx-auto border bg-white shadow transition-all hover:shadow-xl',
          className,
        )}
      >
        <button onClick={() => setViewDescription(true)}>
          <div className="shrink-0 p-4 text-left">
            <div>
              <div className="flex justify-between border-b">
                <p
                  className={
                    'flex pb-2 font-lato text-2xl font-light text-moonstone'
                  }
                >
                  {media_type === 'BLOG' ? 'Blog' : 'Podcast'}
                </p>
                <p className="my-auto font-lato text-xl font-light text-paynes-grey">
                  {new Date(media_date).toDateString()}
                </p>
              </div>
              <p className={'p-2 font-lato text-xl font-light'}>
                {media_title}
              </p>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

const LandingBlogs = ({ includeTitle = true }: { includeTitle?: boolean }) => {
  const { partitioned_blogs } = useBlogs();
  const [paginate, setPaginate] = useState(0);

  const increment = () => {
    if (paginate - 1 < (partitioned_blogs?.length ?? 0)) {
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
      className="mx-auto my-4 max-w-screen-lg bg-cover bg-center bg-no-repeat transition-all"
    >
      {includeTitle && (
        <p className="mb-8 text-center font-raleway text-4xl font-light md:text-6xl">
          Blog Posts and Podcasts
        </p>
      )}

      <div className="flex flex-wrap gap-6">
        {partitioned_blogs?.[paginate]?.map((blog: BlogResponse) => {
          return (
            <BlogMd key={blog.media_title} className="md:w-[48%]" {...blog} />
          );
        })}
      </div>
      <div className="flex w-full justify-between">
        <button
          className={`group px-8 py-6 ${
            paginate > 0 ? '' : 'pointer-events-none cursor-not-allowed'
          }`}
          onClick={decrement}
        >
          <Icon
            icon="lucide:chevron-first"
            className="rounded-full text-4xl text-paynes-grey transition-colors duration-500 group-hover:bg-gray-200 group-hover:text-white group-hover:shadow-xl"
          />
        </button>
        <p className="my-6 font-raleway text-xl italic text-paynes-grey">
          page {paginate + 1} of {partitioned_blogs?.length}
        </p>
        <button
          className={`group px-8 py-6 ${
            paginate === (partitioned_blogs?.length ?? 0) - 1
              ? 'pointer-events-none cursor-not-allowed'
              : ''
          }`}
          onClick={increment}
        >
          <Icon
            icon="lucide:chevron-last"
            className="rounded-full text-4xl text-paynes-grey transition-colors duration-500 group-hover:bg-gray-200 group-hover:text-white group-hover:shadow-xl"
          />
        </button>
      </div>

      {!partitioned_blogs && <Loader />}
    </div>
  );
};

export default LandingBlogs;
