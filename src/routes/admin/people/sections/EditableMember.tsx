import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useMembers from '../../../../shared/hooks/memberHooks';
import {
  MemberFormInput,
  MemberResponse,
} from '../../../../shared/types/member.types';
import { MemberForm } from './MemberForm';
import { Button } from '../../../../shared/components/form/Button';
import { ConfirmationModal } from '../../../../shared/components/modals/ConfirmationModal';
import { SafeProfilePicture } from '../../../../shared/components/common/SafeProfilePicture';
import { toast } from 'react-toastify';
import cx from 'classnames';

export const EditableMember = ({ data }: { data: MemberResponse }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { deleteMember, updateMember } = useMembers();

  const getYearJoined = () => {
    try {
      const date = new Date(data.year_joined);
      return date.toUTCString();
    } catch {
      return new Date(Number(data.year_joined), 1, 1).toUTCString();
    }
  };

  const form = useForm<MemberFormInput>({
    defaultValues: {
      'First Name': data.first,
      'Last Name': data.last,
      'Collegiate Title': data.collegiate_title,
      'Lab Title': data.lab_title,
      'Lab Status': data.lab_status ?? 'Member',
      'Year Joined': getYearJoined(),
      Description: data.description,
      Email: data.socials.email,
      Twitter: data.socials.twitter,
      Instagram: data.socials.instagram,
      Linkedin: data.socials.linkedin,
      image: undefined,
      order: data.order,
    },
  });
  const { watch, handleSubmit } = form;

  const onSubmit = (data: MemberFormInput) => {
    updateMember(data);
    setIsOpen(false);
  };

  const imagePreview = watch('image');
  // eslint-disable-next-line quotes
  const img = data.last.replace("'", '').toLowerCase();

  const userProfilePicture = imagePreview?.length
    ? URL.createObjectURL(imagePreview?.[0])
    : `${import.meta.env.VITE_S3_PROFILE_PICTURES}${img}.png`;

  return (
    <>
      {confirmDelete && (
        <ConfirmationModal
          title={'Delete Member'}
          message={`Are you sure you want to delete ${data.first} ${data.last}?`}
          closeModal={() => setConfirmDelete(false)}
          confirm={() => {
            deleteMember(data.socials.email);
            setConfirmDelete(false);
            setIsOpen(false);
          }}
          confirmText={'Delete'}
          cancelText={'Cancel'}
        />
      )}
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cx('border-gray-600 bg-gray-50 p-2 transition-all', {
            'bg-white': isOpen,
          })}
        >
          <div className="flex flex-col justify-between gap-y-4 md:flex-row">
            <div className="flex">
              <div className="my-auto w-16">
                <SafeProfilePicture
                  className="h-16 w-16 rounded-lg object-cover object-top shadow"
                  firstName={data.first}
                  image={
                    userProfilePicture ??
                    `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${img}.png`
                  }
                />
              </div>
              <div className="my-auto ml-2">
                <p className="font-light md:text-2xl">
                  {data.first} {data.last}
                  {' | '}
                  <span className=" text-gray-400">
                    {data.lab_status}
                    {data.collegiate_title && ', ' + data.collegiate_title}
                  </span>
                </p>
                <p className="font-light text-blue-400 underline md:text-2xl">
                  {data.socials.email}
                </p>
              </div>
            </div>
            <div className="my-auto flex">
              <Button
                color="gray"
                type="button"
                title={isOpen ? 'cancel' : 'edit'}
                onClick={() => {
                  if (isOpen) {
                    form.reset({
                      'First Name': data.first,
                      'Last Name': data.last,
                      'Collegiate Title': data.collegiate_title,
                      'Lab Title': data.lab_title,
                      'Lab Status': data.lab_status ?? 'Member',
                      'Year Joined': getYearJoined(),
                      Description: data.description,
                      Email: data.socials.email,
                      Twitter: data.socials.twitter,
                      Instagram: data.socials.instagram,
                      Linkedin: data.socials.linkedin,
                      image: undefined,
                      order: data.order,
                    });
                    toast.warn('Unsaved changes have been discarded.', {
                      autoClose: 1000,
                    });
                  }
                  setIsOpen(!isOpen);
                }}
              />
              {isOpen && <Button color="blue" title="confirm" type="submit" />}
              <Button
                color="red"
                title="delete"
                type="button"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              />
            </div>
          </div>
          <MemberForm isOpen={isOpen} />
        </form>
      </FormProvider>
    </>
  );
};
