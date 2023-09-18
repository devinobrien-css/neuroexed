import { useState } from 'react';
import { BlogForm } from './BlogForm';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { Button } from '../../../../shared/components/form/Button';
import { useForm } from 'react-hook-form';
import useBlogs from '../../../../shared/hooks/useBlogs';

export const NewBlog = () => {
  const [state, setState] = useState(true);

  const { updateBlog } = useBlogs();
  const { register, handleSubmit, watch, reset } = useForm<BlogFormInput>();

  const onSubmit = (blog: BlogFormInput) => {
    updateBlog(blog);
    setState(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between px-2 py-4">
        <p className="font-light md:text-2xl">{watch('title')}</p>
        <div className="flex justify-end gap-x-4">
          <Button
            color="blue"
            type="button"
            onClick={() => {
              state ? setState(false) : setState(true);
            }}
            title={state ? 'cancel' : 'edit'}
          />
          {state ? (
            <>
              <Button color="yellow" type="submit" title="confirm" />
              <Button
                color="red"
                title="delete"
                type="button"
                onClick={() => {
                  reset();
                  setState(false);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <BlogForm register={register} state={state} />
    </form>
  );
};
