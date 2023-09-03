import { fetchData, putData } from "../api/dba";
import { sort_order } from "../types/object_schema";

export async function updateOders() {
  const people = await fetchData("people");
  const projects = await fetchData("projects");
  const blogs = await fetchData("blogs");
  const orders = await fetchData("sort-orders");

  const personOrder = orders?.Items?.filter(
    (item) => item.type.S === "people",
  )[0].sort.L;
  const projectOrder = orders?.Items?.filter(
    (item) => item.type.S === "projects",
  )[0].sort.L;
  const blogOrder = orders?.Items?.filter((item) => item.type.S === "blogs")[0]
    .sort.L;

  if (people?.Items?.length !== personOrder?.length) {
    people?.Items?.forEach((person) => {
      if (
        personOrder.filter((order) => order.S === person.email.S).length === 0
      ) {
        personOrder.push(person.email);
      }
    });

    await putData("sort-orders", {}, sort_order("people", personOrder));
  }

  if (projects?.Items?.length !== projectOrder?.length) {
    projects?.Items?.forEach((project) => {
      if (
        projectOrder.filter((order) => order.S === project.title.S).length === 0
      ) {
        projectOrder.push(project.title);
      }
    });

    await putData("sort-orders", {}, sort_order("projects", projectOrder));
  }

  if (blogs?.Items?.length !== blogOrder?.length) {
    blogs?.Items?.forEach((blog) => {
      if (blogOrder.filter((order) => order.S === blog.title.S).length === 0) {
        blogOrder.push(blog.title);
      }
    });

    await putData("sort-orders", {}, sort_order("blogs", blogOrder));
  }
}
