import { Icon } from '@iconify/react';
import { useState } from 'react';
import { tabs } from '../../manifest';
import { useNavigate } from 'react-router-dom';

export const MobileNav = ({ authorized }: { authorized: boolean }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="border-red fixed left-0 top-0 z-50 text-2xl text-white md:hidden"
        onClick={() => (open ? setOpen(false) : setOpen(true))}
      >
        <Icon
          icon="ic:round-menu"
          className="dark:bg-dark-surface m-2 rounded-full bg-gray-800 text-white shadow transition-all" // bg-opacity-50 hover:bg-opacity-100
          width={48}
        />
      </button>
      {open && (
        <div
          className="dark:bg-dark-bg fixed z-100 h-full w-full bg-gray-800 transition-all" // bg-opacity-50
        >
          <button>
            <Icon
              icon="ic:round-close"
              className="dark:bg-dark-surface m-2 rounded-full bg-gray-800 text-white shadow transition-all" // bg-opacity-50 hover:bg-opacity-100
              width={48}
              onClick={() => setOpen(false)}
            />
          </button>
          <div className="flex flex-col justify-center gap-y-4">
            {tabs.map((tab) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab.name}
                    className={`font-raleway text-4xl uppercase transition-all ${
                      location.pathname === tab.pathname
                        ? 'text-2xl text-white'
                        : 'text-gray-200 drop-shadow-2xl'
                    }`}
                    onClick={() => {
                      navigate(tab.pathname);
                      setOpen(false);
                    }}
                  >
                    {tab.name}
                  </button>
                );
              }
              return null;
            })}
            {authorized && (
              <button
                key="administrate"
                className={`font-raleway text-xl uppercase transition-all ${
                  location.pathname.startsWith('/admin')
                    ? ' border-b-4 border-gray-200 text-gray-200'
                    : 'text-gray-200 drop-shadow-2xl'
                }`}
                onClick={() => {
                  navigate('/admin');
                  setOpen(false);
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
