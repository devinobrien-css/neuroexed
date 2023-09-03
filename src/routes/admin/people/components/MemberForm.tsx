import { TextArea } from "../../../../shared/components/form/Textarea";

import { UseFormRegister } from "react-hook-form";
import { MemberFormInput } from "../../../../shared/types/member.types";
import { Input, Select } from "../../../../shared/components/form/Input";

interface MemberFormProps {
  register: UseFormRegister<MemberFormInput>;
  state: boolean;
}
export const MemberForm = ({ register, state }: MemberFormProps) => {
  return (
    <div
      className={`transition-all ${
        state ? "h-[100%] opacity-100" : "h-0 overflow-clip opacity-0"
      }`}
    >
      <div className="flex flex-wrap">
        <div className="gap-y-4 flex flex-col md:w-1/2 w-full p-4">
          <p className="font-normal text-2xl font-lato">Personal Information</p>
          <Input name="First Name" register={register} />
          <Input name="Last Name" register={register} />
          <Input name="Email" register={register} />
          <div className="flex justify-between [&>*]:w-1/2 gap-x-6">
            <div className="border-2 p-2 rounded-lg shadow hover:shadow-lg">
              <p className="text-gray-700 text-xl mb-4">Profile Picture</p>
              <div>
                <input
                  className="md:border-l block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  type="file"
                  accept="image/png"
                  {...register("image")}
                />
              </div>
            </div>
            <Select
              register={register}
              name="Lab Status"
              options={["Alumni", "Member"]}
            />
          </div>
          <TextArea name="Description" register={register} />
        </div>

        <div className="gap-y-4 flex flex-col md:w-1/2 w-full p-4">
          <p className="font-normal text-2xl font-lato">Lab Information</p>
          <Input name="Collegiate Title" register={register} />
          <TextArea rows={2} name="Lab Title" register={register} />
          <Input name="Year Joined" register={register} type="date" />

          <p className="font-normal text-2xl font-lato">Socials</p>
          <Input name="Instagram" register={register} />
          <Input name="Linkedin" register={register} />
          <Input name="Twitter" register={register} />
        </div>
      </div>
    </div>
  );
};
