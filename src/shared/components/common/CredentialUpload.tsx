import { useState } from 'react';
import document from '../../assets/icons/document.svg';
import { ErrorContainer, Select, SelectOption } from '../form';
import { Control, Controller, FieldError } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { useLicenseTypesQuery } from '../../api/license_type/licenceType.hooks';

export interface CredentialFormData {
  licenseTypeId?: string;
}

export interface CredentialUploadProps {
  credentialFiles: File[];
  setCredentialFiles: React.Dispatch<React.SetStateAction<File[]>>;
  // No other way to safely type this, tried everything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  licenseTypeError: FieldError | undefined;
  credentialFilesErrorMessage: string;
  setCredentialFilesErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  optional?: boolean;
}

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

export function CredentialUpload({
  credentialFiles,
  setCredentialFiles,
  control,
  licenseTypeError,
  credentialFilesErrorMessage,
  setCredentialFilesErrorMessage,
  optional,
}: CredentialUploadProps) {
  const [dragging, setDragging] = useState(false);

  const { data: licenseTypes } = useLicenseTypesQuery();

  const credentialOptions =
    licenseTypes?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? [];

  // we want other to show up first in the list
  // TODO if they request more sort priorities, we should just store those directly in the db
  credentialOptions.sort((a, b) => {
    if (a.label === 'Other') return -1;
    if (b.label === 'Other') return 1;
    return 0;
  });

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const processFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter((file) =>
      ALLOWED_FILE_TYPES.includes(file.type),
    );

    const nonPDFs = Array.from(files).filter(
      (file) => !ALLOWED_FILE_TYPES.includes(file.type),
    );
    if (nonPDFs.length) {
      setCredentialFilesErrorMessage(
        'Please upload in .pdf, .png, .jpg format',
      );
      return;
    }

    setCredentialFiles((prevFiles) => {
      const existingFileNames = new Set(prevFiles.map((f) => f.name));
      const uniqueFiles = newFiles.filter(
        (f) => !existingFileNames.has(f.name),
      );
      return [...prevFiles, ...uniqueFiles];
    });

    setCredentialFilesErrorMessage('');
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      processFiles(event.dataTransfer.files);
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      processFiles(event.target.files);
    }

    // Reset the value of the input so that after removing a file and re-adding it the change still registers
    event.target.value = '';
  };

  const onFileRemove = (index: number) => {
    setCredentialFiles((prevFiles) =>
      prevFiles.filter((_file, i) => i !== index),
    );
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-24 font-bold">What are your credentials?</span>
      <div className="relative mt-12 w-full">
        <ErrorContainer err={licenseTypeError}>
          <Controller
            control={control}
            rules={
              optional
                ? {}
                : {
                    required: 'Credential Type is required',
                  }
            }
            name={'licenseTypeId'}
            render={({ field: { onChange, value, name } }) => {
              const options: SelectOption[] = credentialOptions;
              return (
                <Select
                  value={
                    value
                      ? options.find((o) => o.value === value.toString())
                      : undefined
                  }
                  name={name}
                  isMulti={false}
                  isSearchable={true}
                  onChange={(val: SingleValue<SelectOption>) => {
                    onChange(val ? val.value : undefined);
                  }}
                  placeholder={'Credentials'}
                  options={options}
                  error={!!licenseTypeError}
                />
              );
            }}
          />
        </ErrorContainer>
      </div>
      <div className={`mt-32 flex flex-col items-center`}>
        <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          <label
            htmlFor="fileUploadInput"
            className="flex cursor-pointer flex-col items-center gap-5 rounded-lg border border-[transparent] p-2 text-center text-14 hover:bg-backgroundSecondary"
            style={{
              backgroundColor: dragging ? 'var(--background-secondary)' : '',
              borderColor: credentialFilesErrorMessage ? 'var(--red)' : '',
            }}
          >
            <img
              className="h-20 w-20"
              src={document}
              alt="upload-credentials"
            ></img>
            Drag & drop or click to upload (.pdf, .jpg, .png)
          </label>
          <input
            type="file"
            onChange={onFileChange}
            style={{ display: 'none' }}
            id="fileUploadInput"
            multiple
            accept={'.pdf,.jpg,.png'}
          />
        </div>
        <div className="mt-2 self-start text-14 font-medium text-red">
          {credentialFilesErrorMessage}
        </div>
        <div>
          {credentialFiles.map((file, index) => {
            const filename = file.name.split('.');
            filename.pop(); //remove extension

            return (
              <div key={file.name} className="flex gap-2 font-semibold">
                <div className="flex text-14">
                  <p className="w-24 truncate">{...filename}</p>.
                  {file.name.split('.').slice(-1)}
                </div>
                <button className="text-12" onClick={() => onFileRemove(index)}>
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
