import React from 'react';
import { fetchData } from '../../access/dba.js'

import { useRecoilState } from "recoil";
import { pageState } from "../../atom";

/* STYLESHEET IMPORTS */
import './landing.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header.js';



/** Quote for the landing page
 * 
 * @returns 
 */
 const LandingQuote = () => {
    return (
        <div className='landing-quote'>
            <div>
                <p>“The heart has reasons of which reason does not know.”</p>
            </div>
            <div>
                <p>- Blaise Pascale, 1623-62, mathematician, physicist, philosopher</p>
            </div>
        </div>


    );
}




/** Quote for the landing page
 * 
 * @returns 
 */
 const LandingBrain = () => {
    return (
        <div className='column-container brain-container'>
            <div className='content-column'>
                <div className='bg-center bg-cover drop-shadow-xl shadow-xl w-full h-full bg-main-brain'>
                    
                </div>
            </div>
            <div className='content-column'>
                <div className='landing-brain-detail'>
                    <p>The Stellar Research Lab is made up of an interdisciplinary team of neuroscience enthusiasts. A common interest in the importance of experiential learning and the brain basis of decision making unites us to explore this challenging yet exciting area. Because of our unique, oftentimes non-neuroscientist backgrounds, the lab is able to approach topics from nontraditional point of view to compose unique assortments of blogs, papers, podcasts and books for the fellow curious mind...</p>
                </div>
            </div>
        </div>
    );
}




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
                className='mx-auto rounded overflow-hidden'
            >
                <p className='bg-gray-400 text-gray-100 px-2'>{months[date[0]]}</p>
                <p className='mx-auto text-center bg-white'>{date[1]}</p>
            </div>
            <p
                className='mx-auto text-center text-white'
            >{'20'+date[2]}</p>
        </div>

    )
}



