import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useMembers from '../../../../shared/hooks/useMembers';
import {
  MemberFormInput,
  MemberResponse,
} from '../../../../shared/types/member.types';
import { MemberForm } from './MemberForm';
import { Button } from '../../../../shared/components/form/Button';

export const EditablePerson = ({ data }: { data: MemberResponse }) => {
  const [state, setState] = useState<boolean>(false);
  const { deleteMember, updateMember } = useMembers();

  const form = useForm<MemberFormInput>({
    defaultValues: {
      'First Name': data.first,
      'Last Name': data.last,
      'Collegiate Title': data.collegiate_title,
      'Lab Title': data.lab_title,
      'Lab Status': data.lab_status ?? 'Member',
      'Year Joined': new Date(Number(data.year_joined), 1, 1).toUTCString(),
      Description: data.description,
      Email: data.socials.email,
      Twitter: data.socials.twitter,
      Instagram: data.socials.instagram,
      Linkedin: data.socials.linkedin,
      image: undefined,
      order: data.order ?? 0,
    },
  });
  const { watch, handleSubmit } = form;

  const onSubmit = (data: MemberFormInput) => {
    updateMember(data);
    setState(false);
  };

  const imagePreview = watch('image');
  // eslint-disable-next-line quotes
  const img = data.last.replace("'", '').toLowerCase();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-gray-600 bg-gray-50 p-2 transition-all"
      >
        <div className="flex flex-col justify-between gap-y-4 md:flex-row">
          <div className="flex">
            <div className="my-auto w-16">
              <img
                className="rounded-lg"
                alt="uploaded file"
                src={
                  imagePreview?.length
                    ? URL.createObjectURL(imagePreview?.[0])
                    : `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${img}.png`
                }
              />
            </div>
            <div className="my-auto ml-2">
              <p className="font-light md:text-2xl">
                {data.first} {data.last}
              </p>
              <p className="font-light md:text-2xl">{data.socials.email}</p>
            </div>
          </div>
          <div className="my-auto flex">
            <Button
              color="blue"
              type="button"
              title={state ? 'cancel' : 'edit'}
              onClick={() => (state ? setState(false) : setState(true))}
            />
            {state && (
              <>
                <Button color="yellow" title="confirm" type="submit" />
                <Button
                  color="red"
                  title="delete"
                  type="button"
                  onClick={() => {
                    deleteMember(data?.socials.email);
                    setState(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
        <MemberForm isOpen={state} />
      </form>
    </FormProvider>
  );
};
