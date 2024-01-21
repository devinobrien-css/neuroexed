import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';
import { Project } from '../../../../shared/types/project.types';
import { useUpdateProjectsOrder } from '../../../../shared/hooks/projectHooks';
import { Loader } from '../../../../shared/components/Loader';

export const SortProjectsModal = ({
  projects,
  closeModal,
  refetchProjects,
}: {
  projects?: Project[];
  closeModal: () => void;
  refetchProjects: () => void;
}) => {
  const { mutate, isLoading } = useUpdateProjectsOrder({
    onSuccess: () => {
      refetchProjects();
      closeModal();
      toast.success('Project order has been updated!');
    },
    onError: () => {
      toast.error('Project order update failed.');
    },
  });

  const onSubmit = async (items: string[]) => {
    mutate({
      projects: items,
    });
  };

  return (
    <Modal closeModal={closeModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <DragAndDrogList
          items={(projects ?? []).map((project) => ({
            label: project!.title,
            value: project!.title ?? '',
          }))}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
};
