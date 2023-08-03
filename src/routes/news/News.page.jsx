import { useEffect, useState } from "react";
import { fetchData } from "../../shared/services/dba";
import { SectionTitle } from "../../shared/components/common.library";
import NavHeader from "../../shared/components/NavHeader.component";
import Footer from "../../shared/components/Footer";
import Loader from "../../shared/components/Loader.component";


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
        <div className="my-32 max-w-screen-lg mx-auto">
            <SectionTitle className='mx-auto w-fit'>Our Latest Updates</SectionTitle>
            <div className="flex flex-col py-12 gap-y-12">
                {news?(
                    news.map((post,index) => {
                        return (
                            <div className='mx-auto w-4/5 bg-white p-4' key={post}>
                                <p className='font-raleway text-2xl'>{post.title.S}</p>
                                <p className='font-lato font-light text-gray-700'>{new Date(post.date.S).toDateString()}</p>
                                <br/>
                                <p className="text-gray-700 font-light">
                                    {post.data.M.content.S}
                                </p>
                            </div>
                        );
                    })
                ):(<Loader />)}
            </div>
        </div>
    )
}



const News = () => {
    return (
        <>
            <NavHeader 
                title='Latest news from CNEE'
                content='View our latest announcements, posts and more'
            />
            <Posts />
            <Footer />
		</>
    )
}

export default News;