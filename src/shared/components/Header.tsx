import { useLocation, useNavigate } from 'react-router-dom';
import { tabs } from '../../manifest';
import { FadeIn } from './animations/FadeIn';
import { MobileNav } from './MobileNav';
import { getAccessToken } from '../auth/auth';
import { Navigation } from './Navigation';

interface HeaderProps {
  title: string;
  sub_title: string;
}
const Header = ({ title, sub_title }: HeaderProps) => {
  return (
    <>
      <Navigation />
      <MobileNav authorized={!!getAccessToken()} />
      <div className="bg-landing bg-cover shadow-lg md:min-h-screen">
        <div className="flex min-h-screen w-full flex-col backdrop-blur-sm backdrop-brightness-50">
          <div className="m-auto w-fit py-48 md:w-2/3">
            <FadeIn>
              <p className="font-raleway text-3xl text-white transition-all md:text-6xl">
                {title}
              </p>
            </FadeIn>
            <FadeIn>
              <p className="font-light text-gray-200 transition-all md:text-2xl">
                {sub_title}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
