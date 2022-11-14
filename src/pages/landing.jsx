import React, { useEffect, useState } from 'react';
import { fetchData } from '../access/dba.js'

import { useRecoilState } from "recoil";
import { pageState } from "../atom";

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Loading from '../components/general/Loading.component.jsx';

import {BlogMd, SpaceRow} from "../components/custom.library"

/** Quote for the landing page
 * 
 * @returns 
 */
 const LandingQuote = () => {
    return (
        <div className='p-4 bg-light-hex bg-center mx-auto bg-cover bg-no-repeat shadow-lg my-4 border shadow-xl'>
            <p className='mx-auto text-blue-900 text-3xl text-center'>“The heart has reasons of which reason does not know.”</p>
            <p className='text-center'>- Blaise Pascale, 1623-62, mathematician, physicist, philosopher</p>
        </div>
    );
}

/** Brain Gif and Small Blurb
 * @returns 
 */
 const LandingBrain = () => {
    return (
        <div className='md:flex my-4'>
            <div className='w-full md:w-1/2 bg-cover bg-center bg-brain-gif bg-no-repeat p-4 min-h-[400px]'>
            </div>
            <div className='border w-full md:w-1/2 md:ml-4  px-4 py-10 text-lg shadow-xl bg-light-hex bg-top bg-no-repeat bg-cover'>
                <p className='text-justify h-fit my-auto md:text-xl'>The Stellar Research Lab is made up of an interdisciplinary team of neuroscience enthusiasts. A common interest in the importance of experiential learning and the brain basis of decision making unites us to explore this challenging yet exciting area. Because of our unique, oftentimes non-neuroscientist backgrounds, the lab is able to approach topics from nontraditional point of view to compose unique assortments of blogs, papers, podcasts and books for the fellow curious mind...</p>
            </div>
        </div>
    );
}

function orderJsonObjects(order,objects){
    const output = []
    order.forEach(order_by => {
        output.push(objects.filter(object => {return object.title.S === order_by.S})[0])
    })
    return output
}

/** Quote for the landing page
 * 
 * @returns 
 */
 const LandingBlogs = () => {
    const [blogs, setBlogs] = useState();
    const getBlogs = async () => {
        const sort = await fetchData('sort_orders')
        const res = await fetchData('blogs')
        if(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L.length !== 0)
            setBlogs(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L,res.Items));
        else
            setBlogs(res.Items)
    };
    useEffect(() => {
        getBlogs();
    }, []);


    const [page,setPage] = useState(1)
    const [paginate,setPaginate] = useState(0)
    const step = 4


    return (
        <div 
            className='p-4 shadow-xl bg-cover bg-no-repeat my-4 transition-all bg-light-hex bg-center' 
        >
            <p className='text-6xl font-light mb-8'>Blog Posts and Podcasts</p>
            <div>
                <div className='w-fit  shadow shadow-gray-600 rounded-full'>
                    <button 
                        className={`rounded-l-full px-3 ${paginate-step>=0?"bg-gray-200 text-blue-300":"cursor-not-allowed bg-gray-600 text-gray-800"}`}
                        disabled={(paginate-step<0)}
                        onClick={() => {
                            if(paginate-step>=0){
                                setPage(page-1)
                                setPaginate(paginate-step)
                            }
                            else{
                                setPage(1)
                                setPaginate(0)
                            }
                        }
                    }>{"<"}</button>
                    <button 
                        className={`rounded-r-full px-3 ${(paginate+step>=blogs?.length-1)?"bg-gray-600 text-gray-800 cursor-not-allowed":"bg-gray-200  text-blue-300"}`}
                        disabled={(paginate+step>=blogs?.length-1)}
                        onClick={() => {
                            if(paginate+step<blogs?.length){
                                setPage(page+1)
                                setPaginate(paginate+step)
                            }
                            else{
                                setPage(Math.round(blogs.length/step))
                                setPaginate(blogs?.length)
                            }
                        }
                    }>{">"}</button>
                </div>
                <p className='italic text-gray-400'>page {page} of {Math.round(blogs?.length/step)}</p>
            </div>
            <div className='flex flex-wrap'>
                {
                    blogs?(
                        blogs.map((blog,index) => {
                            if(index >= paginate && index < paginate+step)
                                return <BlogMd key={index} data={blog.data.M} />
                            return null
                        })
                    ):(<Loading />)
                }
            </div>
        </div>
    );

}


