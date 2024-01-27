import { useLocation, useNavigate } from 'react-router-dom';
import { tabs } from '../../manifest';
import { FadeIn } from './animations/FadeIn';
import { MobileNav } from './MobileNav';
import { getAccessToken } from '../auth/auth';

interface HeaderProps {
  title: string;
  sub_title: string;
}
const Header = ({ title, sub_title }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <MobileNav authorized={!!getAccessToken()} />
      <div className="bg-landing bg-cover shadow-lg md:min-h-[80vh]">
        <div className="flex w-full flex-col backdrop-blur-sm backdrop-brightness-50 md:min-h-[80vh]">
          <div className="m-auto w-fit py-48 md:w-2/3">
            <FadeIn>
              <p className="p-2 text-center font-raleway text-3xl text-white transition-all md:text-6xl">
                {title}
              </p>
            </FadeIn>
            <p className="text-center text-xl font-light text-gray-200 transition-all md:text-3xl">
              -
            </p>
            <FadeIn>
              <p className="text-center font-light text-gray-200 transition-all md:text-2xl">
                {sub_title}
              </p>
            </FadeIn>
          </div>
          <div className="hidden w-full justify-between p-12 md:flex">
            {tabs.map((tab) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab.name}
                    className={`font-raleway text-xl uppercase transition-all ${
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
      </div>
    </>
  );
};

export default Header;
