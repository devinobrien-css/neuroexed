import React, { useState,useEffect } from 'react';
import { fetchData } from '../../access/dba';

/* STYLESHEET IMPORTS */
import './news.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';
import Modal from '../../components/modals/modal';
import Header from '../../components/header/header';


const DateCard = (args) => {
    const date = args.date
    const months = {
        '1':'JAN',
        '2':'FEB',
        '3':'MAR',
        '4':'APR',
        '5':'MAY',
        '6':'JUN',
        '7':'JUL',
        '8':'AUG',
        '9':'SEP',
        '10':'OCT',
        '11':'NOV',
        '12':'DEC'
    }

    return (
        <div className='flex flex-col'>
            <div 
                className='mx-auto rounded overflow-hidden shadow-lg'
            >
                <p className='bg-gray-400 text-gray-100 px-2'>{months[date[0]]}</p>
                <p className='mx-auto text-center bg-white'>{date[1]}</p>
            </div>
            <p
                className='mx-auto text-center'
            >{'20'+date[2]}</p>
        </div>

    )
}



const Posts = () => {
    const [news, setNews] = useState();
    const getNews = async () => {
        const res = await fetchData('news');
        console.log(res)

        if(res === "ERROR"){
            console.log('err')
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
                <div className='post-list'>
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