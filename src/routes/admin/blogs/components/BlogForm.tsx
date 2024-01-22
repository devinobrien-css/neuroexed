import { Controller, useFormContext } from 'react-hook-form';
import { BlogFormInput } from '../../../../shared/types/blog.types';
import { Select } from '../../../../shared/components/form/Input';
import cx from 'classnames';
import { DatePicker } from '../../../../shared/components/form/DatePicker';
import { InputWarning } from '../../../../shared/components/form/InputWarning';

interface BlogFormProps {
  isOpen: boolean;
}
export const BlogForm = ({ isOpen }: BlogFormProps) => {
  const { register, control, formState:{errors} } = useFormContext<BlogFormInput>();

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

          <label>
            <p className="font-lato  text-lg font-light">
              Title
              <InputWarning field='title' errors={errors} required/>
            </p>
            <textarea
              {...register('title', {
                required: 'this field is required',
              })}
              className="w-full border-none bg-transparent p-0 outline-none placeholder:font-light placeholder:text-gray-400 placeholder:italic"
              placeholder='Enter post title here...'
            />
          </label>

          <label>
            <p className="font-lato text-lg font-light">Source
              <InputWarning field='source' errors={errors} required/>
            </p>
            <textarea
              {...register('source', {
                required: 'this field is required',
                pattern: {
                  value: /https?:\/\/[\w\-_]+(\.[\w\-_]+)+[/#?]?.*$/,
                  message: 'invalid url',
                },
              })}
              className="w-full border-none bg-transparent p-0 italic text-blue-400 underline outline-none placeholder:font-light placeholder:text-gray-400 placeholder:italic"
              placeholder='Enter url here...'
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
