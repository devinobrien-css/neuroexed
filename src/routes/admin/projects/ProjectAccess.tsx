import { useState } from 'react';
import { Button } from '../../../shared/components/form/Button';
import useProjects from '../../../shared/hooks/useProjects';
import { EditableProject } from './sections/EditableProject';
import { Project } from '../../../shared/types/project.types';
import useMockProjects from '../../../shared/mocks/useMockProjects';
import { SortProjectsModal } from './sections/SortProjectsModal';
import { NewProject } from './sections/NewProject';

const ProjectAccess = () => {
  const [editOrder, setEditOrder] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [search, setSearch] = useState('');

  const { projects, refetchProjects } = useProjects();

  return (
    <>
      {editOrder && (
        <SortProjectsModal
          closeModal={() => setEditOrder(false)}
          projects={projects}
          refetchProjects={refetchProjects}
        />
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
              title="add new project"
              onClick={() => setNewProject(true)}
            />
          </div>
        </div>
        <div className="mx-auto flex flex-col divide-y p-4 md:max-w-screen-2xl">
          {newProject && <NewProject />}
          {projects?.map((project: Project) => (
            <EditableProject key={project.title} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectAccess;
