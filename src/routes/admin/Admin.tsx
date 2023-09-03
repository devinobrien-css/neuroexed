import { tabs } from "../../manifest";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Studio = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    "people",
    "blogs",
    "projects",
    "affiliates",
    "news",
    "podcasts",
    "messages",
  ];

  return (
    <div className="shadow-xl mb-4">
      <div className="w-full mx-auto flex overflow-x-scroll text-xl divide-x">
        {tabs.map((current) => {
          const route = `/admin/${current}`;

          return (
            <button
              key={current}
              onClick={() => navigate(route)}
              className={`mx-auto w-full border-0 py-4  text-gray-700 transition-colors  ${
                location.pathname === route
                  ? " bg-gray-50"
                  : " bg-gray-400 hover:bg-gray-300"
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
        <div className="w-full backdrop-blur-sm backdrop-brightness-50 flex flex-col">
          <div className="my-auto w-fit md:w-2/3 mx-auto py-12">
            <p className="text-white md:text-6xl text-center font-raleway">
              NeuroExed Studio
            </p>
            <p className="text-gray-200 text-3xl text-center font-light">-</p>
            <p className="text-gray-200 text-2xl text-center font-light">
              Use the following studio to edit website content
            </p>
          </div>
          <div className="w-full flex justify-between p-12">
            {tabs.map((tab) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab.name}
                    className={`font-raleway text-xl uppercase transition-all ${
                      location.pathname === tab.pathname
                        ? " border-b-4 border-white text-gray-200"
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
      <Studio />
    </>
  );
};

export default Admin;
