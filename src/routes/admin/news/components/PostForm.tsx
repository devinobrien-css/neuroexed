import { TextArea } from '../../../../shared/components/form/Textarea';
import { UseFormRegister } from 'react-hook-form';
import { Post } from '../../../../shared/types/post.types';
import cx from 'classnames';

interface NewsFormProps {
  register: UseFormRegister<Post>;
  state: boolean;
}
export const NewsForm = ({ register, state }: NewsFormProps) => {
  return (
    <div
      className={cx('transition-all', {
        'h-[100%] opacity-100': state,
        'h-0 overflow-hidden opacity-0': !state,
      })}
    >
      <div className="flex w-full gap-x-4 p-4">
        <div className="flex w-1/2 flex-col gap-y-4">
          <input {...register('title')} />
          <input {...register('date')} />
        </div>
        <div className="w-1/2">
          <TextArea name="content" register={register} />
        </div>
      </div>
    </div>
  );
};
