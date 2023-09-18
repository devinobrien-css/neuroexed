import { putData } from '../../../../shared/api/dba';
import { sort_order } from '../../../../shared/types/object_schema';
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
  refetchBlogs: () => any;
}) => {
  const onSubmit = async (items: string[]) => {
    try {
      await putData(
        'sort-orders',
        sort_order(
          'blogs',
          items.map((i) => ({ S: i })),
        ),
      );
      closeModal();
      await refetchBlogs();
      toast.success('Blogs have been updated!');
    } catch (e: any) {
      toast.error('Blog update failed.');
    }
  };

  return (
    <Modal className="" closeModal={closeModal}>
      <DragAndDrogList
        items={(blogs ?? []).map((blog) => ({
          label: blog!.media_title,
          value: blog!.media_title ?? '',
        }))}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
