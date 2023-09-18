import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import useBlogs from '../../../../shared/hooks/useBlogs';
import { useForm } from 'react-hook-form';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { BlogForm } from './BlogForm';

export const EditableBlog = ({ blog }: { blog: any }) => {
  const [state, setState] = useState(false);

  const { updateBlog, deleteBlog } = useBlogs();

  const { register, handleSubmit } = useForm<BlogFormInput>({
    defaultValues: {
      title: blog.media_title,
      date: blog.media_date,
      content: blog.media_content,
      source: blog.media_source,
      type: blog.media_type,
    },
  });

  const onSubmit = (blog: BlogFormInput) => {
    updateBlog(blog);
    setState(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between px-2 py-4">
        <p className="font-light md:text-2xl">{blog.media_title}</p>
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
                  deleteBlog(blog.media_title);
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
