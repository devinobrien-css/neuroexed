/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { sort_order } from "../../../shared/types/object_schema";
import { fetchData, putData } from "../../../shared/api/dba";
import { EditablePerson } from "./EditablePerson";
import NewPerson from "./NewPerson";
import { Button } from "../../../shared/components/form/Button";

const SortablePersonList = ({ items }) => {
  const [itemList, setItemList] = useState([]);

  let tempList = [];
  useEffect(() => {
    tempList = [];
    items.forEach((item) => {
      tempList.push(item);
    });
    setItemList(tempList);
  }, []);

  function decrement(index) {
    if (index !== 0) {
      tempList = [...itemList];
      const temp = tempList[index - 1];
      tempList[index - 1] = tempList[index];
      tempList[index] = temp;
      setItemList(tempList);
    }
  }

  function increment(index) {
    if (index < [...itemList].length - 1) {
      tempList = [...itemList];
      const temp = tempList[index + 1];
      tempList[index + 1] = tempList[index];
      tempList[index] = temp;
      setItemList(tempList);
    }
  }

  return (
    <div className="border-2 h-96 overflow-scroll relative">
      {itemList?.map((person, index) => {
        return (
          <div
            key={person.data.M.email.S + index}
            className="flex justify-between shadow-lg rounded w-4/5 mx-auto my-1 bg-gray-200"
          >
            <div className="my-auto">
              <p className="text-lg px-2 font-bold">
                {person.data.M.first.S} {person.data.M.last.S}
              </p>
            </div>
            <div className="flex flex-col h-min">
              <button
                className="h-min p-0 rounded text-center my-1 border-2  hover:bg-gray-300"
                onClick={() => {
                  decrement(index);
                }}
              >
                ^
              </button>

              <button
                className="h-min px-2 rounded text-center my-1 border-2 rotate-180 hover:bg-gray-300"
                onClick={() => {
                  increment(index);
                }}
              >
                ^
              </button>
            </div>
          </div>
        );
      })}
      <button
        className="sticky bg-gray-300 bottom-1 left-2 p-2 rounded hover:bg-gray-400"
        onClick={async () => {
          const string_list = [];
          itemList.forEach((person) => {
            string_list.push(person.email);
          });
          await putData("sort-orders", {}, sort_order("people", string_list));
          window.location.reload();
        }}
      >
        confirm changes
      </button>
    </div>
  );
};

function orderJsonObjects(order, objects) {
  const output = [];
  order.forEach((order_by) => {
    output.push(
      objects.filter((object) => {
        return object.email.S === order_by.S;
      })[0],
    );
  });
  return output;
}

const PeopleAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [newPerson, setNewPerson] = useState(false);
  const [search, setSearch] = useState("");

  const [people, setPeople] = React.useState();
  const getPeople = async () => {
    const sort = await fetchData("sort-orders");
    const res = await fetchData("people");

    console.log(sort?.Items);
    // if (sort?.Count !== 0)
    //   if (
    //     sort?.Items?.filter((order) => {
    //       return order.type?.S === "people";
    //     })[0]?.sort?.L?.length !== 0
    //   )
    //     setPeople(
    //       orderJsonObjects(
    //         sort?.Items?.filter((order) => {
    //           return order.type?.S === "people";
    //         })[0].sort?.L,
    //         res?.Items ?? [],
    //       ),
    //     );
    //   else setPeople(res?.Items);
    // else setPeople(res?.Items);
    setPeople(res?.Items ?? []);
  };

  useEffect(() => {
    getPeople();
  }, []);

  if (people) {
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
            <SortablePersonList items={people} />
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
            {newPerson ? <NewPerson remove={setNewPerson} /> : <></>}
            {people
              .filter(
                (person) =>
                  person.data.M.first.S.toLowerCase().includes(
                    search.toLowerCase(),
                  ) ||
                  person.data.M.last.S.toLowerCase().includes(
                    search.toLowerCase(),
                  ),
              )
              .map((person, index) => {
                return (
                  <EditablePerson
                    key={index}
                    data={person.data.M}
                    id={"editable-person-" + index}
                  />
                );
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
