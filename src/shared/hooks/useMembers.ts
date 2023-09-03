import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, putData, removeData, uploadFileToBucket } from "../api/dba";
import { sort_order } from "../types/object_schema";
import { toast } from "react-toastify";
import { MemberFormInput, member } from "../types/member.types";
import { AxiosError } from "axios";

function orderJsonObjects(order, objects) {
  const output = [];
  order.forEach((order_by) => {
    output.push(
      objects.filter((object) => {
        return object.email.S === order_by.S;
      })[0],
    );
  });
  return output;
}

const useMembers = () => {
  const { data: members, refetch: refetchMembers } = useQuery({
    queryKey: ["MEMBERS"],
    queryFn: async () => {
      const sort = await fetchData("sort-orders");
      const res = await fetchData("people");

      if (sort?.Count !== 0) {
        if (
          sort?.Items?.filter((order) => {
            return order.type?.S === "people";
          })[0]?.sort?.L?.length !== 0
        ) {
          return orderJsonObjects(
            sort?.Items?.filter((order) => {
              return order.type?.S === "people";
            })[0].sort?.L,
            res?.Items ?? [],
          );
        }
      }
      return res?.Items ?? [];
    },
  });

  const { mutate: mutateMember } = useMutation<
    void,
    AxiosError,
    MemberFormInput
  >({
    mutationFn: async (data) => {
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

      if (res?.result.ResponseMetadata.HTTPStatusCode !== 200) {
        throw Error("Update member failed");
      }

      if (data.image?.length) {
        const fileName = `${data["Last Name"].toLowerCase()}.png`;
        uploadFileToBucket("profile_pictures", fileName, data.image);
      }

      refetchMembers();
    },
    onSuccess: () => toast.success(`User has been updated!`),
    onError: () => toast.error("User update failed"),
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: (data) => removeMember(data),
    onSuccess: () => {
      toast.success(`User has been deleted!`);
      refetchMembers();
    },
    onError: () => toast.error("User deletion failed"),
  });

  const removeMember = async (email: string) => {
    await removeData("people", {
      email: { S: email },
    });
    const sort = await fetchData("sort-orders");
    const output = sort?.Items?.filter((order) => {
      return order.type.S === "people";
    })[0].sort.L.filter((user: any) => {
      return user.S !== email;
    });
    await putData("sort-orders", {}, sort_order("people", output));
  };

  return {
    members: members,
    createMember: mutateMember,
    updateMember: mutateMember,
    deleteMember: deleteMember,
  };
};

export default useMembers;
