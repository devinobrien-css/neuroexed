import { putData } from '../../../../shared/api/dba';
import { sort_order } from '../../../../shared/types/object_schema';
import { MemberResponse } from '../../../../shared/types/member.types';
import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';

export const SortMembersModal = ({
  members,
  closeModal,
  refetchMembers,
}: {
  members?: MemberResponse[];
  closeModal: () => void;
  refetchMembers: () => void;
}) => {
  const onSubmit = async (items: string[]) => {
    try {
      await putData(
        'sort-orders',
        sort_order(
          'people',
          items.map((i) => ({ S: i })),
        ),
      );
      closeModal();
      refetchMembers();
      toast.success('Users have been updated!');
    } catch (e) {
      toast.error('User update failed.');
    }
  };

  return (
    <Modal className="w-4/5" closeModal={closeModal}>
      <div className="h-[70vh]  overflow-scroll">
        <DragAndDrogList
          items={(members ?? []).map((member) => ({
            label: member.first + ' ' + member.last,
            value: member.socials!.email ?? '',
          }))}
          onSubmit={onSubmit}
        />
      </div>
    </Modal>
  );
};
