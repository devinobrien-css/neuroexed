import { createBrowserRouter } from 'react-router-dom';
import Landing from './routes/landing/Landing.page';
import People from './routes/people/People.page';
import Projects from './routes/projects/Projects.page';
import Books from './routes/books/Books.page';
import Affiliations from './routes/affiliations/Affiliations.page';
import Podcasts from './routes/blogs/Podcasts.component';
import PeopleAccess from './routes/admin/people/MemberAccess';
import Admin from './routes/admin/Admin';
import BlogAccess from './routes/admin/blogs/BlogAccess';
import NewsAccess from './routes/admin/news/NewsAccess';
import NotificationAccess from './routes/admin/messages/NotificationAccess';
import AffiliateAccess from './routes/admin/affiliations/AffiliateAccess';
import ProjectAccess from './routes/admin/projects/ProjectAccess';
import Blogs from './routes/blogs/Blogs.page';
import { ErrorPage } from './shared/error/Error';
import { redirectIfUnauthenticated } from './shared/auth/auth';

export const tabs = [
  {
    name: 'home',
    protected: false,
    pathname: '/',
    icon: 'ant-design:home-twotone',
  },
  {
    name: 'people',
    protected: false,
    pathname: '/people',
    icon: 'fluent:people-audience-24-regular',
  },
  {
    name: 'projects',
    protected: false,
    pathname: '/projects',
    icon: 'fluent:brain-circuit-24-regular',
  },
  {
    name: 'books',
    protected: false,
    pathname: '/books',
    icon: 'ph:books',
  },
  {
    name: 'blogs & podcasts',
    protected: false,
    pathname: '/blogs',
    icon: 'ic:twotone-mic',
  },
  {
    name: 'affiliations',
    protected: false,
    pathname: '/affiliations',
    icon: 'carbon:network-4',
  },
  {
    name: 'admin',
    protected: true,
    pathname: '/admin',
    icon: 'ic:outline-admin-panel-settings',
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/people',
    element: <People />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/affiliations',
    element: <Affiliations />,
  },
  {
    path: '/podcasts',
    element: <Podcasts />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/admin',
    element: <Admin />,
    loader: redirectIfUnauthenticated,
    children: [
      {
        path: '/admin/people',
        element: <PeopleAccess />,
      },
      {
        path: '/admin/blogs',
        element: <BlogAccess />,
      },
      {
        path: '/admin/news',
        element: <NewsAccess />,
      },
      {
        path: '/admin/notifications',
        element: <NotificationAccess />,
      },
      {
        path: '/admin/affiliates',
        element: <AffiliateAccess />,
      },
      {
        path: '/admin/projects',
        element: <ProjectAccess />,
      },
      {
        path: '/admin/podcasts',
        element: <></>,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
