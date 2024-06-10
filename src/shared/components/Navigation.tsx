import { useLocation, useNavigate } from 'react-router-dom';
import { tabs } from '../../manifest';
import { getAccessToken } from '../auth/auth';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="absolute top-0 z-[1000] flex w-screen justify-between p-12 ">
      <p className="font-sans text-xl font-light text-white">NEUROEXED</p>
      <div className="hidden w-full justify-end gap-x-4  md:flex">
        {tabs.map((tab) => {
          if (!tab.protected) {
            return (
              <button
                key={tab.name}
                className={`font-sans text-lg font-light uppercase bg-blend-difference mix-blend-difference transition-all ${
                  location.pathname === tab.pathname
                    ? ' border-b-4 border-gray-200 text-gray-200'
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
        {!!getAccessToken() && (
          <button
            key="administrate"
            className={`font-raleway text-xl uppercase transition-all ${
              location.pathname.startsWith('/admin')
                ? ' border-b-4 border-gray-200 text-gray-200'
                : 'text-gray-200 drop-shadow-2xl'
            }`}
            onClick={() => {
              navigate('/admin');
            }}
          >
            Admin
          </button>
        )}
      </div>
    </div>
  );
};
