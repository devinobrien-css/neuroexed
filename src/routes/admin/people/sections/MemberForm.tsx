import cx from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { Select } from '../../../../shared/components/form/Input';
import { DatePicker } from '../../../../shared/components/form/DatePicker';
import { InputWarning } from '../../../../shared/components/form/InputWarning';

interface MemberFormProps {
  isOpen: boolean;
}
export const MemberForm = ({ isOpen }: MemberFormProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<MemberFormInput>();

  return (
    <div
      className={cx('transition-all', {
        'h-[100%] pb-6 opacity-100': isOpen,
        'h-0 overflow-hidden opacity-0': !isOpen,
      })}
    >
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col gap-y-4 p-4 md:w-4/12">
          <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg">
            <p className="font-lato text-2xl font-normal">
              Personal Information
            </p>
            <div className="flex flex-col gap-y-2">
              <hr />
              <label>
                <p className="font-lato  text-lg font-light">
                  First Name
                  <InputWarning field="First Name" errors={errors} required />
                </p>
                <input
                  {...register('First Name', {
                    required: 'required',
                  })}
                  placeholder="Member First Name..."
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Last Name
                  <InputWarning field="Last Name" errors={errors} required />
                </p>
                <input
                  {...register('Last Name', {
                    required: 'required',
                  })}
                  placeholder="Member Last Name..."
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Email
                  <InputWarning field="Email" errors={errors} required />
                </p>
                <input
                  {...register('Email', {
                    required: 'required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'enter a valid email',
                    },
                  })}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400  "
                  placeholder="Member Email..."
                />
              </label>
              <hr />
              <label>
                <p className="font-lato  text-lg font-light">
                  Lab Title
                  <InputWarning field="Lab Title" errors={errors} required />
                </p>
                <input
                  {...register('Lab Title', {
                    required: true,
                  })}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400  "
                  placeholder="N/A"
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Collegiate Title
                </p>
                <input
                  {...register('Collegiate Title')}
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400  "
                  placeholder="N/A"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-4 p-4 md:w-8/12">
          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <div className="w-full rounded-lg shadow hover:shadow-lg md:w-1/3">
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
                <div className="my-auto flex cursor-pointer text-center font-lato text-xl font-light text-blue-500 underline">
                  <span className="m-auto md:mt-3">
                    Upload New Profile Picture
                  </span>
                </div>
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
                <p className="text-md  font-lato font-light">
                  Twitter
                  <InputWarning field="Twitter" errors={errors} />
                </p>
                <input
                  {...register('Twitter', {
                    pattern: {
                      value: /https:\/\/(?:www\.)?twitter.com\/[A-Za-z0-9_]+/,
                      message: 'enter a valid twitter url',
                    },
                  })}
                  className="w-full bg-transparent italic text-blue-400 underline outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400"
                  placeholder="https://twitter.com/username"
                />
              </label>

              <label>
                <p className="text-md font-lato font-light">
                  Instagram
                  <InputWarning field="Instagram" errors={errors} />
                </p>
                <input
                  {...register('Instagram', {
                    pattern: {
                      value: /https:\/\/(?:www\.)?instagram.com\/[A-Za-z0-9_]+/,
                      message: 'enter a valid instagram url',
                    },
                  })}
                  className="w-full bg-transparent italic text-blue-400 underline outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400"
                  placeholder="https://instagram.com/username"
                />
              </label>

              <label>
                <p className="text-md font-lato font-light">
                  Linkedin
                  <InputWarning field="Linkedin" errors={errors} />
                </p>
                <input
                  {...register('Linkedin', {
                    pattern: {
                      value:
                        /https:\/\/(?:www\.)?linkedin.com\/in\/[A-Za-z0-9_]+/,
                      message: 'enter a valid linkedin url',
                    },
                  })}
                  className="w-full bg-transparent italic text-blue-400 underline outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400"
                  placeholder="https://linkedin.com/in/username"
                />
              </label>
            </div>
          </div>
        </div>
        <label className="mx-auto block w-[95%] rounded-lg border bg-white p-2 shadow hover:shadow-lg md:w-[98%]">
          <p className="font-lato text-2xl font-normal">Description</p>
          <textarea
            rows={8}
            className="w-full border-none p-0 font-light"
            {...register('Description')}
            placeholder="Description..."
          />
        </label>
      </div>
    </div>
  );
};
