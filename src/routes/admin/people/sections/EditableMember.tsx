import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MEMBERS_QUERY_KEY,
  useDeleteMember,
  useUpdateMember,
} from '../../../../shared/hooks/memberHooks';
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
import { toBase64 } from '../../../../shared/api/util';
import { Loader } from '../../../../shared/components/Loader';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../../shared/components/modals/Modal';

export const EditableMember = ({ data }: { data: MemberResponse }) => {
  // STATES
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  // HOOKS
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMember, isLoading: deleteLoading } = useDeleteMember({
    onSuccess: async () => {
      await queryClient.invalidateQueries(MEMBERS_QUERY_KEY);
      toast.success('Member deleted successfully');
      navigate('/admin/people');
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Member deletion failed');
    },
  });

  // FORM CONTEXT
  const getYearJoined = () => {
    try {
      return new Date(data.year_joined).toUTCString();
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
  const { handleSubmit } = form;

  const { mutate: updateMember, isLoading: updateLoading } = useUpdateMember({
    onSuccess: async () => {
      await queryClient.invalidateQueries(MEMBERS_QUERY_KEY);
      toast.success('Member updated successfully');
      navigate('/admin/people');
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Member update failed');
    },
  });

  const onSubmit = (data: MemberFormInput) => {
    updateMember(data);
  };

  const upload = form.watch('image')?.[0];
  const [previewUrl, setPreviewUrl] = useState<string>('');
  useEffect(() => {
    const handleFileChange = async () => {
      if (form.watch('image')?.[0]) {
        setPreviewUrl((await toBase64(form.watch('image')![0])) as string);
      }
    };
    handleFileChange();
  }, [form, upload]);

  const isLoading = updateLoading || deleteLoading;

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
      {isLoading && (
        <Modal closeModal={() => null}>
          <Loader />
        </Modal>
      )}
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cx('border-gray-600 bg-gray-50 p-2 transition-all', {
            'bg-white': isOpen,
          })}
        >
          <div
            id={data.first}
            className="flex flex-col justify-between gap-y-4 md:flex-row"
          >
            <div className="flex">
              <div className="my-auto w-16">
                {upload ? (
                  <img
                    alt="uploaded file"
                    className="h-16 w-16 rounded-lg object-cover object-top shadow"
                    src={previewUrl}
                  />
                ) : (
                  <SafeProfilePicture
                    className="h-16 w-16 rounded-lg object-cover object-top shadow"
                    firstName={data.first}
                    image={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${
                      data.profile_picture
                    }`}
                  />
                )}
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
