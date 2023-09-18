import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewsForm } from './PostForm';
import { Post } from '../../../../shared/types/post.types';
import useNews from '../../../../shared/hooks/useNews';
import { Button } from '../../../../shared/components/form/Button';

export const EditablePost = ({ post }: { post: Post }) => {
  const [state, setState] = useState(false);
  const { register, handleSubmit, reset } = useForm<Post>({
    defaultValues: {
      date: post.date,
      title: post.title,
      content: post.content,
    },
  });
  const { updatePost, deletePost } = useNews();

  const onSubmit = (data: Post) => {
    updatePost(data);
    setState(false);
  };

  return (
    <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="font-light md:text-2xl">{post.title ?? 'Post Title'}</p>
          <div className="">
            <Button
              color="gray"
              type="button"
              title={state ? 'cancel' : 'edit'}
              onClick={() => (state ? setState(false) : setState(true))}
            />
            {state && (
              <>
                <Button color="yellow" type="submit" title="confirm" />
                <Button
                  color="red"
                  type="button"
                  onClick={() => {
                    deletePost(post.title);
                    reset();
                    setState(false);
                  }}
                  title="delete"
                />
              </>
            )}
          </div>
        </div>
        <NewsForm register={register} state={state} />
      </div>
    </form>
  );
};
