import { useFieldArray, useFormContext } from 'react-hook-form';
import { Project } from '../../../../shared/types/project.types';
import cx from 'classnames';
import { useMembersQuery } from '../../../../shared/hooks/memberHooks';
import { useState } from 'react';
import { Button } from '../../../../shared/components/form/Button';
import { SafeProfilePicture } from '../../../../shared/components/common/SafeProfilePicture';

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

  const { data: members } = useMembersQuery();

  const [addMember, setAddMember] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div
      className={cx('transition-all', {
        'h-[100%] opacity-100': isOpen,
        'h-0 overflow-hidden opacity-0': !isOpen,
      })}
    >
      <div className="flex flex-col justify-between gap-4 py-4 md:flex-row">
        <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg md:w-1/2">
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

        <div className=" h-fit rounded-lg border bg-white p-2 shadow hover:shadow-lg md:w-1/2">
          <div className="relative">
            <div className="flex justify-between">
              <p className="font-lato text-2xl font-normal">Members Included</p>

              <button
                type="button"
                className="italic text-blue-500 underline"
                onClick={() => setAddMember(true)}
              >
                + Add Member
              </button>
            </div>

            {addMember && (
              <div className="absolute right-0 top-0 z-[100] max-h-[380px] min-w-[320px] overflow-y-auto rounded border bg-white shadow-lg">
                <div className="sticky top-0 bg-white p-2">
                  <div className="flex justify-between">
                    <p className="my-auto font-lato text-2xl font-normal">
                      Add Members
                    </p>
                    <button
                      type="button"
                      className=" my-auto  bg-white text-right italic underline"
                      onClick={() => setAddMember(false)}
                    >
                      close
                    </button>
                  </div>
                  <p className="font-lato text-lg font-light">
                    Select a member to add to this project.
                  </p>

                  <div className="flex flex-col gap-y-2 py-2">
                    <label>
                      <p className="font-lato  text-lg font-light">Search</p>
                      <input
                        placeholder="Search for a member..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col divide-y">
                  {members
                    ?.filter((m) => !fields.find((sm) => m.last === sm.last))
                    ?.filter(
                      (member) =>
                        member?.first
                          ?.toLowerCase()
                          .includes(search.toLowerCase()) ||
                        member?.last
                          ?.toLowerCase()
                          .includes(search.toLowerCase()),
                    )
                    .map((member) => {
                      const memberProfilePicture = `${
                        import.meta.env.VITE_S3_PROFILE_PICTURES
                      }${member.last
                        .toLowerCase()
                        // eslint-disable-next-line quotes
                        .replace("'", '')}.png`;
                      return (
                        <div
                          key={member.last}
                          className="no-wrap space-between flex cursor-pointer p-2"
                        >
                          <div className="no-wrap flex w-full">
                            <SafeProfilePicture
                              image={memberProfilePicture}
                              firstName={member.first}
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
            {fields.map((field, index) => {
              const memberProfilePicture = `${
                import.meta.env.VITE_S3_PROFILE_PICTURES
              }${field.last
                .toLowerCase()
                // eslint-disable-next-line quotes
                .replace("'", '')}.png`;
              return (
                <div key={field.id} className="flex justify-between">
                  <div className="no-wrap flex w-full">
                    <SafeProfilePicture
                      image={memberProfilePicture}
                      firstName={field.first}
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
                    className="pr-4 italic text-red-500 underline"
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
