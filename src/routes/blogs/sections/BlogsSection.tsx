import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Loader } from '../../../shared/components/Loader';
import { useBlogsQuery } from '../../../shared/hooks/blogHooks';
import { BlogResponse } from '../../../shared/types/blog.types';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import BlogCard from '../components/BlogCard';

const BlogsSection = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'BLOG' | 'PODCAST'>(
    'ALL',
  );
  const debouncedSearch = useDebounce<string>(search, 300);

  const { data: blogs, isLoading } = useBlogsQuery();

  // Filter blogs based on search and type
  const filteredBlogs = blogs?.filter((blog: BlogResponse) => {
    const matchesSearch =
      blog.media_title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      blog.media_content?.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesType =
      selectedType === 'ALL' || blog.media_type === selectedType;

    return matchesSearch && matchesType;
  });

  const blogCount =
    filteredBlogs?.filter((blog) => blog.media_type === 'BLOG').length ?? 0;
  const podcastCount =
    filteredBlogs?.filter((blog) => blog.media_type === 'PODCAST').length ?? 0;

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
    <div className="mx-auto my-16 max-w-7xl px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 font-raleway text-4xl font-light md:text-6xl">
          <span className="bg-gradient-to-r from-tiffany-blue to-purple-600 bg-clip-text text-transparent">
            Explore Our Content
          </span>
        </h2>
        <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-purple-600"></div>
        <p className="mx-auto max-w-3xl font-lato text-xl font-light text-gray-600">
          Dive into our collection of research insights, educational content,
          and thought-provoking discussions
        </p>
        <p className="text-lg font-light text-gray-700">
          We host our blogs on our sister site, The Other Lobe, which you can
          find{' '}
          <a
            href="http://otherlobe.com/"
            className="text-tiffany-blue underline underline-offset-2 transition-colors hover:text-blue-700"
          >
            here
          </a>{' '}
          .
        </p>
      </motion.div>

      {/* Filter and Search Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        {/* Type Filter Tabs */}
        <div className="mb-6 flex justify-center">
          <div className="flex rounded-full bg-gray-100 p-1">
            {[
              {
                key: 'ALL',
                label: 'All Content',
                count: blogCount + podcastCount,
              },
              { key: 'BLOG', label: 'Blog Posts', count: blogCount },
              { key: 'PODCAST', label: 'Podcasts', count: podcastCount },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedType(key as 'ALL' | 'BLOG' | 'PODCAST')
                }
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedType === key
                    ? 'bg-gradient-to-r from-tiffany-blue to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-auto flex max-w-2xl items-center justify-between rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm transition-all focus-within:border-tiffany-blue focus-within:ring focus-within:ring-tiffany-blue/20">
          <div className="flex flex-1 items-center">
            <Icon icon="tabler:search" className="mr-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full border-none bg-transparent font-lato text-lg font-light text-gray-700 outline-none placeholder:text-gray-400"
              placeholder="Search blog posts and podcasts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="ml-2 rounded-full p-1 text-gray-400 transition-colors hover:text-gray-600"
            >
              <Icon icon="tabler:x" className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Info */}
        {debouncedSearch && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredBlogs?.length ?? 0} result
              {(filteredBlogs?.length ?? 0) !== 1 ? 's' : ''} for "
              {debouncedSearch}"
              {selectedType !== 'ALL' && ` in ${selectedType.toLowerCase()}s`}
            </p>
          </div>
        )}
      </motion.div>

      {/* Content Grid */}
      {isLoading && <Loader />}

      {!isLoading && filteredBlogs && filteredBlogs.length > 0 && (
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredBlogs.map((blog: BlogResponse) => (
            <motion.div key={blog.media_title} variants={item}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isLoading && (!filteredBlogs || filteredBlogs.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-white p-12 text-center shadow-lg"
        >
          <div className="mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <Icon
              icon="tabler:search-off"
              className="h-12 w-12 text-gray-400"
            />
          </div>
          <h3 className="mb-3 text-2xl font-medium text-gray-700">
            No Content Found
          </h3>
          <p className="mb-6 max-w-md text-gray-500">
            We couldn't find any{' '}
            {selectedType === 'ALL'
              ? 'content'
              : selectedType.toLowerCase() + 's'}{' '}
            matching your search criteria. Try adjusting your search terms or
            browse all content.
          </p>
          <div className="flex gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tiffany-blue to-purple-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:translate-y-[-2px] hover:shadow-lg"
              onClick={() => {
                setSearch('');
                setSelectedType('ALL');
              }}
            >
              <Icon icon="tabler:refresh" className="h-4 w-4" />
              Reset Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogsSection;
