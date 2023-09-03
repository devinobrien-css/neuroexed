import { useEffect, useState } from "react";
import { fetchData } from "../../../shared/api/dba";
import ProjectProfile from "./ProjectProfile.component";
import Loader from "../../../shared/components/Loader.component";

const Project = (args) => {
  const project = args.data;
  return (
    <div className="md:w-[45%] my-4 mx-auto bg-white shadow-lg rounded border p-4 flex flex-col justify-between">
      <p className="text-2xl">{project.title.S}</p>
      <p>{project.data.M.description.S}</p>
      <p className="text-2xl mt-4">Cluster Members</p>
      <div className="flex overflow-x-scroll">
        {args.members.map((member, index) => {
          return <ProjectProfile key={index} data={member} />;
        })}
      </div>
    </div>
  );
};

const ProjectList = (args) => {
  const all_projects = args.data;

  const [people, setPeople] = useState();
  const getPeople = async () => {
    const res = await fetchData("people");
    setPeople(res.Items);
  };
  useEffect(() => {
    getPeople();
  }, []);

  if (people) {
    const output = [];
    all_projects.forEach((project, index) => {
      const project_members = people.filter(
        (person) =>
          project.data.M.members.L.filter(
            (potential_member) => potential_member.M.email.S === person.email.S,
          ).length === 1,
      );

      output.push(
        <Project key={index} data={project} members={project_members} />,
      );
    });
    return output;
  } else {
    return <></>;
  }
};

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

const ProjectsSection = () => {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState();
  const getProjects = async () => {
    setLoading(true);
    const res = await fetchData("projects");
    const sort = await fetchData("sort-orders");

    if (
      sort.Items.filter((order) => {
        return order.type.S === "projects";
      })[0].sort.L.length !== 0
    )
      setProjects(
        orderJsonObjects(
          sort.Items.filter((order) => {
            return order.type.S === "projects";
          })[0].sort.L,
          res.Items,
        ),
      );
    else setProjects(res.Items);

    setLoading();
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="p-4 my-24">
      <p className="text-6xl font-raleway text-center my-8">
        Our Latest Collaborative Work
      </p>
      <div className="md:flex flex-wrap">
        {loading ? (
          <div className="w-full min-h-[400px]">
            <Loader />
          </div>
        ) : projects ? (
          <ProjectList data={projects} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
