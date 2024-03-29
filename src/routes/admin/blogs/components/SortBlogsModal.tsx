import { updateOrder } from '../../../../shared/api/dba';
import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';
import { BlogResponse } from '../../../../shared/types/blog.types';
import { Icon } from '@iconify/react';

export const SortBlogsModal = ({
  blogs,
  closeModal,
  refetchBlogs,
}: {
  blogs?: BlogResponse[];
  closeModal: () => void;
  refetchBlogs: () => void;
}) => {
  const onSubmit = async (items: string[]) => {
    try {
      await updateOrder(
        'blogs',
        items.map((item, index) => {
          return {
            id: item,
            order: index,
          };
        }),
      );

      closeModal();
      refetchBlogs();
      toast.success('Blogs have been updated!');
    } catch (_e) {
      toast.error('Blog update failed.');
    }
  };

  return (
    <Modal className="md:w-4/5" closeModal={closeModal}>
      <DragAndDrogList
        items={(blogs ?? []).map((blog) => {
          return {
            label: blog.media_title,
            value: blog.id,
            display: (
              <div className="flex justify-between">
                <div className="flex gap-x-2">
                  {blog.media_type === 'BLOG' ? (
                    <Icon
                      icon="mdi:file-document-outline"
                      className="my-auto h-6 w-6"
                    />
                  ) : (
                    <Icon icon="mdi:youtube" className="my-auto h-6 w-6" />
                  )}

                  <p className="my-auto w-1/2 truncate font-lato text-2xl font-light">
                    {blog.media_title}
                  </p>
                </div>
                <p className="my-auto w-fit font-lato text-2xl font-light">
                  {new Date(blog.media_date).toLocaleDateString()}
                </p>
              </div>
            ),
          };
        })}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
