import { SectionTitle } from '../../../shared/components/common.library';
import useNews from '../../../shared/hooks/useNews';
import { Post } from '../../../shared/types/post.types';

export const Posts = () => {
  const { posts } = useNews();

  return (
    <div className="mx-auto my-32 max-w-screen-lg">
      <SectionTitle className="mx-auto w-fit">Our Latest Updates</SectionTitle>
      <div className="flex flex-col gap-y-12 py-12">
        {posts?.map((post: Post) => {
          return (
            <div className="mx-auto w-4/5 bg-white p-4" key={post.title}>
              <p className="font-raleway text-2xl">{post.title}</p>
              <p className="font-lato font-light text-gray-700">
                {new Date(post.date).toDateString()}
              </p>
              <br />
              <p className="font-light text-gray-700">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
