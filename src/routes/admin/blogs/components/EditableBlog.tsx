import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import useBlogs from '../../../../shared/hooks/useBlogs';
import { useForm } from 'react-hook-form';
import {
  BlogFormInput,
  BlogResponse,
} from '../../../../shared/types/blog.types';
import { BlogForm } from './BlogForm';
import { Icon } from '@iconify/react';

export const EditableBlog = ({ blog }: { blog: BlogResponse }) => {
  const [open, setOpen] = useState(false);

  const { updateBlog, deleteBlog } = useBlogs();

  const { register, handleSubmit } = useForm<BlogFormInput>({
    defaultValues: {
      id: blog.id,
      title: blog.media_title,
      date: blog.media_date,
      content: blog.media_content,
      source: blog.media_source,
      type: blog.media_type,
      order: blog.order,
    },
  });

  const onSubmit = (blog: BlogFormInput) => {
    updateBlog(blog);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between px-2 py-4">
        <div className="flex gap-x-2">
          {blog.media_type === 'BLOG' ? (
            <div className="my-auto border-r px-2">
              <Icon
                icon="mdi:newspaper-variant-multiple-outline"
                className="my-auto h-8 w-8"
              />
              <p className="m-0 p-0 text-center font-lato font-light">blog</p>
            </div>
          ) : (
            <div className="my-auto border-r px-2">
              <Icon icon="ic:round-video-library" className="my-auto h-8 w-8" />
              <p className="m-0 p-0 text-center font-lato font-light">cast</p>
            </div>
          )}
          <p className="my-auto font-light md:text-2xl">{blog.media_title}</p>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            color="blue"
            type="button"
            onClick={() => {
              open ? setOpen(false) : setOpen(true);
            }}
            title={open ? 'cancel' : 'edit'}
          />
          {open ? (
            <>
              <Button color="yellow" type="submit" title="confirm" />
              <Button
                color="red"
                title="delete"
                type="button"
                onClick={() => {
                  deleteBlog(blog.media_title);
                  setOpen(false);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <BlogForm register={register} state={open} />
    </form>
  );
};
