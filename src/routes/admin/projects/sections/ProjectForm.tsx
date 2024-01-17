import { useFormContext } from 'react-hook-form';
import { Project } from '../../../../shared/types/project.types';
import cx from 'classnames';

export const ProjectForm = ({ isOpen }: { isOpen: boolean }) => {
  const { register, control, watch } = useFormContext<Project>();

  console.log(watch('members'));
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
                className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
              />
            </label>

            <label>
              <p className="font-lato  text-lg font-light">Description</p>
              <textarea
                rows={8}
                {...register('description')}
                className="w-full border-none bg-transparent p-0 placeholder:font-light placeholder:text-gray-400"
              />
            </label>
          </div>
        </div>

        <div className="w-1/2 rounded-lg border bg-white p-2 shadow hover:shadow-lg">
          <p className="font-lato text-2xl font-normal">Members Included</p>
        </div>
      </div>
    </div>
  );
};
