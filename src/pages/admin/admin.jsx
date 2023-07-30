import React from 'react';
import { useRecoilState } from "recoil";
import { adminState } from "../../atom";

import ProjectAccess from './projects/projectAccess';
import AffiliateAccess from './affiliations/access';
import BlogAccess from './blogs/access';
import PeopleAccess from './peopleAccess';
import NewsAccess from './news/access';
import MessageAccess from './messages/access';
import PodcastAccess from './podcasts/access';
import Header from '../../components/header.component';

const Studio = () => {
    const [tab,setTab] = useRecoilState(adminState)

    const tabs = ['people','blogs','projects','affiliates','news','podcasts','messages']
    const tabMap = {
        'people':PeopleAccess,
        'blogs':BlogAccess,
        'affiliates':AffiliateAccess,
        'projects':ProjectAccess,
        'news':NewsAccess,
        'messages':MessageAccess,
        'podcasts':PodcastAccess
    }
    var CurrentContent = tabMap[tab]

    return (
        <div className='shadow-xl mb-4'>
            <div className='w-full mx-auto flex overflow-x-scroll text-xl '>
                {
                    tabs.map((current,index) => {
                        return (
                            <button 
                                key={`tab${index}`}
                                onClick={() => setTab(current)} 
                                className={`mx-auto w-full border-0 p-1  text-gray-700 ${(tab ===  current? ' bg-gray-100' : ' bg-gray-400')}`}
                                >
                                    {current}
                            </button>
                        )
                    })
                }
            </div>
            <CurrentContent  />
        </div>
    )

}

const Admin = () => {
    return (
        <>
            <Header content={"NeuroExed Studio"} subtext={"Use the following studio to edit website content"} />
            <Studio />
		</>
    )
}

export default Admin;