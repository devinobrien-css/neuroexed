import { useState } from 'react';
import { EditablePerson } from './sections/EditableMember';
import useMembers from '../../../shared/hooks/useMembers';
import { SortMembersModal } from './sections/SortMembersModal';
import NewPerson from './sections/NewMember';
import { MemberResponse } from '../../../shared/types/member.types';
import { Button } from '../../../shared/components/form/Button';

const PeopleAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [newPerson, setNewPerson] = useState(false);
  const [search, setSearch] = useState('');
  const { members, refetchMembers } = useMembers();

  return (
    <>
      {editOrder && (
        <SortMembersModal
          members={members}
          closeModal={() => setEditOrder(false)}
          refetchMembers={refetchMembers}
        />
      )}
      <div className="">
        <div className="sticky top-0 flex flex-col justify-between gap-y-4 bg-gray-50 py-8 shadow md:flex-row">
          <input
            id="search"
            name="search"
            value={search}
            placeholder="search..."
            className="mx-8 my-auto rounded-xl border-2 p-4 shadow md:w-1/3"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="mx-auto flex gap-x-2 md:mx-4">
            <Button
              color="gray"
              title="edit order"
              onClick={() => setEditOrder(true)}
            />
            <Button
              color="gray"
              title="add new person"
              onClick={() => setNewPerson(true)}
            />
          </div>
        </div>
        <div className="mx-auto divide-y divide-gray-200 shadow  md:max-w-screen-xl">
          {newPerson ? <NewPerson setNewPerson={setNewPerson} /> : <></>}
          {members
            ?.filter(
              (member: MemberResponse) =>
                member?.first?.toLowerCase().includes(search.toLowerCase()) ||
                member?.last?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((member: MemberResponse, index: number) => {
              return <EditablePerson key={index} data={member} />;
            })}
        </div>
      </div>
    </>
  );
};

export default PeopleAccess;
