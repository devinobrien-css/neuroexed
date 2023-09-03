import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes } from "react";

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
      className={`bg-white justify-between cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="text-xl font-lato text-gray-800">{name}</span>
      <input
        id={name}
        className="w-full border-0 text-md border-gray-300 p-2 font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};

interface SelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  options: string[];
  name: Path<T>;
}
export const Select = <T extends FieldValues>({
  register,
  options,
  name,
  ...rest
}: SelectProps<T>) => {
  return (
    <label
      htmlFor={name}
      className={`bg-white justify-between cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="text-xl font-lato text-gray-800">{name}</span>
      <select
        id={name}
        className="w-full border-0 text-md border-gray-300 p-2 font-lato"
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
