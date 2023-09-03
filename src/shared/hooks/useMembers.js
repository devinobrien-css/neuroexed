import { useMutation } from "@tanstack/react-query";
import { fetchData, putData, removeData, uploadFileToBucket } from "../api/dba";
import { sort_order } from "../types/object_schema";
import { toast } from "react-toastify";
import { member } from "../types/member.types";

const useMembers = () => {
  const { mutate: mutateUser } = useMutation({
    mutationFn: (data) => updateMember(data),
    onSuccess: () => toast.success(`User has been updated!`),
    onError: () => toast.error("User update failed"),
  });

  /** Retrieves all members
   * @returns a set of all members
   */
  const retrieveMembers = () => {
    return null;
  };

  const retrieveMember = (memberId) => {
    return null;
  };

  const createMember = async (member) => {
    await updateMember(member);
  };

  const updateMember = async (data) => {
    const res = await putData(
      "people",
      {},
      member(
        data["First Name"],
        data["Last Name"],
        data["Collegiate Title"],
        data["Lab Title"],
        data["Year Joined"],
        data.Description,
        {
          email: data.Email,
          twitter: data.Twitter,
          linkedin: data.Linkedin,
          instagram: data.Instagram,
        },
      ),
    );

    console.log(res);

    if (member.image) {
      const fileName = `${data.last_name.toLowerCase()}.png`;
      uploadFileToBucket("profile_pictures", fileName, data.image);
    }
  };

  const deleteMember = async (email) => {
    await removeData("people", {
      email: { S: email },
    });
    const sort = await fetchData("sort-orders");
    const output = sort.Items.filter((order) => {
      return order.type.S === "people";
    })[0].sort.L.filter((user) => {
      return user.S !== email;
    });
    await putData("sort-orders", {}, sort_order("people", output));
  };

  return {
    members: retrieveMembers,
    retrieveMember: retrieveMember,
    createMember: createMember,
    updateMember: mutateUser,
    deleteMember: deleteMember,
  };
};

export default useMembers;
