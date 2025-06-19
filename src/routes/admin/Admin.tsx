import { Icon } from '@iconify/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../shared/components/Navbar';

const Studio = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'people', label: 'People', icon: 'tabler:users' },
    { id: 'blogs', label: 'Blogs', icon: 'tabler:article' },
    { id: 'projects', label: 'Projects', icon: 'tabler:clipboard' },
    { id: 'affiliates', label: 'Affiliates', icon: 'tabler:link' },
    { id: 'news', label: 'News', icon: 'tabler:news' },
    { id: 'notifications', label: 'Notifications', icon: 'tabler:bell' },
  ];

  return (
    <div className="mb-4 overflow-hidden rounded-lg shadow-xl">
      <div className="mx-auto flex overflow-x-auto border-b bg-white text-lg dark:border-dark-border dark:bg-dark-surface">
        {tabs.map((tab) => {
          const route = `/admin/${tab.id}`;
          const isActive = location.pathname === route;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(route)}
              className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                isActive
                  ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-dark-text-secondary dark:hover:bg-dark-bg dark:hover:text-dark-text'
              }`}
            >
              <Icon icon={tab.icon} className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="min-h-[60vh] bg-gray-50 dark:bg-dark-bg">
        <Outlet />
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 shadow-lg">
        <div className="flex w-full flex-col backdrop-blur-sm">
          <div className="m-auto w-fit py-12 md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="mb-2 font-raleway text-4xl text-white md:text-6xl">
                NeuroExed Studio
              </h1>
              <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-tiffany-blue"></div>
              <p className="text-2xl font-light text-gray-200">
                Use the following studio to edit website content
              </p>
            </motion.div>
          </div>

          <div className="flex w-full justify-between p-8">
            <motion.button
              className="mx-auto flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-raleway text-white backdrop-blur-sm transition-all hover:bg-white/30"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-5 w-5" icon="tabler:arrow-left" />
              <span>Back to Home</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <Studio />
      </div>
    </>
  );
};

export default Admin;
