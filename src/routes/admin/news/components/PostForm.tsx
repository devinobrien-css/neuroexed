import { TextArea } from '../../../../shared/components/form/Textarea';
import { UseFormRegister } from 'react-hook-form';
import { Input } from '../../../../shared/components/form/Input';
import { Post } from '../../../../shared/types/post.types';

interface NewsFormProps {
  register: UseFormRegister<Post>;
  state: boolean;
}
export const NewsForm = ({ register, state }: NewsFormProps) => {
  return (
    <div
      className={`transition-all ${
        state ? 'h-[100%] opacity-100' : 'h-0 overflow-clip opacity-0'
      }`}
    >
      <div className="flex w-full gap-x-4 p-4">
        <div className="flex w-1/2 flex-col gap-y-4">
          <Input name="title" register={register} />
          <Input name="date" type="date" register={register} />
        </div>
        <div className="w-1/2">
          <TextArea name="content" register={register} />
        </div>
      </div>
    </div>
  );
};
