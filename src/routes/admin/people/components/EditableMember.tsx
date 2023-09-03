import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../shared/components/form/Button";
import useMembers from "../../../../shared/hooks/useMembers";
import { MemberFormInput } from "../../../../shared/types/member.types";
import { MemberForm } from "./MemberForm";

export const EditablePerson = ({ data }: { data: any }) => {
  const [state, setState] = useState<boolean>(false);

  const { deleteMember, updateMember } = useMembers();

  const { register, watch, handleSubmit } = useForm<MemberFormInput>({
    defaultValues: {
      "First Name": data?.first.S,
      "Last Name": data.last.S,
      "Collegiate Title": data.collegiate_title.S,
      "Lab Title": data.lab_title.S,
      "Year Joined": data.year_joined.S,
      Description: data.description.S,
      Email: data.socials.M.email.S,
      Twitter: data.socials.M.twitter.S,
      Instagram: data.socials.M.instagram.S,
      Linkedin: data.socials.M.linkedin.S,
      image: undefined,
    },
  });

  const onSubmit = (data: MemberFormInput) => {
    updateMember(data);
    setState(false);
  };

  const imagePreview = watch("image");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`border-gray-600 transition-all p-2 bg-gray-50`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-y-4">
        <div className="flex">
          <div className="w-16 my-auto">
            <img
              className="rounded-lg"
              alt="uploaded file"
              src={
                imagePreview?.length
                  ? URL.createObjectURL(imagePreview?.[0])
                  : `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${data.last.S.replace(
                      "'",
                      "",
                    ).toLowerCase()}.png`
              }
            />
          </div>
          <div className="ml-2 my-auto">
            <p className="text-4xl font-light">
              {data.first.S} {data.last.S}
            </p>
            <p className="text-2xl font-light">{data.socials.M.email.S}</p>
          </div>
        </div>
        <div className="flex my-auto">
          <Button
            color="blue"
            type="button"
            title={state ? "cancel" : "edit"}
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
                  deleteMember(data?.socials.M.email.S);
                  setState(false);
                }}
              />
            </>
          )}
        </div>
      </div>
      <MemberForm register={register} state={state} />
    </form>
  );
};
