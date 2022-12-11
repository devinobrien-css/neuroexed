import React from 'react';
import { BBA_award } from '../assets/award';
import { SectionTitle } from '../components/common.library';

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Header from '../components/header.component';

const BooksSection = () =>{
    return (
        <div>
            <br/>
            <SectionTitle>Our Publications</SectionTitle>
            <div className='bg-white bg-opacity-60 md:flex p-4 border rounded shadow-lg my-4'>
                <div className='shrink-0 md:w-1/4 bg-diversity bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'></div>
                <div className=''>
                    <div className=''>
                        <p className='font-light text-5xl'>Diversity at College</p>
                        <br/>
                        <p className='text-justify'>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                    </div>
                    <div className='flex justify-evenly my-2'>
                        <img src="img/bba-award.png" alt="Best Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                        <img src="img/indie-award.png" alt="Best Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                    </div>

                    <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"}>PURCHASE</button>
                </div>
            </div>

            <div className='bg-white bg-opacity-60 md:flex p-4 border rounded shadow-lg my-4'>
                <div className='shrink-0 md:w-1/4 bg-education bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'></div>
                <div className=''>
                    <p className='font-light text-5xl'>Education that Works</p>
                    <br/>
                    <p className='text-lg'>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                    <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216"}>PURCHASE</button>
                </div>
            </div>
        </div>
    );
}

const Books = () => {
    return (
        <>
            <Header content={"Publications from members of CNEE"} />
			<BooksSection />
            <Footer />
		</>
    )
}

export default Books;