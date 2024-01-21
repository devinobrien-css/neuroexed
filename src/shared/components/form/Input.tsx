import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import cx from 'classnames';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
}
export const Input = <T extends FieldValues>({
  register,
  name,
  ...rest
}: InputProps<T> & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label
      htmlFor={name}
      className={
        'cursor-pointer justify-between rounded-lg border bg-white p-2 shadow hover:shadow-lg'
      }
    >
      <span className="font-lato text-xl text-gray-800">{name}</span>
      <input
        id={name}
        className="text-md w-full border-0 border-gray-300 font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};

interface SelectProps<T extends FieldValues> {
  className?: string;
  register: UseFormRegister<T>;
  options: string[];
  name: Path<T>;
}
export const Select = <T extends FieldValues>({
  register,
  options,
  name,
  className,
  ...rest
}: SelectProps<T>) => {
  return (
    <label
      htmlFor={name}
      className={cx(
        className,
        'cursor-pointer justify-between rounded-lg border bg-white p-2 shadow hover:shadow-lg',
      )}
    >
      <span className="block w-full border-b font-lato text-xl capitalize text-gray-800">
        {name}
      </span>
      <select
        id={name}
        className="text-md w-full border-none px-0 font-lato"
        {...register(name)}
        {...rest}
      >
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};
