import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Loader } from '../../../shared/components/Loader';
import useBlogs from '../../../shared/hooks/blogHooks';
import { BlogResponse } from '../../../shared/types/blog.types';
import cx from 'classnames';
import { Modal } from '../../../shared/components/modals/Modal';
import { motion } from 'framer-motion';
import { useDebounce } from '../../../shared/hooks/useDebounce';

const BlogMd = ({
  media_title,
  media_type,
  media_date,
  media_source,
  media_content,
  className,
}: BlogResponse & { className?: string }) => {
  const [viewDescription, setViewDescription] = useState(false);

  const isPodcast = media_type === 'PODCAST';
  const blogTypeColor = isPodcast ? 'text-purple-600' : 'text-tiffany-blue';
  const blogTypeIcon = isPodcast ? 'tabler:microphone' : 'tabler:article';

  return (
    <>
      {viewDescription && (
        <Modal
          closeModal={() => setViewDescription(false)}
          className="max-w-2xl rounded-xl p-8 md:h-full md:w-2/3 md:p-12"
        >
          <div className="mb-4 flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-2 ${
                  isPodcast ? 'bg-purple-100' : 'bg-blue-100'
                }`}
              >
                <Icon
                  icon={blogTypeIcon}
                  className={`h-5 w-5 ${blogTypeColor}`}
                />
              </div>
              <p className={`font-lato text-2xl font-light ${blogTypeColor}`}>
                {isPodcast ? 'Podcast' : 'Blog'}
              </p>
            </div>
            <p className="font-lato text-gray-500">
              {new Date(media_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <h3 className="mb-4 font-lato text-2xl font-medium text-gray-800">
            {media_title}
          </h3>

          <div className="prose prose-gray mb-8 max-w-none">
            <p className="font-lato text-lg font-light leading-relaxed text-gray-600">
              {media_content}
            </p>
          </div>

          <a
            className={cx(
              'flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg',
              isPodcast
                ? 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                : 'from-tiffany-blue to-blue-700 hover:from-blue-700 hover:to-blue-800',
            )}
            href={media_source}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Icon
              icon={isPodcast ? 'tabler:player-play' : 'tabler:external-link'}
              className="h-5 w-5"
            />
            {isPodcast ? 'Listen to the podcast' : 'Read the full post'}
          </a>
        </Modal>
      )}

      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={cx(
          'group mx-auto overflow-hidden rounded-xl border bg-white shadow-md transition-all hover:shadow-lg dark:border-dark-border dark:bg-dark-surface',
          className,
        )}
      >
        <button
          onClick={() => setViewDescription(true)}
          className="h-full w-full p-0 text-left"
        >
          <div
            className={
              'h-2 w-full bg-gradient-to-r from-tiffany-blue to-purple-600'
            }
          ></div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full p-1.5 ${
                    isPodcast ? 'bg-purple-100' : 'bg-blue-100'
                  }`}
                >
                  <Icon
                    icon={blogTypeIcon}
                    className={`h-4 w-4 ${blogTypeColor}`}
                  />
                </div>
                <span className={`font-medium ${blogTypeColor}`}>
                  {isPodcast ? 'Podcast' : 'Blog'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                {new Date(media_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            <h3 className="line-clamp-2 font-lato text-xl font-medium text-gray-800 transition-colors group-hover:text-blue-700 dark:text-dark-text dark:group-hover:text-blue-400">
              {media_title}
            </h3>

            <div className="mt-4 flex justify-end">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors group-hover:text-tiffany-blue dark:text-dark-text-secondary">
                Read more
                <Icon
                  icon="tabler:arrow-right"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </button>
      </motion.div>
    </>
  );
};

const LandingBlogs = ({ includeTitle = true }: { includeTitle?: boolean }) => {
  const { partitioned_blogs } = useBlogs();
  const [paginate, setPaginate] = useState(0);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce<string>(search, 300);

  // Flatten all blogs for searching
  const allBlogs = partitioned_blogs?.flat() ?? [];

  // Filter blogs based on search
  const filteredBlogs = allBlogs.filter(
    (blog) =>
      blog.media_title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      blog.media_content
        ?.toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      blog.media_type.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // Re-partition filtered blogs into pages
  const ITEMS_PER_PAGE = 4;
  const filteredPartitionedBlogs = [];
  for (let i = 0; i < filteredBlogs.length; i += ITEMS_PER_PAGE) {
    filteredPartitionedBlogs.push(filteredBlogs.slice(i, i + ITEMS_PER_PAGE));
  }

  const displayBlogs = debouncedSearch
    ? filteredPartitionedBlogs
    : partitioned_blogs;

  const increment = () => {
    if (paginate + 1 < (displayBlogs?.length ?? 0)) {
      setPaginate(paginate + 1);
    }
  };
  const decrement = () => {
    if (paginate > 0) {
      setPaginate(paginate - 1);
    }
  };

  // Reset pagination when search changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPaginate(0);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      id="blogs"
      className="m-auto my-12 flex min-h-screen max-w-screen-lg flex-col px-4 transition-all"
    >
      <div className="m-auto w-full">
        {includeTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-raleway text-4xl font-light md:text-6xl">
              <span className="bg-gradient-to-r from-tiffany-blue to-purple-600 bg-clip-text text-transparent">
                Blog Posts and Podcasts
              </span>
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-purple-600"></div>
            <p className="font-lato text-xl font-light italic text-gray-600">
              Click on a post to read our latest blogs or listen to our latest
              podcasts.
            </p>

            {/* Search bar with modern design */}
            <div className="mx-auto mt-10 max-w-md">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icon
                    icon="tabler:search"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm transition-all focus:border-tiffany-blue focus:outline-none focus:ring focus:ring-tiffany-blue/20"
                  placeholder="Search blogs and podcasts..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {!partitioned_blogs && <Loader />}

        {partitioned_blogs && displayBlogs && displayBlogs.length > 0 && (
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            animate="show"
            key={`${paginate}-${debouncedSearch}`}
          >
            {(displayBlogs?.[paginate] ?? []).map((blog: BlogResponse) => {
              return (
                <motion.div
                  key={`${paginate}-${blog.media_title}`}
                  variants={item}
                >
                  <BlogMd {...blog} />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {partitioned_blogs &&
          debouncedSearch &&
          displayBlogs &&
          displayBlogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-xl bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm"
            >
              <Icon
                icon="tabler:mood-sad"
                className="mb-4 h-16 w-16 text-gray-400"
              />
              <h3 className="mb-2 text-2xl font-medium text-gray-700">
                No Results Found
              </h3>
              <p className="max-w-md text-gray-500">
                We couldn't find any blogs or podcasts matching your search
                criteria. Try using different keywords or browse our complete
                collection.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tiffany-blue to-purple-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:translate-y-[-2px]"
                onClick={() => handleSearchChange('')}
              >
                <Icon icon="tabler:refresh" className="h-5 w-5" />
                Reset Search
              </button>
            </motion.div>
          )}

        {displayBlogs && displayBlogs.length > 1 && (
          <div className="mt-12 flex items-center justify-between">
            <motion.button
              className={`group flex items-center gap-2 rounded-full p-3 ${
                paginate > 0
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              } transition-colors`}
              onClick={decrement}
              whileHover={paginate > 0 ? { scale: 1.1 } : {}}
              whileTap={paginate > 0 ? { scale: 0.9 } : {}}
              disabled={paginate === 0}
            >
              <Icon icon="tabler:chevron-left" className="h-6 w-6" />
              <span className="font-medium">Previous</span>
            </motion.button>

            <div className="text-center">
              <p className="font-raleway text-xl text-gray-600">
                Page {paginate + 1} of {displayBlogs?.length}
              </p>
              {debouncedSearch && (
                <p className="text-sm text-gray-500">
                  Showing {filteredBlogs.length} result
                  {filteredBlogs.length !== 1 ? 's' : ''} for "{debouncedSearch}
                  "
                </p>
              )}
            </div>

            <motion.button
              className={`group flex items-center gap-2 rounded-full p-3 ${
                paginate < (displayBlogs?.length ?? 0) - 1
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              } transition-colors`}
              onClick={increment}
              whileHover={
                paginate < (displayBlogs?.length ?? 0) - 1 ? { scale: 1.1 } : {}
              }
              whileTap={
                paginate < (displayBlogs?.length ?? 0) - 1 ? { scale: 0.9 } : {}
              }
              disabled={paginate === (displayBlogs?.length ?? 0) - 1}
            >
              <span className="font-medium">Next</span>
              <Icon icon="tabler:chevron-right" className="h-6 w-6" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingBlogs;
