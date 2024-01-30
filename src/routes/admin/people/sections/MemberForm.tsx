import cx from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../../../../shared/components/form/Input';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { DatePicker } from '../../../../shared/components/form/DatePicker';
import { Select } from '../../../../shared/components/form/Select';

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
          <div className="">
            <p className="font-lato text-2xl font-normal">
              Personal Information
            </p>
            <div className="flex flex-col gap-y-2">
              <hr />
              <Input
                name="First Name"
                label="First Name"
                errors={errors}
                required="this is required"
                placeholder="Member First Name..."
              />
              <Input
                name="Last Name"
                label="Last Name"
                errors={errors}
                required="this is required"
                placeholder="Member Last Name..."
              />
              <Input
                name="Email"
                label="Email"
                type="email"
                errors={errors}
                required="this is required"
                placeholder="first.last@gmail.com"
                pattern={/\S+@\S+\.\S+/}
                message={'enter a valid email'}
              />
              <hr />
              <Input
                name="Lab Title"
                label="Lab Title"
                errors={errors}
                placeholder="N/A"
              />
              <Input
                name="Collegiate Title"
                label="Collegiate Title"
                errors={errors}
                placeholder="N/A"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-4 p-4 md:w-8/12">
          <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
            <div className="w-full md:w-1/3">
              <Controller
                name={'Year Joined'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    showLabel
                    dateClassName="border-none bg-transparent font-lato"
                    inline={false}
                    label="Year Joined"
                    toDate={new Date()}
                    selected={new Date(value)}
                    onSelect={(date) => onChange(date)}
                  />
                )}
              />
            </div>

            <div className="w-full md:w-1/3">
              <Select
                name="Lab Status"
                label="Lab Status"
                errors={errors}
                required="this is required"
                options={['Alumni', 'Member']}
              />
            </div>

            <div className="w-full  md:w-1/3">
              <label className="my-auto">
                <span className="block w-full font-lato text-lg font-light capitalize text-gray-800">
                  Upload New Profile Picture
                </span>
                <hr />
                <input
                  className="mt-1 text-sm font-light"
                  type="file"
                  accept="image/png"
                  {...register('image')}
                />
                <span className="text-md absolute font-light italic text-gray-600">
                  .png files only
                </span>
              </label>
            </div>
          </div>

          <div className="p-2">
            <div className="flex gap-x-2">
              <p className="font-lato text-2xl font-normal">Socials</p>
              <p className="text-md my-auto font-lato font-light">
                (leave blank if none)
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Input
                type="url"
                name="Twitter"
                label="Twitter"
                errors={errors}
                placeholder="https://twitter.com/username"
                pattern={/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/}
                message="enter a valid twitter url"
              />
              <Input
                type="url"
                name="Instagram"
                label="Instagram"
                errors={errors}
                placeholder="https://instagram.com/username"
                pattern={
                  /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/
                }
                message="enter a valid instagram url"
              />
              <Input
                type="url"
                name="Linkedin"
                label="Linkedin"
                errors={errors}
                placeholder="https://linkedin.com/in/username"
                pattern={/^https?:\/\/(www\.)?linkedin\.com\/.*$/}
                message="enter a valid linkedin url"
              />
            </div>
          </div>
        </div>
        <label className="mx-auto block w-[95%] md:w-[98%]">
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
