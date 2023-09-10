import { TextArea } from '../../../../shared/components/form/Textarea';

import { UseFormRegister } from 'react-hook-form';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { Input, Select } from '../../../../shared/components/form/Input';

interface MemberFormProps {
  register: UseFormRegister<MemberFormInput>;
  state: boolean;
}
export const MemberForm = ({ register, state }: MemberFormProps) => {
  return (
    <div
      className={`transition-all ${
        state ? 'h-[100%] opacity-100' : 'h-0 overflow-clip opacity-0'
      }`}
    >
      <div className="flex flex-wrap">
        <div className="flex w-full flex-col gap-y-4 p-4 md:w-1/2">
          <p className="font-lato text-2xl font-normal">Personal Information</p>
          <Input name="First Name" register={register} />
          <Input name="Last Name" register={register} />
          <Input name="Email" register={register} />
          <div className="flex justify-between gap-x-6 [&>*]:w-1/2">
            <div className="rounded-lg border-2 p-2 shadow hover:shadow-lg">
              <p className="mb-4 text-xl text-gray-700">Profile Picture</p>
              <div>
                <input
                  className="my-auto block h-min w-min cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none md:border-l"
                  type="file"
                  accept="image/png"
                  {...register('image')}
                />
              </div>
            </div>
            <Select
              register={register}
              name="Lab Status"
              options={['Alumni', 'Member']}
            />
          </div>
          <TextArea name="Description" register={register} />
        </div>

        <div className="flex w-full flex-col gap-y-4 p-4 md:w-1/2">
          <p className="font-lato text-2xl font-normal">Lab Information</p>
          <Input name="Collegiate Title" register={register} />
          <TextArea rows={2} name="Lab Title" register={register} />
          <Input name="Year Joined" register={register} type="date" />

          <p className="font-lato text-2xl font-normal">Socials</p>
          <Input name="Instagram" register={register} />
          <Input name="Linkedin" register={register} />
          <Input name="Twitter" register={register} />
        </div>
      </div>
    </div>
  );
};
