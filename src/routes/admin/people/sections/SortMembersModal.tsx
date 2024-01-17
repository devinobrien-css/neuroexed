import { updateOrder } from '../../../../shared/api/dba';
import { MemberResponse } from '../../../../shared/types/member.types';
import { Modal } from '../../../../shared/components/modals/Modal';
import { toast } from 'react-toastify';
import { DragAndDrogList } from '../../../../shared/components/DragAndDrop/DragAndDrogList';
import { useState } from 'react';

export const SortMembersModal = ({
  members,
  closeModal,
  refetchMembers,
}: {
  members?: MemberResponse[];
  closeModal: () => void;
  refetchMembers: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (items: string[]) => {
    setLoading(true);
    try {
      await updateOrder(
        'people',
        items.map((item, index) => {
          return {
            id: item,
            order: index,
          };
        }),
      );
      closeModal();
      refetchMembers();
      toast.success('Users have been updated!');
      setLoading(false);
    } catch (e) {
      toast.error('User update failed.');
    }
  };

  return (
    <Modal className="w-4/5" closeModal={closeModal}>
      <div className="h-[70vh]  overflow-scroll">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-teal-900"></div>
          </div>
        ) : (
          <DragAndDrogList
            items={(members ?? []).map((member) => ({
              label:
                member.first + ' ' + member.last + '  |  ' + member.lab_status,
              value: member.socials!.email ?? '',
              display: (
                <div className="flex justify-between">
                  <div className="flex gap-x-2">
                    <img
                      className="my-auto h-8 w-8 rounded-lg object-cover shadow"
                      alt="uploaded file"
                      src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${member.last
                        // eslint-disable-next-line quotes
                        .replace("'", '')
                        .toLowerCase()}.png`}
                    />
                    <p className="my-auto font-lato text-2xl font-light text-blue-500">
                      {member.first} {member.last}
                    </p>
                  </div>
                  <p className="my-auto font-lato text-2xl font-light text-blue-500">
                    {member.lab_status}
                  </p>
                </div>
              ),
            }))}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </Modal>
  );
};
