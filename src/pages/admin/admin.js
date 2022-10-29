import React from 'react';
import { useRecoilState } from "recoil";
import { adminState } from "../../atom";

/* STYLESHEET IMPORTS */
import './admin.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

import ProjectAccess from './projects/access';
import AffiliateAccess from './affiliations/access';
import BlogAccess from './blogs/access';
import PeopleAccess from './people/access';
import NewsAccess from './news/access';
import MessageAccess from './messages/access';

const AdminHeader = () => {
    return (
        <div className='books-header'>
            <div>
                <p>NeuroExed Studio</p>
            </div>
            <div>
                <p>Use the following studio to edit website content</p>
            </div>
        </div>
    );
}


const StudioContent = () => {
    const [tab,] = useRecoilState(adminState)

    if(tab === 'people'){
        return (
            <PeopleAccess />
        )
    }
    else if(tab === 'blogs'){
        return (
            <BlogAccess />
        )
    }
    else if(tab === 'affiliates'){
        return (
            <AffiliateAccess />
        )
    }
    else if(tab === 'projects'){
        return (
            <ProjectAccess />
        )
    }
    else if(tab === 'news'){
        return (
            <NewsAccess />
        )
    }
    else if(tab === 'messages'){
        return (
            <MessageAccess />
        )
    }

    return (
        <p>err</p>
    )
}


const Studio = () => {

    const [tab,setTab] = useRecoilState(adminState)

    return (
        <div className='shadow-xl mb-4'>
            <div className='w-full mx-auto flex overflow-x-scroll text-xl '>
                <button 
                    onClick={() => setTab('people')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'people' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        people
                </button>

                <button 
                    onClick={() => setTab('blogs')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'blogs' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        blogs
                </button>

                <button 
                    onClick={() => setTab('projects')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'projects' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        projects
                </button>

                <button 
                    onClick={() => setTab('affiliates')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'affiliates' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        affiliates
                </button>

                <button 
                    onClick={() => setTab('news')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'news' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        news
                </button>

                <button 
                    onClick={() => setTab('messages')} 
                    className={
                        "mx-auto w-full border-0 p-1  text-gray-700" 
                        + (tab === 'messages' ? ' bg-gray-100' : ' bg-gray-400')
                }>
                        
                        messages
                </button>

            </div>
            <StudioContent />
        </div>
    )

}

const Admin = () => {
    return (
        <>
            <AdminHeader />
            <Studio />
		</>
    )
}

export default Admin;