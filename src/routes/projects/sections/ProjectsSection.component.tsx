import ProjectProfile from './ProjectProfile.component';
import { useProjectsQuery } from '../../../shared/hooks/projectHooks';
import { Project, ProjectMember } from '../../../shared/types/project.types';
import { Loader } from '../../../shared/components/Loader';

const ProjectIcon = (project: Project) => {
  return (
    <div className="mx-auto my-4 flex flex-col justify-between rounded border bg-white p-4 shadow-lg md:w-[45%]">
      <p className="mb-2 font-lato text-2xl">{project.title}</p>
      <p className="font-sans font-light text-paynes-grey">
        {project.description}
      </p>
      <p className="mt-4 font-lato text-2xl">Cluster Members</p>
      <div className="flex overflow-x-auto">
        {project.members.map((member: ProjectMember) => {
          return <ProjectProfile key={member.id} member={member} />;
        })}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { data: projects } = useProjectsQuery();

  return (
    <div className="my-24 p-4">
      <p className="my-8 text-center font-raleway text-6xl">
        Our Latest Collaborative Work
      </p>
      <div className="flex-wrap md:flex">
        {!projects && (
          <div className="min-h-[400px] w-full">
            <Loader />
          </div>
        )}
        {projects?.map((p: Project) => <ProjectIcon key={p.title} {...p} />)}
      </div>
    </div>
  );
};

export default ProjectsSection;
