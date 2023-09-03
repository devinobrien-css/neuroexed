import { createBrowserRouter } from "react-router-dom";
import Landing from "./routes/landing/Landing.page";
import People from "./routes/people/People.page";
import Projects from "./routes/projects/Projects.page";
import News from "./routes/news/News.page";
import Books from "./routes/books/Books.page";
import Affiliations from "./routes/affiliations/Affiliations.page";
import Podcasts from "./routes/podcasts/Podcasts.page";
import PeopleAccess from "./routes/admin/people/PeopleAccess";
import Admin from "./routes/admin/Admin";
import BlogAccess from "./routes/admin/blogs/BlogAccess";

export const tabs = [
  {
    name: "home",
    protected: false,
    pathname: "/",
    icon: "ant-design:home-twotone",
  },
  {
    name: "people",
    protected: false,
    pathname: "/people",
    icon: "fluent:people-audience-24-regular",
  },
  {
    name: "projects",
    protected: false,
    pathname: "/projects",
    icon: "fluent:brain-circuit-24-regular",
  },
  {
    name: "news",
    protected: false,
    pathname: "/news",
    icon: "fluent:news-24-regular",
  },
  {
    name: "publications",
    protected: false,
    pathname: "/publications",
    icon: "ph:books",
  },
  {
    name: "affiliations",
    protected: false,
    pathname: "/affiliations",
    icon: "carbon:network-4",
  },
  {
    name: "podcasts",
    protected: false,
    pathname: "/podcasts",
    icon: "ic:twotone-mic",
  },
  {
    name: "admin",
    protected: true,
    pathname: "/admin",
    icon: "ic:outline-admin-panel-settings",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/publications",
    element: <Books />,
  },
  {
    path: "/affiliations",
    element: <Affiliations />,
  },
  {
    path: "/podcasts",
    element: <Podcasts />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/people",
        element: <PeopleAccess />,
      },
      {
        path: "/admin/blogs",
        element: <BlogAccess />,
      },
    ],
  },
]);
