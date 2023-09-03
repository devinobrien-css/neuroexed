import React, { useState } from "react";
import ProjectAccess from "./projects/projectAccess";
import AffiliateAccess from "./affiliations/access";
import BlogAccess from "./blogs/access";
import NewsAccess from "./news/access";
import MessageAccess from "./messages/access";
import PodcastAccess from "./podcasts/access";
import PeopleAccess from "./people/PeopleAccess";
import { tabs } from "../../manifest";
import { useLocation, useNavigate } from "react-router-dom";

const Studio = () => {
  const [tab, setTab] = useState("people");

  const tabs = [
    "people",
    "blogs",
    "projects",
    "affiliates",
    "news",
    "podcasts",
    "messages",
  ];
  const tabMap = {
    people: PeopleAccess,
    blogs: BlogAccess,
    affiliates: AffiliateAccess,
    projects: ProjectAccess,
    news: NewsAccess,
    messages: MessageAccess,
    podcasts: PodcastAccess,
  };
  const CurrentContent = tabMap[tab];

  return (
    <div className="shadow-xl mb-4">
      <div className="w-full mx-auto flex overflow-x-scroll text-xl divide-x">
        {tabs.map((current) => {
          return (
            <button
              key={current}
              onClick={() => setTab(current)}
              className={`mx-auto w-full border-0 py-4  text-gray-700 transition-colors  ${
                tab === current
                  ? " bg-gray-50"
                  : " bg-gray-400 hover:bg-gray-300"
              }`}
            >
              {current}
            </button>
          );
        })}
      </div>
      <CurrentContent />
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
            {tabs.map((tab, index) => {
              if (!tab.protected) {
                return (
                  <button
                    key={tab + index}
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
