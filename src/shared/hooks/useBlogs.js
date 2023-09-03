import { useQuery } from "react-query";
import { fetchData } from "../dba";

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

export const fetchMembers = async () => {
  const sort = await fetchData("sort-orders");
  const res = await fetchData("blogs");

  if (
    sort?.Items.filter((order) => {
      return order.type.S === "blogs";
    })[0].sort.L.length !== 0
  )
    return orderJsonObjects(
      sort.Items.filter((order) => {
        return order.type.S === "blogs";
      })[0].sort.L,
      res.Items,
    );
  else return res.Items;
};

const useBlogs = () => {
  // hooks
  const { data: blogsData, isLoading: blogsLoading } = useQuery("GET-BLOGS");

  /** Retrieves all members
   * @returns a set of all members
   */
  const retrieveBlogs = () => {
    return null;
  };

  const retrieveBlog = (memberId) => {
    return null;
  };

  const updateMember = (payload) => {
    return null;
  };

  const deleteBlog = (memberId) => {
    return null;
  };

  return {
    blogs: retrieveBlogs,
    retrieveBlog,
    updateMember,
    deleteBlog,
  };
};

export default useBlogs;
