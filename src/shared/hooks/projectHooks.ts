import { Project } from '../types/project.types';
import {
  fetchData,
  putData,
  removeData,
  updateData,
  updateOrder,
} from '../api/dba';
import { createAPIMutation, createAPIQuery } from '../api/api';

const PROJECTS_TABLE = 'projects';

export const PROJECTS_QUERY_KEY = ['projects'];

export const useProjectsQuery = createAPIQuery<Project[]>({
  queryKey: PROJECTS_QUERY_KEY,
  queryFn: async () => {
    const res = (await fetchData(PROJECTS_TABLE)) as Project[];
    return res.sort((a, b) => a.order - b.order);
  },
});

interface UpdateProjectsOrderParams {
  projects: string[];
}
export const useUpdateProjectsOrder = createAPIMutation<
  void,
  UpdateProjectsOrderParams
>({
  mutationFn: async ({ projects }: UpdateProjectsOrderParams) => {
    await updateOrder(
      PROJECTS_TABLE,
      projects.map((item, index) => {
        return {
          id: item,
          order: index,
        };
      }),
    );
  },
});

interface CreateProjectParams {
  project: Project;
}
export const useCreateProject = createAPIMutation<void, CreateProjectParams>({
  mutationFn: async ({ project }: CreateProjectParams) => {
    await putData(PROJECTS_TABLE, {
      id: project.title, // TODO: fix this. id should be a uuid
      title: project.title,
      description: project.description,
      members: project.members.map((m) => ({
        id: m.id,
        first: m.first,
        last: m.last,
        email: m.email,
      })),
    });
  },
});

interface DeleteProjectParams {
  id: string;
}
export const useDeleteProject = createAPIMutation<void, DeleteProjectParams>({
  mutationFn: async ({ id }: DeleteProjectParams) => {
    await removeData(PROJECTS_TABLE, { title: { S: id } });
  },
});

interface UpdateProjectParams {
  project: Project;
}
export const useUpdateProject = createAPIMutation<void, UpdateProjectParams>({
  mutationFn: async ({ project }: UpdateProjectParams) => {
    await updateData('projects', {
      id: project.title, // TODO: fix this. id should be a uuid
      title: project.title,
      description: project.description,
      members: project.members.map((member) => ({
        id: member.id,
        first: member.first,
        last: member.last,
        email: member.email,
        profile_picture: member.profile_picture,
      })),
    });
  },
});
