import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import {
  BLOGS_QUERY_KEY,
  useDeleteBlog,
  useUpdateBlog,
} from '../../../../shared/hooks/blogHooks';
import { FormProvider, useForm } from 'react-hook-form';
import {
  BlogFormInput,
  BlogResponse,
} from '../../../../shared/types/blog.types';
import { BlogForm } from './BlogForm';
import { Icon } from '@iconify/react';
import { ConfirmationModal } from '../../../../shared/components/modals/ConfirmationModal';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const EditableBlog = ({ blog }: { blog: BlogResponse }) => {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteBlog } = useDeleteBlog({
    onSuccess: async () => {
      await queryClient.invalidateQueries(BLOGS_QUERY_KEY);
      toast.success('Blog has been deleted!');
    },
    onError: () => {
      toast.error('Blog deletion failed.');
    },
  });

  const { mutate: updateBlog } = useUpdateBlog({
    onSuccess: async () => {
      await queryClient.invalidateQueries(BLOGS_QUERY_KEY);
      toast.success('Blog has been updated!');
      setOpen(false);
    },
    onError: () => {
      toast.error('Blog update failed.');
    },
  });

  const form = useForm<BlogFormInput>({
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
  const { handleSubmit, reset } = form;

  const onSubmit = (blog: BlogFormInput) => {
    updateBlog({
      blog,
    });
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full justify-between pt-4 md:flex">
            <div className="flex gap-x-2">
              {blog.media_type === 'BLOG' ? (
                <div className="my-auto border-r px-2">
                  <Icon
                    icon="mdi:newspaper-variant-multiple-outline"
                    className="my-auto h-8 w-8"
                  />
                  <p className="m-0 p-0 text-center font-lato font-light">
                    blog
                  </p>
                </div>
              ) : (
                <div className="my-auto border-r px-2">
                  <Icon
                    icon="ic:round-video-library"
                    className="my-auto h-8 w-8"
                  />
                  <p className="m-0 p-0 text-center font-lato font-light">
                    cast
                  </p>
                </div>
              )}

              <div>
                <p className="my-auto max-w-full font-light md:max-w-xl  md:truncate md:text-xl">
                  {blog.media_title}
                </p>
                <p className="my-auto font-light italic text-gray-400 md:text-lg">
                  {new Date(blog.media_date).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-x-4">
              <Button
                color="gray"
                type="button"
                onClick={() => {
                  if (open) {
                    reset({
                      id: blog.id,
                      title: blog.media_title,
                      date: blog.media_date,
                      content: blog.media_content,
                      source: blog.media_source,
                      type: blog.media_type,
                      order: blog.order,
                    });
                    toast.warn('Unsaved changes have been discarded.', {
                      autoClose: 1000,
                    });
                  }
                  setOpen(!open);
                }}
                title={open ? 'cancel' : 'edit'}
              />
              {open && <Button color="blue" type="submit" title="confirm" />}
              <Button
                color="red"
                title="delete"
                type="button"
                onClick={() => setConfirmDelete(true)}
              />
            </div>
          </div>
          <br />
          <BlogForm isOpen={open} />
        </form>
      </FormProvider>
      {confirmDelete && (
        <ConfirmationModal
          title={'Delete Blog'}
          message={
            <>
              <p>Are you sure you want to delete the blog:</p>
              <p className="font-lato font-bold">{blog.media_title}</p>-
              <p className="italic text-red-500">
                this action cannot be undone
              </p>
            </>
          }
          closeModal={() => setConfirmDelete(false)}
          confirm={() => deleteBlog({ id: blog.media_title })}
          confirmText={'Delete'}
          cancelText={'Cancel'}
        />
      )}
    </>
  );
};
