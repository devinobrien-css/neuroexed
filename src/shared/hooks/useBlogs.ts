import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, putData, removeData } from "../api/dba";
import { BlogForm, blog } from "../types/blog.types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { sort_order } from "../types/object_schema";

function orderJsonObjects(order, objects) {
  const output = [];
  order.forEach((order_by) => {
    output.push(
      objects.filter((object) => {
        return object.title.S === order_by.S;
      })[0],
    );
  });
  return output;
}

const useBlogs = () => {
  const {
    data: blogs,
    isLoading: blogsLoading,
    refetch: refetchBlogs,
  } = useQuery({
    queryKey: ["BLOGS"],
    queryFn: async () => {
      const sort = await fetchData("sort-orders");
      const res = await fetchData("blogs");

      if (
        sort?.Items.filter((order) => {
          return order.type.S === "blogs";
        })[0].sort.L.length !== 0
      )
        return orderJsonObjects(
          sort?.Items.filter((order) => {
            return order.type.S === "blogs";
          })[0].sort.L,
          res?.Items,
        );
      else return res?.Items;
    },
  });

  const { mutate: updateBlog } = useMutation<void, AxiosError, BlogForm>({
    mutationFn: async (data: BlogForm) => {
      await putData(
        "blogs",
        {},
        blog(data.title, data.type, data.date, data.source, data.content),
      );
    },
    onSuccess: () => {
      toast.success("Blog has been updated!");
      refetchBlogs();
    },
    onError: () => toast.error("Blog could not be updated"),
  });

  const { mutate: deleteBlog } = useMutation<void, AxiosError, string>({
    mutationFn: async (title) => {
      await removeData("blogs", {
        title: { S: title },
      });
      const sort = await fetchData("sort-orders");
      const output = sort?.Items.filter((order) => {
        return order.type.S === "blogs";
      })[0].sort.L.filter((blog) => {
        return blog.S !== title;
      });
      await putData("sort-orders", {}, sort_order("blogs", output));
    },
    onSuccess: () => {
      toast.success("Blog has been deleted!");
      refetchBlogs();
    },
    onError: () => toast.error("Blog could not be deleted"),
  });

  return {
    blogs: blogs,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogs;
