// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';

// import { project, sort_order } from '../../../shared/types/object_schema';
// import { fetchData, putData, removeData } from '../../../shared/api/dba';
// import StandardInput from '../components/StandardInput.component';
// import StandardTextArea from '../components/StandardTextArea.component';

// const NewProject = (args) => {
//   const [people, setPeople] = useState();
//   const getPeople = async () => {
//     const res = await fetchData('people');

//     if (res === 'EMPTY') {
//       setPeople([]);
//     } else setPeople(res.Items);
//   };

//   useEffect(() => {
//     getPeople();
//   }, []);

//   const [state, setState] = useState(true);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const [newMember, setNewMember] = useState('');
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   function handleRemove(id) {
//     const newList = selectedMembers.filter((item) => item.M.id.S !== id);

//     setSelectedMembers(newList);
//   }

//   function handleAdd(person) {
//     const newList = selectedMembers.filter(
//       (item) => item.M.id.S !== person.data.M.slug.S,
//     );
//     newList.push({
//       M: {
//         id: { S: person.data.M.slug.S },
//         email: { S: person.email.S },
//         first: { S: person.data.M.first.S },
//         last: { S: person.data.M.last.S },
//       },
//     });
//     setSelectedMembers(newList);
//   }

//   if (people) {
//     return (
//       <div className="editable selected-editable" id={'new-project'}>
//         <div>
//           <p>{title}</p>
//           <div className="flex">
//             <button
//               className="mx-2 h-min rounded border border-blue-300 bg-blue-100 px-2 py-0 text-sm text-blue-300"
//               onClick={() => {
//                 if (state) args.remove(false);
//                 state ? setState(false) : setState(true);
//               }}
//             >
//               {state ? 'cancel' : 'edit'}
//             </button>
//             {state ? (
//               <>
//                 <button
//                   className="mx-2 h-min rounded border border-yellow-500 bg-yellow-100 px-2 py-0 text-sm text-yellow-500"
//                   onClick={async () => {
//                     putData(
//                       'projects',
//                       {},
//                       project(title, description, selectedMembers),
//                     );
//                     const sort = await fetchData('sort-orders');
//                     sort.Items.filter((order) => {
//                       return order.type.S === 'projects';
//                     })[0].sort.L.push({ S: title });
//                     await putData(
//                       'sort-orders',
//                       {},
//                       sort_order(
//                         'projects',
//                         sort.Items.filter((order) => {
//                           return order.type.S === 'projects';
//                         })[0].sort.L,
//                       ),
//                     );
//                     setState(false);
//                   }}
//                 >
//                   confirm
//                 </button>
//                 <button
//                   className="mx-2 h-min rounded border border-red-500 bg-red-100 px-2 py-0 text-sm text-red-500"
//                   onClick={async () => {
//                     await removeData('projects', {
//                       title: { S: title },
//                     });
//                     const sort = await fetchData('sort-orders');
//                     const output = sort.Items.filter((order) => {
//                       return order.type.S === 'projects';
//                     })[0].sort.L.filter((project) => {
//                       return project.S !== title;
//                     });
//                     await putData(
//                       'sort-orders',
//                       {},
//                       sort_order('projects', output),
//                     );
//                     setState(false);
//                     args.remove(false);
//                   }}
//                 >
//                   delete
//                 </button>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//         <div className={state ? 'hidden-content open' : 'hidden-content'}>
//           <StandardInput
//             title={'Project Title'}
//             className={'border px-2'}
//             value={title}
//             setValue={setTitle}
//           />
//           <StandardTextArea
//             title={'Project Description'}
//             className={'border px-2'}
//             value={description}
//             setValue={setDescription}
//           />

//           <p>Members</p>
//           <div className="selected-member-list">
//             {selectedMembers.map((item, index) => (
//               <div
//                 key={index + '-selectable-' + item.M.last.S}
//                 className="relative m-1 flex min-w-[300px] border bg-white p-1 shadow"
//               >
//                 <img
//                   src={
//                     './img/people/' +
//                     item.M.last.S.toLowerCase().replace("'", '') +
//                     '.png'
//                   }
//                   alt={'photo of ' + item.M.last.S}
//                   className="my-auto block w-14 rounded-full"
//                 />
//                 <p className="my-auto pl-2 text-xl font-light">
//                   {item.M.first.S} {item.M.last.S}
//                 </p>
//                 <button
//                   type="button"
//                   className="absolute right-2 top-1 rounded border border-red-400 bg-red-100 p-1 text-sm text-red-400 transition-all hover:bg-red-200"
//                   onClick={() => handleRemove(item.M.id.S)}
//                 >
//                   remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="relative shrink-0 rounded border">
//             <StandardInput
//               title={'Add Members'}
//               className={'border px-2'}
//               value={newMember}
//               setValue={setNewMember}
//             />
//             <div className="absolute top-full z-[100] flex max-h-[180px] w-1/3 min-w-[240px] flex-col overflow-scroll overflow-y-scroll bg-white shadow">
//               {newMember !== '' ? (
//                 people
//                   .filter(
//                     (person) =>
//                       selectedMembers.filter(
//                         (selected) => selected.M.id.S === person.data.M.slug.S,
//                       ).length === 0 &&
//                       (person.data.M.slug.S.toLowerCase().includes(
//                         newMember.toLowerCase(),
//                       ) ||
//                         person.data.M.first.S.toLowerCase().includes(
//                           newMember.toLowerCase(),
//                         ) ||
//                         person.data.M.last.S.toLowerCase().includes(
//                           newMember.toLowerCase(),
//                         )),
//                   )
//                   .map((person, index) => {
//                     return (
//                       <div
//                         key={index + '-member-' + person.data.M.last.S}
//                         onClick={() => handleAdd(person)}
//                         className="no-wrap space-between flex cursor-pointer border p-1"
//                       >
//                         <div className="no-wrap flex w-full">
//                           <img
//                             src={
//                               './img/people/' +
//                               person.data.M.last.S.toLowerCase().replace(
//                                 "'",
//                                 '',
//                               ) +
//                               '.png'
//                             }
//                             alt={'photo of ' + person.data.M.last.S}
//                             className="block w-16 rounded-full"
//                           />
//                           <p className="my-auto pl-1 text-2xl font-light">
//                             {person.data.M.first.S} {person.data.M.last.S}
//                           </p>
//                         </div>
//                         <button
//                           type="button"
//                           className="my-auto mr-0 rounded border border-blue-400 bg-blue-100 p-1 px-3 text-sm text-blue-400 transition-all hover:bg-blue-200"
//                           onClick={() => handleAdd(person)}
//                         >
//                           add
//                         </button>
//                       </div>
//                     );
//                   })
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return <></>;
//   }
// };
