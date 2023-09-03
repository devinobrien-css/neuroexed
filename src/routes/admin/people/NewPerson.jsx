import { useState } from "react";
import useMembers from "../../../shared/hooks/useMembers";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/form/Button";
import { MemberForm } from "./MemberForm";

const NewPerson = ({ remove }) => {
  // state control variables
  const [state, setState] = useState(true);

  const { createMember } = useMembers();
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await createMember(data);
  };
  console.log(watch("image"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`border-b-2 transition-all bg-white`}
      id={"new-blog"}
    >
      <div className="flex flex-row justify-between p-4">
        <div className="flex">
          <div className="w-16">
            <img
              className="block my-auto"
              alt="uploaded file"
              src={
                watch("image")?.length
                  ? URL.createObjectURL(watch("image")?.[0])
                  : `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/profile.png`
              }
            />
          </div>
          <div className="ml-2 ">
            <p className="text-4xl font-light">
              {watch("first_name")} {watch("last_name")}
            </p>
            <p className="text-2xl font-light">{watch("email")}</p>
          </div>
        </div>
        <div className="">
          <Button
            color="blue"
            title={state ? "cancel" : "edit"}
            type="button"
            onClick={() => {
              if (state) remove(false);
              state ? setState(false) : setState(true);
            }}
          />
          {state ? (
            <>
              <Button color="yellow" type="submit" title="confirm" />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <MemberForm register={register} state={state} />
    </form>
  );
};

export default NewPerson;
