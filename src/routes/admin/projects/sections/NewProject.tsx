import { useState } from 'react';
import { Project, ProjectMember } from '../../../../shared/types/project.types';
import useMembers from '../../../../shared/hooks/useMembers';
import { Button } from '../../../../shared/components/form/Button';
import { Input } from '../../../../shared/components/form/Input';
import { useForm } from 'react-hook-form';
import useProjects from '../../../../shared/hooks/useProjects';

export const NewProject = () => {
  const [state, setState] = useState(true);

  const [newMember, setNewMember] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(Array<ProjectMember>);

  const { members } = useMembers();
  const { updateProject } = useProjects();
  const { register, handleSubmit, watch } = useForm<Project>();

  function handleRemove(id: string) {
    const newList = selectedMembers.filter((item) => item.id !== id);
    setSelectedMembers(newList);
  }

  function handleAdd(person: ProjectMember) {
    const newList = selectedMembers;
    newList.push({
      id: person.id, //email.split('@')[0]
      email: person.email,
      first: person.first,
      last: person.last,
    });
    setSelectedMembers(newList);
  }

  const onSubmit = (data: Project) => {
    updateProject({
      title: data.title,
      description: data.description,
      members: selectedMembers,
    });
    setState(false);
  };

  return (
    <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <p className="font-light md:text-2xl">
          {watch('title') ?? 'Project Title'}
        </p>
        <div className="flex">
          <Button
            color="gray"
            type="button"
            title={state ? 'cancel' : 'edit'}
            onClick={() => {
              state ? setState(false) : setState(true);
            }}
          />
          {state && (
            <>
              <Button color="yellow" title="confirm" type="submit" />
              <Button
                color="red"
                type="button"
                title="delete"
                onClick={async () => {
                  setState(false);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-y-4 transition-all ${
          state ? 'h-[100%] p-10 opacity-100' : 'h-0 text-clip opacity-0'
        }`}
      >
        <Input name="title" register={register} />
        <Input name="description" register={register} />

        <hr />

        <div className="rounded-lg bg-white p-4 shadow hover:shadow-xl">
          <div className="flex justify-between">
            <p className="font-lato text-lg">Members</p>
            <div className="relative shrink-0 rounded">
              <Button
                color="gray"
                title="Add Members"
                type="button"
                onClick={() => setNewMember(true)}
              />
              {newMember && (
                <div className="absolute top-full z-[100] max-h-[280px] min-w-[320px] overflow-scroll bg-white shadow">
                  <button
                    type="button"
                    className="sticky top-0 w-full bg-white px-2 text-right underline"
                    onClick={() => setNewMember(false)}
                  >
                    close
                  </button>
                  <div className="flex flex-col divide-y">
                    {members?.map((member) => {
                      return (
                        <div
                          key={member.last}
                          onClick={() =>
                            handleAdd({
                              id: member.socials.email.split('@')[0],
                              first: member.first,
                              email: member.socials.email,
                              last: member.last,
                            })
                          }
                          className="no-wrap space-between flex cursor-pointer p-2"
                        >
                          <div className="no-wrap flex w-full">
                            <img
                              src={`${
                                import.meta.env.VITE_S3_PROFILE_PICTURES
                              }${member.last
                                .toLowerCase()
                                // eslint-disable-next-line quotes
                                .replace("'", '')}.png`}
                              alt={'photo of ' + member.last}
                              className="block w-16 rounded-full"
                            />
                            <p className="my-auto pl-1 text-xl font-light">
                              {member.first} {member.last}
                            </p>
                          </div>
                          <Button
                            type="button"
                            color="blue"
                            title="add"
                            className="my-auto"
                            onClick={() =>
                              handleAdd({
                                id: member.socials.email.split('@')[0],
                                first: member.first,
                                email: member.socials.email,
                                last: member.last,
                              })
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="no-wrap flex flex-row overflow-scroll">
            {selectedMembers.map((member) => (
              <div
                key={member.last}
                className="relative m-1 flex min-w-[300px] border bg-white p-3 shadow"
              >
                <img
                  src={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${member.last
                    .toLowerCase()
                    // eslint-disable-next-line quotes
                    .replace("'", '')}.png`}
                  alt={'photo of ' + member.last}
                  className="my-auto block w-14 rounded-full"
                />
                <p className="my-auto pl-2 text-xl font-light">
                  {member.first} {member.last}
                </p>
                <button
                  type="button"
                  className="absolute right-2 top-1 rounded border border-red-400 bg-red-100 p-1 text-sm text-red-400 transition-all hover:bg-red-200"
                  onClick={() => handleRemove(member.id)}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
