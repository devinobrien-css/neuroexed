import { useState } from 'react';
import { BlogForm } from './BlogForm';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { Button } from '../../../../shared/components/form/Button';
import { FormProvider, useForm } from 'react-hook-form';
import {
  BLOGS_QUERY_KEY,
  useCreateBlog,
} from '../../../../shared/hooks/blogHooks';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const NewBlog = ({
  setNewBlog,
}: {
  setNewBlog: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: createBlog } = useCreateBlog({
    onSuccess: async () => {
      await queryClient.invalidateQueries(BLOGS_QUERY_KEY);
      setIsOpen(false);
      toast.success('Blog has been created!');
    },
    onError: () => {
      toast.error('Blog creation failed.');
    },
  });

  const form = useForm<BlogFormInput>();
  const { handleSubmit, watch, reset } = form;

  const onSubmit = (blog: BlogFormInput) => {
    createBlog({ blog });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between px-2 py-4">
          <p className="font-light md:text-2xl">{watch('title')}</p>
          <div className="flex justify-end gap-x-4">
            <Button
              color="gray"
              type="button"
              onClick={() => {
                if (isOpen) {
                  setNewBlog(false);
                  reset();
                }
                setIsOpen(!isOpen);
              }}
              title={isOpen ? 'cancel' : 'edit'}
            />
            {isOpen && (
              <>
                <Button color="blue" type="submit" title="confirm" />
                <Button
                  color="red"
                  title="delete"
                  type="button"
                  onClick={() => {
                    reset();
                    setNewBlog(false);
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
        <BlogForm isOpen={isOpen} />
      </form>
    </FormProvider>
  );
};
