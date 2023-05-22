import React, { useState,useEffect } from 'react';
import { fetchData } from '../access/dba';


/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Modal from '../components/modals/modal';
import Header from '../components/header.component';
import DateCard from '../components/general/DateCard.component';
import { SectionTitle, Wrapper } from '../components/common.library';


const Posts = () => {
    const [news, setNews] = useState();
    const getNews = async () => {
        const res = await fetchData('news');

        if(res === "ERROR")
            setNews([]);
        else
            setNews(res.Items)
    };

    useEffect(() => {
        getNews();
    }, []);


    return (
        <Wrapper color='light'>
            <SectionTitle>Our Latest Updates</SectionTitle>
            <div className='flex'>
                {news?.map((post,index) => {
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
                        <div className='w-full md:w-1/3 bg-white shadow-std overflow-hidden my-2 rounded-lg ' onClick={() => Modal(modal_content)} key={index}>
                            <div className='bg-hex bg-cover w-full flex justify-between p-2'>
                                <p className='text-white p-2 text-2xl'>News Post</p>
                                <DateCard date={post.date.S.split('/')} />
                            </div>
                            <p className='p-2'>{post.title.S}</p>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    )
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