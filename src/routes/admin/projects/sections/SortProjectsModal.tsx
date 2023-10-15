import { putData } from '../../../../shared/api/dba';
import { sort_order } from '../../../../shared/types/object_schema';
import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';
import { Project } from '../../../../shared/types/project.types';

export const SortProjectsModal = ({
  projects,
  closeModal,
  refetchProjects,
}: {
  projects?: Project[];
  closeModal: () => void;
  refetchProjects: () => void;
}) => {
  const onSubmit = async (items: string[]) => {
    try {
      await putData(
        'sort-orders',
        sort_order(
          'projects',
          items.map((i) => ({ S: i })),
        ),
      );
      closeModal();
      await refetchProjects();
      toast.success('Projects have been updated!');
    } catch (e) {
      toast.error('Project update failed.');
    }
  };

  return (
    <Modal className="" closeModal={closeModal}>
      <DragAndDrogList
        items={(projects ?? []).map((project) => ({
          label: project!.title,
          value: project!.title ?? '',
        }))}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
