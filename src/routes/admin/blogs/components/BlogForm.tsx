import { Controller, useFormContext } from 'react-hook-form';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { Select } from '../../../../shared/components/form/Input';
import cx from 'classnames';
import { DatePicker } from '../../../../shared/components/form/DatePicker';

interface BlogFormProps {
  isOpen: boolean;
}
export const BlogForm = ({ isOpen }: BlogFormProps) => {
  const { register, control } = useFormContext<BlogFormInput>();

  return (
    <div
      className={cx('gap-x-4 overflow-hidden transition md:flex', {
        'h-full pb-6': isOpen,
        'h-0 opacity-0': !isOpen,
      })}
    >
      <div className="md:w-1/2">
        <div className=" rounded-lg border bg-white p-2 shadow hover:shadow-lg">
          <p className="font-lato text-2xl font-normal">Blog Details</p>

          <label>
            <p className="font-lato  text-lg font-light">Title</p>
            <input
              {...register('title', {
                required: true,
              })}
              className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
            />
          </label>

          <label>
            <p className="font-lato  text-lg font-light">Source</p>
            <input
              {...register('source', {
                required: true,
              })}
              className="w-full bg-transparent outline-none placeholder:font-light placeholder:text-gray-400 "
            />
          </label>
        </div>
        <br />
        <div className="gap-x-4 md:flex">
          <div className="w-full rounded-lg shadow hover:shadow-lg md:w-1/2">
            <Controller
              name={'date'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  showLabel
                  dateClassName="border p-2 font-lato"
                  inline={false}
                  label="Date Published"
                  toDate={new Date()}
                  selected={new Date(value)}
                  onSelect={(date) => onChange(date)}
                />
              )}
            />
          </div>
          <Select
            name="type"
            className="md:w-1/2"
            options={['BLOG', 'PODCAST']}
            register={register}
          />
        </div>
      </div>

      {/* <div className="flex w-1/2 flex-col gap-y-4">
        <Input name="title" register={register} />
        <Input name="date" type="date" register={register} />
        <Select name="type" options={['BLOG', 'PODCAST']} register={register} />
        <Input name="source" register={register} />
      </div> */}
      <div className=" w-1/2 border">
        <textarea
          {...register('content')}
          rows={14}
          className="w-full border-none"
        />
      </div>
    </div>
  );
};
