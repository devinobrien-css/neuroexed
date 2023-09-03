import { useState } from "react";
import { Button } from "../../../../shared/components/form/Button";
import useBlogs from "../../../../shared/hooks/useBlogs";
import { useForm } from "react-hook-form";
import { BlogFormInput } from "../../../../shared/types/blog.types";
import { BlogForm } from "./BlogForm";

export const EditableBlog = ({ data }: { data: any }) => {
  const [state, setState] = useState(false);

  const { updateBlog } = useBlogs();

  const { register, handleSubmit } = useForm<BlogFormInput>({
    defaultValues: {
      title: data["media_title"].S,
      date: data["media_date"].S,
      content: data["media_content"].S,
      source: data["media_source"].S,
      type: data["media_type"].S,
    },
  });

  console.log(data["media_type"].S);

  const onSubmit = (data: BlogFormInput) => {
    updateBlog(data);
    setState(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between py-4">
        <p className="md:text-xl">{data["media_title"].S}</p>
        <div className="flex justify-end gap-x-4">
          <Button
            color="blue"
            type="button"
            onClick={() => {
              state ? setState(false) : setState(true);
            }}
            title={state ? "cancel" : "edit"}
          />
          {state ? (
            <>
              <Button color="yellow" type="submit" title="confirm" />

              <Button
                color="red"
                title="delete"
                type="button"
                onClick={() => {
                  setState(false);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <BlogForm register={register} state={state} />
    </form>
  );
};
