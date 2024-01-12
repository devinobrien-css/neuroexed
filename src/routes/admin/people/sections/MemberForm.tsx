import cx from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { Select } from '../../../../shared/components/form/Input';
import { DatePicker } from '../../../../shared/components/form/DatePicker';

interface MemberFormProps {
  isOpen: boolean;
}
export const MemberForm = ({ isOpen }: MemberFormProps) => {
  const { register, control } = useFormContext<MemberFormInput>();

  return (
    <div
      className={cx('transition-all', {
        'h-[100%] opacity-100': isOpen,
        'h-0 overflow-hidden opacity-0': !isOpen,
      })}
    >
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col gap-y-4 p-4 md:w-1/2">
          <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg">
            <p className="font-lato text-2xl font-normal">
              Personal Information
            </p>
            <div className="flex flex-col gap-y-2">
              <hr />
              <label>
                <p className="font-lato  text-lg font-light">First Name</p>
                <input
                  {...register('First Name')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">Last Name</p>
                <input
                  {...register('Last Name')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">Email</p>
                <input
                  {...register('Email')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                />
              </label>
              <hr />
              <label>
                <p className="font-lato  text-lg font-light">Lab Title</p>
                <input
                  {...register('Lab Title')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Collegiate Title
                </p>
                <input
                  {...register('Collegiate Title')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                  placeholder="N/A"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-4 p-4 md:w-1/2">
          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <div className="w-full md:w-1/3">
              <Controller
                name={'Year Joined'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    showLabel
                    dateClassName="border p-2 font-lato"
                    inline={false}
                    label="Year Joined"
                    toDate={new Date()}
                    selected={new Date(value)}
                    onSelect={(date) => onChange(date)}
                  />
                )}
              />
            </div>
            <Select
              className="w-full sm:w-2/5 md:w-1/3"
              register={register}
              name="Lab Status"
              options={['Alumni', 'Member']}
            />
            <div className="w-full cursor-pointer rounded-lg border bg-white p-2 shadow hover:shadow-lg sm:w-2/5 md:w-1/3">
              <label className="my-auto">
                <input
                  className="hidden"
                  type="file"
                  accept="image/png"
                  {...register('image')}
                />
                <p className="my-auto cursor-pointer text-center font-lato text-xl font-light text-blue-500 underline">
                  Upload New Profile Picture
                </p>
              </label>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg">
            <div className="flex gap-x-2">
              <p className="font-lato text-2xl font-normal">Socials</p>
              <p className="text-md my-auto font-lato font-light">
                (leave blank if none)
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <label>
                <p className="text-md  font-lato font-light">Twitter</p>
                <input
                  {...register('Twitter')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
                />
              </label>

              <label>
                <p className="text-md font-lato font-light">Instagram</p>
                <input
                  {...register('Instagram')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400"
                />
              </label>

              <label>
                <p className="text-md font-lato font-light">Linkedin</p>
                <input
                  {...register('Linkedin')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400"
                />
              </label>
            </div>
          </div>
        </div>
        <label className="mx-auto block w-[95%] rounded-lg border bg-white p-2 shadow hover:shadow-lg md:w-[98%]">
          <p className="font-lato text-2xl font-normal">Description</p>
          <textarea
            rows={5}
            className="w-full border-none p-0 font-light"
            {...register('Description')}
          />
        </label>
      </div>
    </div>
  );
};
