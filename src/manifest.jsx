import Admin from "./routes/admin/admin";
import Affiliations from "./routes/affiliations/Affiliations.page";
import Books from "./routes/publications/Publications.page";
import Landing from "./routes/landing/Landing.page";
import News from "./routes/news/News.page";
import People from "./routes/people/People.page";
import Podcasts from "./routes/podcasts/Podcasts.page";
import Projects from "./routes/projects/Projects.page";


export const tabs = [
    {
        name:"home",
        protected:false,
        pathname:'/',
        icon:"ant-design:home-twotone",
        page:Landing
    },
    {
        name:"people",
        protected:false,
        pathname:'/people',
        icon:"fluent:people-audience-24-regular",
        page:People
    },
    {
        name:"projects",
        protected:false,
        pathname:'/projects',
        icon:"fluent:brain-circuit-24-regular",
        page:Projects
    },
    {
        name:"news",
        protected:false,
        pathname:'/news',
        icon:"fluent:news-24-regular",
        page:News
    },
    {
        name:"publications",
        protected:false,
        pathname:'/publications',
        icon:"ph:books",
        page:Books
    },
    {
        name:"affiliations",
        protected:false,
        pathname:'/affiliations',
        icon:"carbon:network-4",
        page:Affiliations
    },
    {
        name:"podcasts",
        protected:false,
        pathname:'/podcasts',
        icon:"ic:twotone-mic",
        page:Podcasts
    },
    {
        name:"admin",
        protected:true,
        pathname:'/admin',
        icon:"ic:outline-admin-panel-settings",
        page:Admin
    }
]