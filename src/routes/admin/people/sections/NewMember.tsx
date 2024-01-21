import { useState } from 'react';
import useMembers from '../../../../shared/hooks/useMembers';
import { FormProvider, useForm } from 'react-hook-form';
import { MemberForm } from './MemberForm';
import { MemberFormInput } from '../../../../shared/types/member.types';
import { Button } from '../../../../shared/components/form/Button';

const NewPerson = ({
  setNewPerson,
}: {
  setNewPerson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const { createMember } = useMembers();

  const form = useForm<MemberFormInput>({
    defaultValues: {
      'Year Joined': new Date().toUTCString(),
    },
  });
  const { watch, handleSubmit } = form;

  const onSubmit = async (data: MemberFormInput) => {
    createMember(data);
    setIsOpen(false);
    setNewPerson(false);
  };

  const imagePreview = watch('image');

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'border-b-2 bg-white transition-all'}
        id={'new-member'}
      >
        <div className="flex flex-row justify-between p-4">
          <div className="flex">
            <div className="w-16">
              <img
                className="my-auto block"
                alt="uploaded file"
                src={
                  imagePreview?.length
                    ? URL.createObjectURL(imagePreview?.[0])
                    : 'https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/profile.png'
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
              color="blue"
              title={isOpen ? 'cancel' : 'edit'}
              type="button"
              onClick={() => {
                isOpen ? setIsOpen(false) : setIsOpen(true);
              }}
            />
            {isOpen ? (
              <>
                <Button color="yellow" type="submit" title="confirm" />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <MemberForm isOpen={isOpen} />
      </form>
    </FormProvider>
  );
};

export default NewPerson;
