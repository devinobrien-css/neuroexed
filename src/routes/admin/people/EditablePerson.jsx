import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/form/Button";
import { MemberForm } from "./MemberForm";
import useMembers from "../../../shared/hooks/useMembers";

export const EditablePerson = (args) => {
  const [state, setState] = useState(false);

  const { deleteMember, updateMember } = useMembers();

  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      "First Name": args.data?.first.S,
      "Last Name": args.data.last.S,
      "Collegiate Title": args.data.collegiate_title.S,
      "Lab Title": args.data.lab_title.S,
      "Year Joined": args.data.year_joined.S,
      Description: args.data.description.S,
      Email: args.data.socials.M.email.S,
      Twitter: args.data.socials.M.twitter.S,
      Instagram: args.data.socials.M.instagram.S,
      Linkedin: args.data.socials.M.linkedin.S,
    },
  });

  const onSubmit = async (data) => {
    await updateMember(data);
    setState();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`border-gray-600 transition-all p-2 bg-gray-50`}
      id={args.id}
    >
      <div className="flex flex-col md:flex-row justify-between gap-y-4">
        <div className="flex">
          <div className="w-16 my-auto">
            <img
              className="rounded-lg"
              alt="uploaded file"
              src={
                watch("image")?.length
                  ? URL.createObjectURL(watch("image")?.[0])
                  : `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${args.data.last.S.replace(
                      "'",
                      "",
                    ).toLowerCase()}.png`
              }
            />
          </div>
          <div className="ml-2 my-auto">
            <p className="text-4xl font-light">
              {args.data.first.S} {args.data.last.S}
            </p>
            <p className="text-2xl font-light">{args.data.socials.M.email.S}</p>
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
                onClick={async () => {
                  await deleteMember(watch("email"));
                  setState(false);
                  document.querySelector("#" + args.id).replaceWith();
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
