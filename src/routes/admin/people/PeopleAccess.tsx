import React, { useState } from "react";
import { EditablePerson } from "./components/EditableMember";
import { Button } from "../../../shared/components/form/Button";
import useMembers from "../../../shared/hooks/useMembers";
import { SortMembers } from "./components/SortMembers";
import NewPerson from "./components/NewMember";

const PeopleAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [newPerson, setNewPerson] = useState(false);
  const [search, setSearch] = useState("");
  const { members } = useMembers();

  if (members) {
    return (
      <>
        {editOrder ? (
          <div className="absolute bg-gray-100 shadow-lg w-4/5 rounded left-10 z-[1000]">
            <button
              className="px-2 rounded hover:bg-blue-100 absolute top-0 right-0 z-[55] bg-gray-200"
              onClick={() => {
                setEditOrder(false);
              }}
            >
              X
            </button>
            <p className="text-red-400 italic px-2">
              (confirming changes will refresh the page)
            </p>
            <SortMembers items={members} />
          </div>
        ) : (
          <></>
        )}
        <div className="">
          <div className="flex flex-col md:flex-row gap-y-4 justify-between py-8">
            <input
              id="search"
              name="search"
              value={search}
              placeholder="search..."
              className="my-auto border-2 shadow rounded-xl md:w-1/3 p-4 mx-8"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <div className="flex gap-x-2 mx-auto md:mx-4">
              <Button
                color="gray"
                onClick={() => {
                  setEditOrder(true);
                }}
                title="edit order"
              />
              <Button
                color="gray"
                onClick={() => setNewPerson(true)}
                title="add new person"
              />
            </div>
          </div>
          <div className="divide-y md:px-24">
            {newPerson ? <NewPerson /> : <></>}
            {members
              .filter(
                (person: any) =>
                  person.data.M.first.S.toLowerCase().includes(
                    search.toLowerCase(),
                  ) ||
                  person.data.M.last.S.toLowerCase().includes(
                    search.toLowerCase(),
                  ),
              )
              .map((person: any, index: number) => {
                return <EditablePerson key={index} data={person.data.M} />;
              })}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default PeopleAccess;
