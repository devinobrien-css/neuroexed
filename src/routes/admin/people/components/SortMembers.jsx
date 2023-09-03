import { useEffect, useState } from "react";
import { putData } from "../../../../shared/api/dba";
import { sort_order } from "../../../../shared/types/object_schema";

export const SortMembers = ({ items }) => {
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