const LandingBooks = () =>{
    return (
        <div className='p-4 shadow-xl bg-cover bg-light-hex bg-no-repeat'>
            <p className='text-6xl font-light mb-8'>Recent Publications</p>
            <div className='bg-white bg-opacity-60 md:flex p-4 border rounded shadow-lg my-4'>
                <div className='shrink-0 md:w-1/4 bg-diversity bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'></div>
                <div className='pl-2'>
                    <p className='font-light text-5xl'>Diversity at College</p>
                    <p className='text-lg'>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                    <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"}>PURCHASE</button>
                </div>
            </div>

            <div className='bg-white bg-opacity-60 md:flex p-4 border rounded shadow-lg my-4'>
                <div className='shrink-0 md:w-1/4 bg-education bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'></div>
                <div className='pl-2'>
                    <p className='font-light text-5xl'>Education that Works</p>
                    <p className='text-lg'>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                    <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216"}>PURCHASE</button>
                </div>
            </div>
        </div>
    );
}



const LandingReferenceRow = () => {
    const [,setPage] = useRecoilState(pageState)

    return (
        <div 
            className='bg-cover flex flex-wrap p-2 text-white bg-white'
            style={{backgroundImage:"url('../../img/hex-bg-dark.png')"}}
        >
            <div
                className='w-2/12 min-w-[180px] xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-90 p-1 rounded'
                onClick={() => window.location.href = 'http://otherlobe.com/papers/'}
            >
                <svg 
                className='mx-auto'
                fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.602 4.075c2.201 1.174 4.904 3.254 6.398 5.252-1.286-.9-3.011-1.027-5.058-.549.222-1.469-.185-3.535-1.34-4.703zm-.825 6.925s1.522-7-3.335-7h-5.442v20h16v-10.629c0-3.42-4.214-3.116-7.223-2.371zm-.318-8l-1.459-1h-9v20h1v-19h9.459zm-2.443-2l-1.5-1h-8.516v20h1v-19h9.016z"/></svg>
                <p className='mx-auto text-center uppercase'>our papers</p>
            </div>
            <div
                className='w-2/12 min-w-[180px] xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-90 p-1 rounded'
                onClick={() =>  setPage('/publications')}
            >
                <svg 
                className='mx-auto'
                width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white"  clipRule="evenodd"><path d="M14 0v10l2-1.518 2 1.518v-10h4v24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h9zm6 20h-14.505c-1.375 0-1.375 2 0 2h14.505v-2z"/></svg>
                <p className='mx-auto text-center uppercase'>our books</p>
            </div>
            <div
                className='w-2/12 min-w-[180px] xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-90 p-1 rounded'
                onClick={() => window.location.href = 'http://otherlobe.com/blog/'}
            >
                <svg 
                className='mx-auto'
                fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.568.075c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702zm7.432 10.925v13h-20v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3zm-16 5h5v-4h-5v4zm12 2h-12v1h12v-1zm0-3h-5v1h5v-1zm0-3h-5v1h5v-1z"/></svg>
                <p className='mx-auto text-center uppercase'>our articles</p>
            </div>
            <div
                className='w-2/12 min-w-[180px] xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-90 p-1 rounded'
                onClick={() => window.location.href = 'https://experienced.simplecast.com/'}
            >
                <svg 
                className='mx-auto'
                width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" clipRule="evenodd"><path d="M7.5 21c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm9 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-4.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm8-12v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-4 2c0 2.209-1.791 4-4 4s-4-1.791-4-4v-7c0-2.209 1.791-4 4-4s4 1.791 4 4v7z"/></svg>
                <p className='mx-auto text-center uppercase'>our PODCASTS</p>
            </div>
        </div>
    )
}




const LandingAd = () => {
    return (
        <div className='landing-advertisement'>
            <div>
                
            </div>
        </div>
    )
}

const Landing = (args) => {
    return (
		<>
			<Header 
                content='Center for Neuroscience and Experiential Education'
                subtext='An interactive semi-virtual laboratory for study, writing, and research'
            />
            <LandingQuote />
            <SpaceRow />
            <LandingBrain />
            <LandingReferenceRow />
            <LandingBlogs />
            <SpaceRow />
            <LandingBooks />
            <SpaceRow />
            <LandingAd />
            <Footer />
		</>
    );
}
export default Landing;