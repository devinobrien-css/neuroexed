// import { useEffect, useState } from 'react';

// export const SortableBlogList = ({ items }) => {
//   const [itemList, setItemList] = useState([]);

//   let tempList = [];
//   useEffect(() => {
//     tempList = [];
//     items.forEach((item) => {
//       tempList.push(item);
//     });
//     setItemList(tempList);
//   }, []);

//   function decrement(index) {
//     if (index !== 0) {
//       tempList = [...itemList];
//       const temp = tempList[index - 1];
//       tempList[index - 1] = tempList[index];
//       tempList[index] = temp;
//       setItemList(tempList);
//     }
//   }

//   function increment(index) {
//     if (index < [...itemList].length - 1) {
//       tempList = [...itemList];
//       const temp = tempList[index + 1];
//       tempList[index + 1] = tempList[index];
//       tempList[index] = temp;
//       setItemList(tempList);
//     }
//   }

//   return (
//     <div className="relative h-96 overflow-scroll border-2">
//       {itemList.map((blog, index) => {
//         return (
//           <div
//             key={blog.data.M.media_title.S + '-' + index}
//             className="mx-auto my-1 flex w-4/5 justify-between rounded bg-gray-200 shadow-lg"
//           >
//             <div className="my-auto w-4/5">
//               <p className="overflow-hidden whitespace-nowrap px-2 text-lg font-bold">
//                 {blog.data.M.media_title.S}
//               </p>
//             </div>
//             <div className="flex h-min flex-col">
//               <button
//                 className="my-1 h-min rounded border-2 p-0 text-center  hover:bg-gray-300"
//                 onClick={() => {
//                   decrement(index);
//                 }}
//               >
//                 ^
//               </button>

//               <button
//                 className="my-1 h-min rotate-180 rounded border-2 px-2 text-center hover:bg-gray-300"
//                 onClick={() => {
//                   increment(index);
//                 }}
//               >
//                 ^
//               </button>
//             </div>
//           </div>
//         );
//       })}
//       <button
//         className="sticky bottom-1 left-2 rounded bg-gray-300 p-2 hover:bg-gray-400"
//         onClick={async () => {
//           const string_list = [];
//           itemList.forEach((blog) => {
//             string_list.push({ S: blog.title.S });
//           });
//           await putData('sort-orders', {}, sort_order('blogs', string_list));
//           window.location.reload();
//         }}
//       >
//         confirm changes
//       </button>
//     </div>
//   );
// };
