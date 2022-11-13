import React from 'react';


/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer/footer';
import Header from '../components/header/header';



const BooksHeader = () => {
    return (
        <div className='books-header'>
            <div>
                <p></p>
            </div>
            <div>
                <p></p>
            </div>
        </div>


    );
}


const BooksSection = () =>{
    return (
         <div 
            className='p-2 shadow-xl bg-cover bg-light-hex bg-no-repeat'   
        >
            <p className='text-4xl'>Recent Publications</p>
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