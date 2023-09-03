import { TextareaHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

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
      className={`bg-white flex flex-col cursor-pointer shadow hover:shadow-lg border rounded-lg p-2`}
    >
      <span className="w-3/12 text-xl font-lato text-gray-800">{name}</span>
      <textarea
        id={name}
        rows={10}
        autoComplete={"false"}
        className="w-full border-0 rounded font-lato"
        {...register(name)}
        {...rest}
      />
    </label>
  );
};
