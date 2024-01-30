import { Controller, useFormContext } from 'react-hook-form';
import { BlogFormInput } from '../../../../shared/types/blog.types';

import cx from 'classnames';
import { DatePicker } from '../../../../shared/components/form/DatePicker';
import { Input } from '../../../../shared/components/form/Input';

interface BlogFormProps {
  isOpen: boolean;
}
export const BlogForm = ({ isOpen }: BlogFormProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BlogFormInput>();

  return (
    <div
      className={cx('gap-x-4 transition md:flex', {
        'h-full pb-6': isOpen,
        'h-0 overflow-clip opacity-0': !isOpen,
      })}
    >
      <div className="md:w-1/2">
        <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg">
          <p className="font-lato text-2xl font-normal">Details</p>

          <Input
            name="Title"
            label="Title"
            errors={errors}
            required="this is required"
            placeholder="Enter post title here..."
          />

          <label>
            <p className="font-lato text-lg font-light">Source</p>
            <textarea
              {...register('source', {
                required: 'this field is required',
                pattern: {
                  value: /https?:\/\/[\w\-_]+(\.[\w\-_]+)+[/#?]?.*$/,
                  message: 'invalid url',
                },
              })}
              className="w-full border-none bg-transparent p-0 italic text-blue-400 underline outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400"
              placeholder="Enter url here..."
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
          <div className="w-full border-2 border-green-500 md:w-1/3">
            <label
              htmlFor={'type'}
              className={'cursor-pointer justify-between'}
            >
              <span className="block w-full border-b font-lato text-xl capitalize text-gray-800">
                Post Type
              </span>
              <select
                id={'type'}
                className="text-md w-full border-none bg-transparent px-0 font-lato"
                {...register('type')}
              >
                {['BLOG', 'PODCAST'].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="h-fit w-1/2 rounded-lg border bg-white p-1">
        <label>
          <p className="p-1 font-lato text-2xl font-normal">Description</p>
          <textarea
            {...register('content')}
            rows={8}
            className="w-full border-none bg-transparent p-2 outline-none placeholder:font-light placeholder:text-gray-400"
            placeholder="Enter a description here..."
          />
        </label>
      </div>
    </div>
  );
};
