/* eslint-disable quotes */
import { useState } from 'react';
import { Project } from '../../../../shared/types/project.types';
import { Button } from '../../../../shared/components/form/Button';
import { FormProvider, useForm } from 'react-hook-form';
import {
  PROJECTS_QUERY_KEY,
  useDeleteProject,
  useUpdateProject,
} from '../../../../shared/hooks/projectHooks';
import { ProjectForm } from './ProjectForm';
import { ConfirmationModal } from '../../../../shared/components/modals/ConfirmationModal';
import cx from 'classnames';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const EditableProject = ({ project }: { project: Project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const queryClient = useQueryClient();
  const refetchProjects = async () =>
    await queryClient.invalidateQueries(PROJECTS_QUERY_KEY);

  const { mutate: updateProject } = useUpdateProject({
    onSuccess: async () => {
      await refetchProjects();
      toast.success('Project has been updated!');
    },
    onError: () => {
      toast.error('Project update failed.');
    },
  });

  const { mutate: deleteProject } = useDeleteProject({
    onSuccess: async () => {
      await refetchProjects();
      toast.success('Project has been deleted!');
    },
    onError: () => {
      toast.error('Project deletion failed.');
    },
  });

  const form = useForm<Project>({
    defaultValues: {
      id: project.id,
      title: project.title,
      description: project.description,
      members: project.members,
    },
  });
  const { handleSubmit, reset } = form;

  const onSubmit = (data: Project) => {
    updateProject({ project: data });
  };

  return (
    <>
      <FormProvider {...form}>
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="justify-between md:flex">
            <div>
              <p className="font-light md:text-2xl">
                {project.title ?? (
                  <span className="text-grey-300">Project Title</span>
                )}
              </p>
              <div className="flex">
                {project.members?.map((member, index) => {
                  const img = member.last.replace("'", '').toLowerCase();
                  return (
                    index < 4 && (
                      <img
                        className={cx(
                          'h-12 w-12 rounded-full object-cover object-top shadow',
                          index > 0 && '-ml-4',
                        )}
                        alt="uploaded file"
                        src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${img}.png`}
                      />
                    )
                  );
                })}
                <div>
                  {project.members.length > 4 && (
                    <div className="-ml-4 flex h-12 w-12 items-center justify-center rounded-full border bg-gray-300">
                      <p className="font-lato font-bold text-white">
                        +{project.members.length - 4}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="font-lato font-light">
                {project.members.length} members
              </p>
            </div>
            <div className="flex">
              <Button
                color="gray"
                type="button"
                title={isOpen ? 'cancel' : 'edit'}
                onClick={() => {
                  if (isOpen) {
                    reset({
                      id: project.id,
                      title: project.title,
                      description: project.description,
                      members: project.members,
                    });
                    toast.warn('Unsaved changes have been discarded.', {
                      autoClose: 1000,
                    });
                  }
                  setIsOpen(!isOpen);
                }}
              />
              {isOpen && <Button color="blue" title="confirm" type="submit" />}
              <Button
                color="red"
                type="button"
                title="delete"
                onClick={async () => {
                  setConfirmDelete(true);
                }}
              />
            </div>
          </div>

          <ProjectForm isOpen={isOpen} />
        </form>
      </FormProvider>

      {confirmDelete && (
        <ConfirmationModal
          title={'Delete Project'}
          message={
            <>
              <p>Are you sure you want to delete the project:</p>
              <p className="font-lato font-bold">{project.title}</p>-
              <p className="italic text-red-500">
                this action cannot be undone
              </p>
            </>
          }
          closeModal={() => setConfirmDelete(false)}
          confirm={() => deleteProject({ id: project?.title })}
          confirmText={'Delete'}
          cancelText={'Cancel'}
        />
      )}
    </>
  );
};
