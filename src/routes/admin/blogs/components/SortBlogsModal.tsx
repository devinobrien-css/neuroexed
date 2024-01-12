import { updateOrder } from '../../../../shared/api/dba';
import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';
import { BlogResponse } from '../../../../shared/types/blog.types';

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
    <Modal className="" closeModal={closeModal}>
      <DragAndDrogList
        items={(blogs ?? []).map((blog) => {
          return {
            label: blog.media_title,
            value: blog.id,
          };
        })}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
