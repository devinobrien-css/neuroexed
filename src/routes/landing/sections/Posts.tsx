import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useNews from '../../../shared/hooks/useNews';
import { Post } from '../../../shared/types/post.types';
import { motion } from 'framer-motion';

export const Posts = () => {
  const { posts } = useNews();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto my-32 max-w-screen-lg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text font-raleway text-4xl text-transparent md:text-6xl">
          Our Latest Updates
        </h2>
        <p className="mx-auto max-w-2xl font-lato text-xl font-light text-gray-600">
          Get caught up on the latest news from the Center
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-y-12 py-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {posts?.map((post: Post) => {
          return (
            <motion.div
              className="mx-auto w-full rounded-xl bg-white shadow-md transition-all hover:shadow-lg sm:w-4/5"
              key={post.title}
              variants={item}
            >
              <div className="p-6 md:p-8">
                <div className="mb-4 border-l-4 border-tiffany-blue pl-4">
                  <h3 className="font-raleway text-2xl font-medium text-gray-800">
                    {post.title}
                  </h3>
                  <p className="font-lato text-sm font-light text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="prose prose-gray prose-sm md:prose-base max-w-none">
                  <ReactMarkdown className="font-light leading-relaxed text-gray-700 [&>*>a]:text-tiffany-blue [&>*>a]:underline [&>*>a]:underline-offset-2 hover:[&>*>a]:text-blue-600">
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