const Blog = (args) => {
    let data = args.data

    var image = <></>;
    var button_title = <></>;
    var date = data['media_date'].S.split('/');

    if(data['media_type'].S === "BLOG"){
        button_title = "READ";
        image = <svg className='my-auto group-hover:animate-pulse' width="60" height="60" enableBackground="new 0 0 128 128" id="Layer_1" version="1.1" viewBox="0 0 128 128" ><circle cx="64" cy="64" fill="#4B5F83" id="circle" r="64"/><g id="icon"><path d="M95,96H33c-2.2,0-4-1.8-4-4V37c0-2.2,1.8-4,4-4h62c2.2,0,4,1.8,4,4v55C99,94.2,97.2,96,95,96z" fill="#FFFFFF" id="bg"/><g id="text"><rect fill="#E6E6E6" height="4" id="XMLID_2_" width="33" x="56" y="57"/><rect fill="#E6E6E6" height="4" id="XMLID_7_" width="33" x="56" y="65"/><rect fill="#E6E6E6" height="4" id="XMLID_8_" width="50" x="39" y="73"/><rect fill="#E6E6E6" height="4" id="XMLID_9_" width="50" x="39" y="81"/></g><rect fill="#22A7F0" height="12" id="img" width="12" x="39" y="57"/><path d="M95,33H33c-2.2,0-4,1.8-4,4v4.1V42v4h70v-4v-0.9V37C99,34.8,97.2,33,95,33z" fill="#E6E6E6" id="header"/><circle cx="36" cy="39.8" fill="#CF000F" id="red" r="2"/><circle cx="42" cy="39.8" fill="#E67E22" id="orange" r="2"/><circle cx="48" cy="39.8" fill="#26A65B" id="green" r="2"/></g></svg>;
    }
    else {
        button_title = "LISTEN";
        image = <svg className='my-auto group-hover:animate-pulse' width="60" height="60" viewBox="0 0 100 100"><path fill="#E37948" d="M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50-50-22.386-50-50 22.386-50 50-50z"/><g fill="#CC6D41"><path d="M70 33c-6.627 0-12 5.148-12 11.5 0 5.006 3.343 9.251 8 10.832v24.668c0 .504.385.959 1 1.311v6.689c0 .553.447 1 1 1v7.647c1.362-.526 2.698-1.104 4-1.743v-5.904c.553 0 1-.447 1-1v-6.689c.615-.352 1-.807 1-1.311v-24.668c4.658-1.581 8-5.826 8-10.832 0-6.352-5.372-11.5-12-11.5zM26 93.869v-15.869c.553 0 1-.447 1-1v-5.184c1.162-.413 2-1.512 2-2.816v-38c0-1.305-.838-2.402-2-2.816v-5.184c0-.552-.447-1-1-1v-15.869c-1.373.753-2.709 1.565-4 2.44v13.429c-.552 0-1 .448-1 1v5.184c-1.162.414-2 1.512-2 2.816v38c0 1.305.838 2.403 2 2.816v5.184c0 .553.448 1 1 1v13.43c1.291.874 2.627 1.686 4 2.439zM50 56.311c.615-.352 1-.807 1-1.311v-22.039c5.34-.261 8.842-2.593 10.613-5.975.775-.068 1.387-.814 1.387-1.736v-8.5c0-.902-.588-1.637-1.34-1.73-1.834-3.594-5.607-6.02-11.66-6.02-6.627 0-12 5.373-12 12 0 4.012 1.976 7.555 5 9.733v24.267c0 .504.385.959 1 1.311v6.689c0 .553.448 1 1 1v35.75c1.318.131 2.654.198 4 .225v-35.975c.553 0 1-.447 1-1v-6.689z"/></g><g fill="#E0E3E4"><path d="M23 92.073c1.294.832 2.628 1.606 4 2.318v-88.783c-1.372.712-2.706 1.486-4 2.319v84.146zM69 96.253c1.365-.562 2.698-1.186 4-1.861v-6.392h-4v8.253zM46 64v35.826c1.321.104 2.652.174 4 .174v-36h-4z"/></g><path fill="#C9CCCD" d="M23 92.073c.333.214.662.435 1 .642v-85.429c-.338.207-.667.427-1 .641v84.146z"/><path fill="#CCD0D2" d="M45 56h6v7c0 .553-.447 1-1 1h-4c-.553 0-1-.447-1-1v-7z"/><path fill="#B7BBBD" d="M46 63v-7h-1v7c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1z"/><g fill="#B7BBBD"><path d="M23 77v-6h-1v6c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1zM23 23c0-.553.447-1 1-1h-1c-.553 0-1 .447-1 1v6h1v-6z"/></g><path fill="#CCD0D2" d="M27 22h-4c-.553 0-1 .447-1 1v6h6v-6c0-.553-.447-1-1-1zm-5 55c0 .553.447 1 1 1h4c.553 0 1-.447 1-1v-6h-6v6z"/><path fill="#F4F4F7" d="M23 28h4c1.657 0 3 1.344 3 3v38c0 1.657-1.343 3-3 3h-4c-1.657 0-3-1.343-3-3v-38c0-1.656 1.343-3 3-3zM64 21c0-6.627-3.979-12-13-12-6.627 0-12 5.373-12 12 0 4.011 1.976 7.554 5 9.733v24.267c0 1.104 1.791 2 4 2s4-.896 4-2v-22.039c8.125-.398 12-5.593 12-11.961z"/><path fill="#EAEAED" d="M42 21c0-6.191 4.69-11.285 10.711-11.929-.55-.045-1.118-.071-1.711-.071-6.627 0-12 5.373-12 12 0 4.011 1.976 7.554 5 9.733v24.267c0 1.104 1.791 2 4 2 .531 0 1.036-.055 1.5-.148-1.465-.297-2.5-1.013-2.5-1.852v-22.698c1.253.444 2.595.698 4 .698.587 0 1.15-.027 1.695-.074-6.012-.65-10.695-5.74-10.695-11.926z"/><g fill="#7D7E80"><path d="M62.5 15c-.828 0-1.5.783-1.5 1.75v8.5c0 .967.672 1.75 1.5 1.75l.104-.012c.928-1.763 1.396-3.803 1.396-5.988 0-2.18-.44-4.219-1.34-5.981l-.16-.019zM51 20.5c0-.828-.672-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5h3c.828 0 1.5-.672 1.5-1.5z"/></g><path fill="#CCD0D2" d="M68 81h6v7c0 .553-.447 1-1 1h-4c-.553 0-1-.447-1-1v-7z"/><path fill="#B7BBBD" d="M69 88v-7h-1v7c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1z"/><path fill="#F4F4F7" d="M71 33c6.627 0 12 5.148 12 11.5s-5.373 11.5-12 11.5-12-5.148-12-11.5 5.373-11.5 12-11.5z"/><path fill="#7D7E80" d="M71 38c.553 0 1 .447 1 1v2c0 .553-.447 1-1 1s-1-.447-1-1v-2c0-.553.447-1 1-1z"/><path fill="#F4F4F7" d="M77 49h-6l-6-1c2.103 2.104 2 7 2 7v25c0 1.104 1.791 2 4 2s4-.896 4-2v-25s-.103-3.896 2-6z"/><g fill="#E8E8EA"><path d="M67 55s.038-1.874-.43-3.802c-3.344-2.04-5.57-5.616-5.57-9.698 0-1.632.359-3.182.999-4.588-1.861 2.026-2.999 4.676-2.999 7.588 0 5.005 3.343 9.251 8 10.832v-.332zM75.212 52.789c-.237 1.237-.212 2.211-.212 2.211v.337c3.138-1.066 5.679-3.342 7.001-6.249-1.735 1.889-4.105 3.218-6.789 3.701z"/></g><path fill="#C9CCCD" d="M46 99.826l1 .076v-35.902h-1v35.826zM69 96.253c.336-.138.668-.28 1-.425v-7.828h-1v8.253z"/><path fill="#E8E8EA" d="M23 69v-38c0-1.656 1.343-3 3-3h-3c-1.657 0-3 1.344-3 3v38c0 1.657 1.343 3 3 3h3c-1.657 0-3-1.343-3-3z"/><path fill="#E9EAEE" d="M24 41h2c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2h-2c-1.104 0-2-.896-2-2v-16c0-1.104.896-2 2-2z"/><path fill="#D1D2D6" d="M26 41h-2c-1.104 0-2 .896-2 2v2c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v-2c0-1.104-.896-2-2-2z"/><path fill="#FDFDFD" d="M26 59h-2c-1.104 0-2-.896-2-2v2c0 1.104.896 2 2 2h2c1.104 0 2-.896 2-2v-2c0 1.104-.896 2-2 2z"/></svg>;
    }

    return (
        <div 
            className='group hover:shadow-xl shadow transition-all p-2 bg-white mx-auto my-2 xl:w-[48%] lg:w-[48%] flex flex-col justify-between'
        >  
            <div>
                <div
                    className='flex justify-between p-2 bg-no-repeat bg-center bg-cover'
                    style={{backgroundImage:"url('../../img/hex-bg.png')"}}
                >

                    {   
                        data['media_type'].S === "BLOG"?
                        (
                            <>
                                <div
                                    className='flex'
                                >
                                    {image}
                                    <p
                                        className='my-auto text-white text-2xl font-bold pl-2 group-hover:animate-pulse'
                                    >Blog</p>
                                </div>
                                <DateCard date={date} />
                            </>
                        )
                        :
                        (
                            <>
                                <div className='flex'>
                                    {image}
                                    <p
                                        className='my-auto text-white text-2xl font-bold pl-2 group-hover:animate-pulse'
                                    >Podcast</p>
                                </div>
                                <DateCard date={date} />
                            </>
                        
                        )
                    }
                </div>
                <p
                    className='font-semibold text-xl '
                >
                    {data['media_title'].S}
                </p>
            </div>
            <div
                className='border-t-2'
            >
                <div>
                    <p>{data['media_content'].S}</p>
                </div>

                <button 
                    className='hover:animate-pulse mx-auto block bg-gray-300 rounded  p-2'
                    onClick={
                        () => window.location.href = data['media_source'].S
                    }
                >{button_title}</button>
            </div>
        </div>
    )
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
    const [blogs, setBlogs] = React.useState();
    const getBlogs = async () => {
        const sort = await fetchData('sort_orders')
        const res = await fetchData('blogs')
        if(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L.length !== 0)
            setBlogs(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L,res.Items));
        else
            setBlogs(res.Items)
    };

    React.useEffect(() => {
        getBlogs();
    }, []);

    if(blogs){
        return (
            <div 
                className='p-2 shadow-xl bg-cover'
                style={{backgroundImage:"url('../../img/standard-bg-light.png')"}}    
            >
                <p className='text-4xl'>Blogs and Podcasts</p>
                <div
                    className='flex flex-wrap'
                >
                    {
                        blogs.map((blog,index) => {
                            return <Blog key={index} data={blog.data.M} />
                        })
                    }
                </div>
            </div>
        );
    }
    return (
        <div 
            className='p-4 shadow-xl bg-cover'
            style={{backgroundImage:"url('../../img/standard-bg-light.png')"}}    
        >
            <p className='text-4xl'>Blogs and Podcasts</p>
        </div>
    );
    
}





