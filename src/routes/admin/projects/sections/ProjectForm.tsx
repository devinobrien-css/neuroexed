import { useFieldArray, useFormContext } from 'react-hook-form';
import { Project } from '../../../../shared/types/project.types';
import cx from 'classnames';
import useMembers from '../../../../shared/hooks/useMembers';
import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';

export const ProjectForm = ({ isOpen }: { isOpen: boolean }) => {
  const { register, control } = useFormContext<Project>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
    rules: {
      required: true,
      minLength: 1,
    },
  });

  const { members } = useMembers();

  const [addMember, setAddMember] = useState(false);

  return (
    <div
      className={cx('transition-all', {
        'h-[100%] opacity-100': isOpen,
        'h-0 overflow-hidden opacity-0': !isOpen,
      })}
    >
      <div className="flex justify-between gap-4 py-4">
        <div className="w-1/2 rounded-lg border bg-white p-2 shadow hover:shadow-lg">
          <p className="font-lato text-2xl font-normal">Details</p>
          <div className="flex flex-col gap-y-2">
            <hr />
            <label>
              <p className="font-lato  text-lg font-light">Title</p>
              <input
                {...register('title')}
                placeholder="Click to enter a title for this project."
                className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
              />
            </label>

            <label>
              <p className="font-lato  text-lg font-light">Description</p>
              <textarea
                rows={8}
                {...register('description')}
                placeholder="Click to enter a description for this project."
                className="w-full border-none bg-transparent p-0 placeholder:font-light placeholder:text-gray-400"
              />
            </label>
          </div>
        </div>

        <div className=" w-1/2 rounded-lg border bg-white p-2 shadow hover:shadow-lg">
          <div className="relative flex justify-between">
            <p className="font-lato text-2xl font-normal">Members Included</p>

            <button
              type="button"
              className="text-blue-500"
              onClick={() => setAddMember(true)}
            >
              + Add Member
            </button>

            {addMember && (
              <div className="absolute right-0 top-full z-[100] max-h-[280px] min-w-[320px] overflow-scroll bg-white shadow">
                <button
                  type="button"
                  className="sticky top-0 w-full bg-white px-2 text-right underline"
                  onClick={() => setAddMember(false)}
                >
                  close
                </button>
                <div className="flex flex-col divide-y">
                  {members
                    ?.filter((m) => !fields.find((sm) => m.last === sm.last))
                    .map((member) => {
                      return (
                        <div
                          key={member.last}
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
                              className="block h-12 w-12 rounded object-cover"
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
                              append({
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
          <hr />

          <div className=" flex max-h-[300px] flex-col gap-2 overflow-y-auto p-2">
            {fields.length === 0 && (
              <p className="my-16 text-center font-lato font-light text-gray-400">
                No members have been added yet.
              </p>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="flex justify-between">
                <div className="no-wrap flex w-full">
                  <img
                    src={`${
                      import.meta.env.VITE_S3_PROFILE_PICTURES
                    }${field.last
                      .toLowerCase()
                      // eslint-disable-next-line quotes
                      .replace("'", '')}.png`}
                    alt={'photo of ' + field.last}
                    className="block h-12 w-12 rounded object-cover"
                  />
                  <p className="my-auto flex flex-col pl-1 text-xl font-light">
                    <span className="m-0 p-0">
                      {field.first} {field.last}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({field.email})
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="pr-4 text-red-500 underline"
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
