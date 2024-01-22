import { FieldErrors } from 'react-hook-form';

export const InputWarning = ({
  field,
  required,
  errors,
}: {
  field: string;
  required?: boolean;
  errors: FieldErrors;
}) => {
  return (
    <>
      {required && <span className="text-red-500">*</span>}
      {errors[field] && (
        <span className="text-sm italic text-red-500">
          <>- {errors[field]?.message}</>
        </span>
      )}
    </>
  );
};
