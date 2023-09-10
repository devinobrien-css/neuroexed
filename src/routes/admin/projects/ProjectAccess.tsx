import { useState } from 'react';
import { Button } from '../../../shared/components/form/Button';
import useProjects from '../../../shared/hooks/useProjects';
import { EditableProject } from './sections/EditableProject';
import { Project } from '../../../shared/types/project.types';
import useMockProjects from '../../../shared/mocks/useMockProjects';

const ProjectAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [search, setSearch] = useState('');

  // const { projects } = useProjects();
  const { projects } = useMockProjects();

  return (
    <>
      {editOrder && (
        <div className="absolute left-10 z-[1000] w-4/5 rounded bg-gray-100 shadow-lg">
          <button
            className="absolute right-0 top-0 z-[55] rounded bg-gray-200 px-2 hover:bg-blue-100"
            onClick={() => {
              setEditOrder(false);
            }}
          >
            X
          </button>
          <p className="px-2 italic text-red-400">
            (confirming changes will refresh the page)
          </p>
          {/* <SortableProjectList items={projects} /> */}
        </div>
      )}
      <div className="">
        <div className="flex flex-col justify-between gap-y-4 py-8 md:flex-row">
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
              title="add new post"
              onClick={() => setNewProject(true)}
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-lg flex-col divide-y p-4">
          {newProject ? <>TODO</> : <></>}
          {projects?.map((project: Project) => (
            <EditableProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectAccess;