const LandingBooks = () =>{
    return (
        <div 
            className='p-2 shadow-xl bg-cover'
            style={{backgroundImage:"url('../../img/standard-bg-light.png')"}}   
        >
            <p className='text-4xl'>Recent Publications</p>
            <div className='book column-container'>
                <div className='content-column-sm'>
                    
                </div>
                <div className='content-column-lg'>
                    <p>Diversity at College</p>
                    <p>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                    <button onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"}>PURCHASE</button>
                </div>
            </div>

            <div className='book column-container'>
                <div className='content-column-sm'>
                    
                </div>
                <div className='content-column-lg'>
                    <p>Education that Works</p>
                    <p>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                    <button onClick={() => window.location.href = "https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216"}>PURCHASE</button>
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
                className='w-5/12 xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-70 p-1 rounded'
                onClick={() => window.location.href = 'http://otherlobe.com/papers/'}
            >
                <svg 
                className='mx-auto'
                fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.602 4.075c2.201 1.174 4.904 3.254 6.398 5.252-1.286-.9-3.011-1.027-5.058-.549.222-1.469-.185-3.535-1.34-4.703zm-.825 6.925s1.522-7-3.335-7h-5.442v20h16v-10.629c0-3.42-4.214-3.116-7.223-2.371zm-.318-8l-1.459-1h-9v20h1v-19h9.459zm-2.443-2l-1.5-1h-8.516v20h1v-19h9.016z"/></svg>
                <p className='mx-auto text-center uppercase'>our papers</p>
            </div>
            <div 
                className='w-5/12 xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-70 p-1 rounded'
                onClick={() =>  setPage('/publications')}
            >
                <svg 
                className='mx-auto'
                width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white"  clipRule="evenodd"><path d="M14 0v10l2-1.518 2 1.518v-10h4v24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h9zm6 20h-14.505c-1.375 0-1.375 2 0 2h14.505v-2z"/></svg>
                <p className='mx-auto text-center uppercase'>our books</p>
            </div>
            <div 
                className='w-5/12 xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-70 p-1 rounded'
                onClick={() => window.location.href = 'http://otherlobe.com/blog/'}
            >
                <svg 
                className='mx-auto'
                fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.568.075c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702zm7.432 10.925v13h-20v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3zm-16 5h5v-4h-5v4zm12 2h-12v1h12v-1zm0-3h-5v1h5v-1zm0-3h-5v1h5v-1z"/></svg>
                <p className='mx-auto text-center uppercase'>our articles</p>
            </div>
            <div 
                className='w-5/12 xl:w-1/12 lg:w-1/12 my-1 mx-auto bg-gray-400 bg-opacity-70 p-1 rounded'
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




const LandingSpaceRow = (args) => {
    return (
        <div className={'space-row '+args.spec}>
            <br/>
            <br/>
            <br/>
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
            <LandingSpaceRow />
            <LandingBrain />
            <LandingReferenceRow />
            <LandingBlogs />
            <LandingSpaceRow spec='switch-img-position-center' />
            <LandingBooks />
            <LandingSpaceRow spec='switch-img-position-top' />
            <LandingAd />
            <Footer />
		</>
    );
}
export default Landing;