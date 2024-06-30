import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useNews from '../../../shared/hooks/useNews';
import { Post } from '../../../shared/types/post.types';

export const Posts = () => {
  const { posts } = useNews();

  return (
    <div className="mx-auto my-32 max-w-screen-lg">
      <p className="w-fit font-raleway text-4xl transition-all md:text-6xl">
        Our Latest Updates
      </p>
      <p className="w-fit font-lato text-xl font-light text-gray-700 transition-all md:text-2xl">
        Get caught up on the latest news from the Center
      </p>
      <div className="flex flex-col gap-y-12 py-12">
        {posts?.map((post: Post) => {
          return (
            <div className="mx-auto w-4/5 bg-white p-4" key={post.title}>
              <p className="font-raleway text-2xl">{post.title}</p>
              <p className="font-lato font-light text-gray-700">
                {new Date(post.date).toDateString()}
              </p>
              <br />

              <ReactMarkdown className="font-light text-gray-700 [&>*>a]:underline">
                {post.content}
              </ReactMarkdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};
