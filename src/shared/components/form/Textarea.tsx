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
      className={`flex cursor-pointer flex-col rounded-lg border bg-white p-2 shadow hover:shadow-lg`}
    >
      <span className="w-3/12 font-lato text-xl text-gray-800">{name}</span>
      <textarea
        id={name}
        rows={10}
        autoComplete={'false'}
        className="w-full rounded border-0 font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};
