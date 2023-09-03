import { useLocation, useNavigate } from "react-router-dom";
import { tabs } from "../../manifest";
import { FadeIn } from "./animations/FadeIn";

interface HeaderProps {
  title: string;
  sub_title: string;
}
const Header = ({ title, sub_title }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="bg-landing md:min-h-[80vh] bg-cover shadow-lg">
        <div className="w-full md:min-h-[80vh] backdrop-blur-sm backdrop-brightness-50 flex flex-col">
          <div className="my-auto w-fit md:w-2/3 mx-auto py-48">
            <FadeIn>
              <p className="text-white md:text-6xl text-3xl p-2 text-center font-raleway transition-all">
                {title}
              </p>
            </FadeIn>
            <p className="text-gray-200 md:text-3xl text-xl text-center font-light transition-all">
              -
            </p>

            <FadeIn>
              <p className="text-gray-200 md:text-2xl text-center font-light transition-all">
                {sub_title}
              </p>
            </FadeIn>
          </div>
          <div className="w-full justify-between p-12 md:flex hidden">
            {tabs.map((tab) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab.name}
                    className={`font-raleway text-xl uppercase transition-all ${
                      location.pathname === tab.pathname
                        ? " border-b-4 border-gray-200 text-gray-200"
                        : "text-gray-200 drop-shadow-2xl"
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
    </>
  );
};

export default Header;
