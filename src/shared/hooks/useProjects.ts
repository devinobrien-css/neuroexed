import { Project } from '../types/project.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchData, putData, removeData } from '../api/dba';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const useProjects = () => {
  const { data: projects, refetch: refetchProjects } = useQuery({
    queryKey: ['PROJECTS'],
    queryFn: async () => {
      const res = (await fetchData('projects')) as Project[];
      return res;
    },
    cacheTime: 10 * 60 * 60,
  });

  const { mutate: updateProject } = useMutation<void, AxiosError, Project>({
    mutationFn: async (data) => {
      await putData('projects', {
        title: data.title,
        description: data.description,
        members: data.members.map((m) => ({
          id: m.id,
          first: m.first,
          last: m.last,
          email: m.email,
        })),
      });
    },
    onSuccess: async () => {
      await refetchProjects();
      toast.success('Project has been updated!');
    },
    onError: () => toast.error('Project update failed'),
  });

  const { mutate: deleteProject } = useMutation({
    mutationFn: async (title: string) => {
      await removeData('projects', { title: { S: title } });
    },
    onSuccess: async () => {
      await refetchProjects();
      toast.success('Project has been deleted!');
    },
    onError: () => toast.error('Project deletion failed'),
  });

  return {
    projects,
    updateProject,
    deleteProject,
    refetchProjects,
  };
};

export default useProjects;
