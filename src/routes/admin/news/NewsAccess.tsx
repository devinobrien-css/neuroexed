import { useState } from 'react';
import useNews from '../../../shared/hooks/useNews';
import { Button } from '../../../shared/components/form/Button';
import { NewPost } from './components/NewPost';
import { Post } from '../../../shared/types/post.types';
import { EditablePost } from './components/EditablePost';

const NewsAccess = () => {
  const [newPost, setNewPost] = useState(false);
  const [search, setSearch] = useState('');
  const { posts } = useNews();

  return (
    <div className="">
      <div className="flex flex-col justify-between gap-y-4 py-8 md:flex-row">
        <input
          id="search"
          name="search"
          value={search}
          placeholder="search..."
          className="mx-8 my-auto rounded-xl border-2 p-4 shadow md:w-1/3"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className="mx-auto flex gap-x-2 md:mx-4">
          <Button
            color="gray"
            title="add new post"
            onClick={() => setNewPost(true)}
          />
        </div>
      </div>
      <div className="mx-auto flex flex-col divide-y md:max-w-screen-2xl">
        {newPost && <NewPost />}
        {posts
          ?.filter(
            (post: Post) =>
              post?.content?.toLowerCase().includes(search.toLowerCase()),
          )
          .map((post: Post) => <EditablePost key={post.content} post={post} />)}
      </div>
    </div>
  );
};

export default NewsAccess;
