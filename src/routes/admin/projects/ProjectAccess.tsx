import { useState } from 'react';
import { Button } from '../../../shared/components/form/Button';
import { useProjectsQuery } from '../../../shared/hooks/projectHooks';
import { EditableProject } from './sections/EditableProject';
import { Project } from '../../../shared/types/project.types';
import { SortProjectsModal } from './sections/SortProjectsModal';
import { NewProject } from './sections/NewProject';
import { Loader } from '../../../shared/components/Loader';

const ProjectAccess = () => {
  const [search, setSearch] = useState('');
  const [editOrder, setEditOrder] = useState(false);
  const [newProject, setNewProject] = useState(false);

  const { data: projects, isLoading, error, refetch } = useProjectsQuery();

  return (
    <>
      {editOrder && (
        <SortProjectsModal
          closeModal={() => setEditOrder(false)}
          projects={projects}
          refetchProjects={refetch}
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
              title="add new project"
              onClick={() => setNewProject(true)}
            />
          </div>
        </div>
        <div className="mx-auto flex flex-col divide-y p-8 md:max-w-screen-xl">
          {isLoading && <Loader />}
          {error && (
            <p className="my-12 text-center italic text-red-500">
              An error occurred. Please refresh and try again
            </p>
          )}
          {newProject && <NewProject setNewProject={setNewProject} />}
          {projects?.map((project: Project) => (
            <EditableProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectAccess;
