import { useEffect, useState } from 'react';
import { putData } from '../../../../shared/api/dba';
import { sort_order } from '../../../../shared/types/object_schema';
import { MemberResponse } from '../../../../shared/types/member.types';
import { Modal } from '../../../../shared/components/modals/Modal';
import { Icon } from '@iconify/react';

export const SortMembersModal = ({
  members,
  closeModal,
}: {
  members?: MemberResponse[];
  closeModal: () => void;
}) => {
  const [itemList, setItemList] = useState<MemberResponse[]>(members ?? []);

  function decrement(index: number) {
    if (index !== 0) {
      const tempList = itemList;
      const temp = tempList[index - 1];
      tempList[index - 1] = tempList[index];
      tempList[index] = temp;
      setItemList(tempList);
    }
  }

  function increment(index: number) {
    if (index < itemList.length - 1) {
      const tempList = itemList;
      const temp = tempList[index + 1];
      tempList[index + 1] = tempList[index];
      tempList[index] = temp;

      console.log(tempList);
      console.log(itemList);
      setItemList(tempList);
    }
  }

  return (
    <Modal className="" closeModal={closeModal}>
      <div className="overflow-scroll">
        {itemList?.map((person, index) => {
          return (
            <div
              key={index}
              className="mx-auto my-1 flex w-4/5 justify-between rounded bg-gray-200 shadow-lg"
            >
              <div className="my-auto">
                <p className="px-2 text-lg font-bold">
                  {person.first} {person.last}
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  className=" border-2"
                  onClick={() => {
                    console.log('decr');
                    console.log(index);
                    decrement(index);
                  }}
                >
                  <Icon icon="ep:arrow-up-bold" />
                </button>

                <button
                  className=" border-2"
                  onClick={() => {
                    increment(index);
                  }}
                >
                  <Icon icon="ep:arrow-down-bold" />
                </button>
              </div>
            </div>
          );
        })}
        <button
          className="sticky bottom-1 left-2 rounded bg-gray-300 p-2 hover:bg-gray-400"
          onClick={async () => {
            const string_list = itemList.map((person) => {
              return person.socials.email;
            });
            await putData('sort-orders', sort_order('people', string_list));
          }}
        >
          confirm changes
        </button>
      </div>
    </Modal>
  );
};
