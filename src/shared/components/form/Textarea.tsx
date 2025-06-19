import { TextareaHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TextAreaProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
}
export const TextArea = <T extends FieldValues>({
  name,
  register,
  ...rest
}: TextAreaProps<T> & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <label
      htmlFor={name}
      className={
        'dark:border-dark-border dark:bg-dark-surface flex cursor-pointer flex-col rounded-lg border bg-white p-2 shadow hover:shadow-lg'
      }
    >
      <span className="dark:text-dark-text w-3/12 font-lato text-xl text-gray-800">
        {name}
      </span>
      <textarea
        id={name}
        rows={10}
        autoComplete={'false'}
        className="dark:bg-dark-bg dark:text-dark-text w-full rounded border-0 font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};
