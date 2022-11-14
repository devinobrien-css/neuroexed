import Admin from "./pages/admin/admin";
import Affiliations from "./pages/affiliations";
import Books from "./pages/books";
import Landing from "./pages/landing";
import News from "./pages/news/news";
import People from "./pages/people";
import Projects from "./pages/projects";


export const tabs = [
    {
        name:"home",
        protected:false,
        icon:"ant-design:home-twotone",
        page:Landing
    },
    {
        name:"people",
        protected:false,
        icon:"fluent:people-audience-24-regular",
        page:People
    },
    {
        name:"projects",
        protected:false,
        icon:"fluent:brain-circuit-24-regular",
        page:Projects
    },
    {
        name:"news",
        protected:false,
        icon:"fluent:news-24-regular",
        page:News
    },
    {
        name:"publications",
        protected:false,
        icon:"ph:books",
        page:Books
    },
    {
        name:"affiliations",
        protected:false,
        icon:"carbon:network-4",
        page:Affiliations
    },
    {
        name:"admin",
        protected:true,
        icon:"ic:outline-admin-panel-settings",
        page:Admin
    }
]