import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewsForm } from './PostForm';
import { Post } from '../../../../shared/types/post.types';
import useNews from '../../../../shared/hooks/useNews';
import { Button } from '../../../../shared/components/form/Button';

export const NewPost = () => {
  const [state, setState] = useState(true);
  const { register, handleSubmit, watch, reset } = useForm<Post>();
  const { updatePost } = useNews();

  const onSubmit = (data: Post) => {
    updatePost(data);
    setState(false);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="p-2 font-lato text-xl">
            {watch('title') ?? 'Post Title'}
          </p>
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
