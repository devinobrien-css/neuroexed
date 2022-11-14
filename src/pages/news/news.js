import React, { useState,useEffect } from 'react';
import { fetchData } from '../../access/dba';

/* STYLESHEET IMPORTS */
import './news.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer.component';
import Modal from '../../components/modals/modal';
import Header from '../../components/header.component';
import DateCard from '../../components/general/DateCard.component';


const Posts = () => {
    const [news, setNews] = useState();
    const getNews = async () => {
        const res = await fetchData('news');

        if(res === "ERROR"){
            setNews([]);
        }
        else
            setNews(res.Items)
    };

    useEffect(() => {
        getNews();
    }, []);


    if(news){
        return (
            <div className='news-section'>
                <p>Our Latest Updates</p>
                <div className='flex'>
                    {
                        news.map((post,index) => {
                            const modal_content = (
                                <div className='shadow-lg cursor-pointer bg-white p-2 transition-all' onClick={() => Modal(modal_content)}>
                                    <div className='flex justify-between'>
                                        <p className='my-auto text-xl'>{post.title.S}</p>
                                        <DateCard date={post.date.S.split('/')} />
                                    </div>
                                    <hr/>
                                    <p>
                                        {post.data.M.content.S}
                                    </p>
                                </div>
                            );
        
                            return (
                                <div className='post' onClick={() => Modal(modal_content)}>
                                    <div>
                                        <p>{post.title.S}</p>
                                        <DateCard date={post.date.S.split('/')} />

                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    else{
        return <></>
    }
}



const News = () => {
    return (
        <>
            <Header 
                content='Latest news from CNEE'
                subtext='View our latest announcements, posts and more'
            />
            <Posts />
            <Footer />
		</>
    )
}

export default News;