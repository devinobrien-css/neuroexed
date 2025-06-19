import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { BlogResponse } from '../../../shared/types/blog.types';
import { Modal } from '../../../shared/components/modals/Modal';

interface BlogCardProps {
  blog: BlogResponse;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const [viewDescription, setViewDescription] = useState(false);

  const isPodcast = blog.media_type === 'PODCAST';
  const blogTypeColor = isPodcast ? 'text-purple-600' : 'text-tiffany-blue';
  const blogTypeIcon = isPodcast ? 'tabler:microphone' : 'tabler:article';

  return (
    <>
      {viewDescription && (
        <Modal
          closeModal={() => setViewDescription(false)}
          className="max-w-3xl rounded-2xl p-8 md:h-full md:w-2/3 md:p-12"
        >
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-3 ${
                  isPodcast ? 'bg-purple-100' : 'bg-blue-100'
                }`}
              >
                <Icon
                  icon={blogTypeIcon}
                  className={`h-6 w-6 ${blogTypeColor}`}
                />
              </div>
              <div>
                <p
                  className={`font-lato text-2xl font-medium ${blogTypeColor}`}
                >
                  {isPodcast ? 'Podcast' : 'Blog Post'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.media_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <h3 className="mb-6 font-raleway text-3xl font-medium text-gray-800 dark:text-dark-text">
            {blog.media_title}
          </h3>

          <div className="prose prose-gray mb-8 max-w-none">
            <p className="font-lato text-lg leading-relaxed text-gray-600">
              {blog.media_content}
            </p>
          </div>

          <div className="flex justify-end">
            <a
              className={`flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
                isPodcast
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                  : 'bg-gradient-to-r from-tiffany-blue to-blue-700 hover:from-blue-700 hover:to-blue-800'
              }`}
              href={blog.media_source}
              rel="noreferrer noopener"
              target="_blank"
            >
              <Icon
                icon={isPodcast ? 'tabler:player-play' : 'tabler:external-link'}
                className="h-5 w-5"
              />
              {isPodcast ? 'Listen to Podcast' : 'Read Full Article'}
            </a>
          </div>
        </Modal>
      )}

      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-dark-surface"
      >
        <button
          onClick={() => setViewDescription(true)}
          className="h-full w-full p-0 text-left"
        >
          {/* Header with gradient */}
          <div
            className={`h-2 w-full ${
              isPodcast
                ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                : 'bg-gradient-to-r from-tiffany-blue to-blue-600'
            }`}
          />

          <div className="p-6">
            {/* Type badge and date */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full p-2 ${
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
              <p className="text-sm text-gray-500">
                {new Date(blog.media_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Title */}
            <h3 className="mb-4 line-clamp-2 font-raleway text-xl font-medium text-gray-800 transition-colors group-hover:text-blue-700 dark:text-dark-text dark:group-hover:text-blue-400">
              {blog.media_title}
            </h3>

            {/* Content preview */}
            <p className="mb-4 line-clamp-3 font-lato leading-relaxed text-gray-600">
              {blog.media_content}
            </p>

            {/* Read more link */}
            <div className="flex justify-end">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-all group-hover:gap-3 group-hover:text-tiffany-blue">
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

export default BlogCard;
