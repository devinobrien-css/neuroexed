import { tabs } from '../../manifest';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Studio = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    'people',
    'blogs',
    'projects',
    'affiliates',
    'news',
    'notifications',
  ];

  return (
    <div className="mb-4 shadow-xl">
      <div className="mx-auto flex w-full divide-x overflow-x-scroll text-xl">
        {tabs.map((current) => {
          const route = `/admin/${current}`;

          return (
            <button
              key={current}
              onClick={() => navigate(route)}
              className={`mx-auto w-full border-0 py-4  text-gray-700 transition-colors  ${
                location.pathname === route
                  ? ' bg-gray-50'
                  : ' bg-gray-400 hover:bg-gray-300'
              }`}
            >
              {current}
            </button>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="bg-landing bg-cover shadow-lg">
        <div className="flex w-full flex-col backdrop-blur-sm backdrop-brightness-50">
          <div className="m-auto w-fit py-12 md:w-2/3">
            <p className="text-center font-raleway text-white md:text-6xl">
              NeuroExed Studio
            </p>
            <p className="text-center text-3xl font-light text-gray-200">-</p>
            <p className="text-center text-2xl font-light text-gray-200">
              Use the following studio to edit website content
            </p>
          </div>
          <div className="flex w-full justify-between p-12">
            {tabs.map((tab) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab.name}
                    className={`font-raleway text-xl uppercase transition-all ${
                      location.pathname === tab.pathname
                        ? ' border-b-4 border-white text-gray-200'
                        : 'text-gray-200 drop-shadow-2xl'
                    }`}
                    onClick={() => {
                      navigate(tab.pathname);
                    }}
                  >
                    {tab.name}
                  </button>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <Studio />
    </>
  );
};

export default Admin;
