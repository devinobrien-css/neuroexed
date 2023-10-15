import { UseFormRegister } from 'react-hook-form';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { Input, Select } from '../../../../shared/components/form/Input';
import { TextArea } from '../../../../shared/components/form/Textarea';
import cx from 'classnames';

interface BlogFormProps {
  register: UseFormRegister<BlogFormInput>;
  state: boolean;
}
export const BlogForm = ({ register, state }: BlogFormProps) => {
  return (
    <div
      className={cx('gap-x-4 overflow-hidden transition md:flex', {
        'h-full pb-6': state,
        'h-0 opacity-0': !state,
      })}
    >
      <div className="flex w-1/2 flex-col gap-y-4">
        <Input name="title" register={register} />
        <Input name="date" type="date" register={register} />
        <Select name="type" options={['BLOG', 'PODCAST']} register={register} />
        <Input name="source" register={register} />
      </div>
      <div className="w-1/2 ">
        <TextArea name="content" register={register} rows={14} />
      </div>
    </div>
  );
};
