import React, { useEffect, useState } from 'react';
import { fetchData } from '../access/dba.js'

import { useRecoilState } from "recoil";
import { pageState } from "../atom";

import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Loading from '../components/general/Loading.component.jsx';

import {BlogMd} from "../components/custom.library"
import { SubTitleSm, TitleMd, Wrapper } from '../components/common.library.jsx';
import { Icon } from '@iconify/react';

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
        const sort = await fetchData('sort-orders')
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



const Landing = () => {
    const [,setPage] = useRecoilState(pageState)

    return (
		<>
			<Header 
                content='Center for Neuroscience and Experiential Education'
                subtext='An interactive semi-virtual laboratory for study, writing, and research'
            />
            <Wrapper color='light'>
                <p className='mx-auto text-blue-900 text-3xl text-center'>“The heart has reasons of which reason does not know.”</p>
                <p className='text-center'>- Blaise Pascale, 1623-62, mathematician, physicist, philosopher</p>
            </Wrapper>

            <Wrapper>
                <br/>
            </Wrapper>

            <div className='md:flex my-4'>
                <div className='w-full md:w-1/2 bg-cover rounded-xl bg-center bg-brain-gif bg-no-repeat p-4 min-h-[400px]'>
                </div>
                <div className='w-full md:w-1/2 md:ml-4 rounded-xl px-4 py-10 text-lg shadow-xl bg-light-hex bg-top bg-no-repeat bg-cover'>
                    <p className='text-justify h-fit my-auto md:text-xl'>The Stellar Research Lab is made up of an <span className='text-blue-600 italic'>interdisciplinary team of neuroscience enthusiasts.</span> A common interest in the importance of experiential learning and the brain basis of decision making unites us to explore this challenging yet exciting area.<br/><br/> Because of our unique, oftentimes non-neuroscientist backgrounds, <span className='text-blue-600 italic'>the lab is able to approach topics from nontraditional point of view</span> to compose unique assortments of blogs, papers, podcasts and books for the fellow curious mind...</p>
                </div>
            </div>

            <Wrapper className="mt-12">
                <div className="bg-white w-[95%] mx-auto -mt-8 shadow-xl shadow-gray-800 rounded">
                    <div className='flex border-b'>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>window.location.href="https://www.otherlobe.com"}>
                            <div className='flex justify-between'>
                                <Icon icon="material-symbols:library-books-rounded" width={45}/>
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">Papers</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">Our papers and articles on The Other Lobe</SubTitleSm>
                        </div>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l cursor-pointer' onClick={()=>setPage("publications")}>
                            <div className='flex justify-between'>
                                <Icon icon="mdi:book-multiple" width={45}/>
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">Books</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">Our recent publications</SubTitleSm>
                        </div>
                    </div>
                    <div className='flex border-b'>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>window.location.href="https://experienced.simplecast.com/"}>
                            <div className='flex justify-between'>
                                <Icon icon="material-symbols:video-library-rounded" width={45}/>
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">Podcasts</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">Our podcasts with guest speakers</SubTitleSm>
                        </div>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l cursor-pointer' onClick={()=>setPage("people")}>
                            <div className='flex justify-between'>
                                <Icon icon="mdi:user-box-multiple" width={45}/>
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">People</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">The members of our lab team</SubTitleSm>
                        </div>
                    </div>
                    <div className='flex '>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>setPage("projects")}>
                            <div className='flex justify-between'>
                                <Icon icon="mdi:library-edit-outline" width={45} />
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">Projects</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">Our collaborative work broken down into clusters</SubTitleSm>
                        </div>
                        <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l cursor-pointer' onClick={()=>setPage("affiliations")}>
                            <div className='flex justify-between'>
                                <Icon icon="ic:round-library-add" width={45} />
                                <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                            </div>
                            <br/>
                            <TitleMd className="">Affiliates</TitleMd>
                            <SubTitleSm className="text-gray-600 font-bold">Our affiliates and collaborators</SubTitleSm>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <LandingBlogs />
            
            <Wrapper>
                <br/>
            </Wrapper>

            <LandingBooks />
            
            <Wrapper>
                <br/>
            </Wrapper>

            <Footer />
		</>
    );
}
export default Landing;