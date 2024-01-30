import { ReactNode } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import cx from 'classnames';

export interface SelectProps {
  name: string;
  options: string[];
  label?: string;
  errors: FieldErrors;
  required?: boolean | string;
}

/**
 * A generic select component
 * @param {SelectProps} props - The standard props for the Select component
 * @returns {ReactNode} - A generic Select component
 */
export const Select = (props: SelectProps): ReactNode => {
  const { register } = useFormContext();
  const { label, name, required, errors, options } = props;

  return (
    <label
      className="flex flex-col font-lato text-lg font-light"
      htmlFor={name}
    >
      <span>
        {label}
        {required && <span className="text-red-500">*</span>}
        {errors[name] && (
          <span className="text-sm italic text-red-500">
            <>- {errors[name]?.message}</>
          </span>
        )}
      </span>
      <hr />
      <select
        id={name}
        className={cx(
          'text-md border-0 bg-transparent p-0 font-normal outline-none ring-transparent',
        )}
        {...register(name, {
          required: required,
        })}
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
