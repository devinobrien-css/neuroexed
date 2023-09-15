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
  refetchMembers: () => any;
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
      await refetchMembers();
      toast.success('Users have been updated!');
    } catch (e: any) {
      toast.error('User update failed.');
    }
  };

  return (
    <Modal className="" closeModal={closeModal}>
      <DragAndDrogList
        items={(members ?? []).map((member) => ({
          label: member!.first + ' ' + member.last,
          value: member!.socials!.email ?? '',
        }))}
        onSubmit={onSubmit}
      />

      <div className="overflow-scroll"></div>
    </Modal>
  );
};
