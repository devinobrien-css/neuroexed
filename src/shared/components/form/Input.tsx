import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import cx from 'classnames';

export interface InputProps {
  name: string;
  label?: string;
  errors: FieldErrors;
  pattern?: RegExp;
  message?: string;
  required?: boolean | string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

/**
 * A generic input component
 * @note The inclusion of the UseFormRegisterReturn type is to allow for the
 *      input component to be used with react-hook-form.
 * @param {InputProps} props - The standard props for the input component
 * @returns {ReactNode} - A generic input component
 */
export const Input = (props: InputProps): ReactNode => {
  const { register } = useFormContext();
  const { label, name, placeholder, type, pattern, message, required, errors } =
    props;

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
      <input
        id={name}
        type={type}
        className={cx(
          'text-md border-0 bg-transparent p-0 font-normal outline-none ring-transparent placeholder:font-light placeholder:italic placeholder:text-gray-400',
          {
            'italic text-blue-400 underline':
              type === 'url' || type === 'email',
          },
        )}
        placeholder={placeholder}
        {...register(name, {
          required: required,
          pattern: pattern && {
            value: pattern,
            message: message ?? '',
          },
        })}
      />
    </label>
  );
};
