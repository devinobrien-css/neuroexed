import { useState } from 'react';
import { Project } from '../../../../shared/types/project.types';
import { Button } from '../../../../shared/components/form/Button';
import { FormProvider, useForm } from 'react-hook-form';
import {
  PROJECTS_QUERY_KEY,
  useCreateProject,
} from '../../../../shared/hooks/projectHooks';
import { ProjectForm } from './ProjectForm';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const NewProject = ({
  setNewProject,
}: {
  setNewProject: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: createProject } = useCreateProject({
    onSuccess: async () => {
      await queryClient.invalidateQueries(PROJECTS_QUERY_KEY);
      setIsOpen(false);
      toast.success('Project has been created!');
      setNewProject(false);
    },
    onError: () => {
      toast.error('Project creation failed.');
    },
  });

  const form = useForm<Project>();
  const { handleSubmit, watch, reset } = form;

  const onSubmit = async (data: Project) => {
    createProject({
      project: {
        id: data.title,
        title: data.title,
        description: data.description,
        members: data.members,
        order: 0,
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <p className="font-light md:text-2xl">
            {watch('title') ?? 'Project Title'}
          </p>
          <div className="flex">
            <Button
              color="gray"
              type="button"
              title={isOpen ? 'cancel' : 'edit'}
              onClick={() => {
                if (isOpen) {
                  setNewProject(false);
                  reset({
                    title: '',
                    description: '',
                    members: [],
                  });
                }
                isOpen ? setIsOpen(false) : setIsOpen(true);
              }}
            />
            {isOpen && (
              <>
                <Button color="blue" title="confirm" type="submit" />
                <Button
                  color="red"
                  type="button"
                  title="delete"
                  onClick={async () => {
                    setNewProject(false);
                    setIsOpen(false);
                    reset({
                      title: '',
                      description: '',
                      members: [],
                    });
                  }}
                />
              </>
            )}
          </div>
        </div>
        <ProjectForm isOpen={isOpen} />
      </form>
    </FormProvider>
  );
};
