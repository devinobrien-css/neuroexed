import { useState } from 'react';
import {
  MEMBERS_QUERY_KEY,
  useCreateMember,
} from '../../../../shared/hooks/memberHooks';
import { FormProvider, useForm } from 'react-hook-form';
import { MemberForm } from './MemberForm';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { Button } from '../../../../shared/components/form/Button';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const NewMember = ({
  setNewPerson,
}: {
  setNewPerson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: createMember } = useCreateMember({
    onSuccess: async () => {
      await queryClient.invalidateQueries(MEMBERS_QUERY_KEY);
      toast.success('Member created successfully');
      setIsOpen(false);
      setNewPerson(false);
    },
    onError: () => {
      toast.error('Member creation failed');
    },
  });

  const form = useForm<MemberFormInput>({
    defaultValues: {
      'Year Joined': new Date().toUTCString(),
    },
  });
  const { watch, handleSubmit, reset } = form;

  const onSubmit = async (data: MemberFormInput) => {
    createMember(data);
  };

  const imagePreview = watch('image');

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'border-b-2  bg-white transition-all'}
        id={'new-member'}
      >
        <div className="flex flex-row justify-between p-4">
          <div className="flex">
            <div className="w-16">
              <img
                className="my-auto block rounded-lg"
                alt="uploaded file"
                src={
                  imagePreview?.length
                    ? URL.createObjectURL(imagePreview?.[0])
                    : 'https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/male.png'
                }
              />
            </div>
            <div className="ml-2 ">
              <p className="text-4xl font-light">
                {watch('First Name')} {watch('Last Name')}
              </p>
              <p className="text-2xl font-light">{watch('Email')}</p>
            </div>
          </div>
          <div className="">
            <Button
              color="gray"
              title={isOpen ? 'cancel' : 'edit'}
              type="button"
              onClick={() => {
                if (isOpen) {
                  reset();
                  setNewPerson(false);
                }
                setIsOpen(!isOpen);
              }}
            />
            <Button color="blue" type="submit" title="create" />
            <Button
              color="red"
              title="delete"
              type="button"
              onClick={() => {
                reset();
                setNewPerson(false);
              }}
            />
          </div>
        </div>
        <MemberForm isOpen={isOpen} />
      </form>
    </FormProvider>
  );
};
