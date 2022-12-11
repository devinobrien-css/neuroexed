import React from 'react';
import { BBA_award } from '../assets/award';
import { SectionTitle, SubTitleSm, TextSectionSm, TitleLg, TitleMd, TitleSm, Wrapper } from '../components/common.library';

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Header from '../components/header.component';

const BooksSection = () =>{
    return (
        <div>
            <br/>
            <SectionTitle>Our Publications</SectionTitle>

            <Wrapper className="">
                <div className='bg-white bg-opacity-80 md:flex p-4 border rounded shadow-lg my-4 '>
                    <div className='shrink-0 md:w-1/4 bg-diversity bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'>

                    </div>
                    <div className=''>
                        <div className=''>
                            <p className='font-light text-5xl'>Diversity at College</p>
                            <br/>
                            <p className='text-justify'>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                        </div>
                        <div className='flex justify-evenly my-2'>
                            <img src="img/bba-award.png" alt="Best Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                            <img src="img/indie-award.png" alt="Indie Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                        </div>

                        <div className='flex justify-evenly my-2 md:w-1/2 mx-auto'>
                            <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"} title="purchase this book on amazon">buy this book</button>
                            <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://diversityatcollege.com"} title="visit diversity at college's website">visit their site</button>
                        </div>

                    </div>
                </div>

                <Wrapper color='light' className="opacity-80">
                    <TitleLg>What People are Saying</TitleLg>
                </Wrapper>

                <div className='flex justify-evenly'>
                    <div className='bg-white bg-opacity-80 p-4 border rounded shadow-lg my-2 w-2/3'>
                        <TextSectionSm className="text-center">
                            "In this education policy book, Stellar and some former students 
                            at Queens College and the University of Albany (debut authors 
                            Martinez, Eggan, Poy, Weiser, Eager, Cohen, and Buras) 
                            present narratives of their personal experiences on campus.

                            The book is strongest in the specific details the contributors 
                            share in their stories, like the distinction Poy draws between 
                            paid and unpaid internships as realistic options for 
                            low-income students.

                            the informative book succeeds in its presentation of realistic 
                            and attainable tactics schools can implement based on the 
                            contributors' experiences, such as peer and faculty mentoring, 
                            ensuring all students are familiar with the norms of academia, 
                            and providing opportunities for experiential learning.

                            The authors' addition to the field does an excellent job of 
                            drawing broad conclusions from a collection of individual experiences. 
                            An illuminating exploration of how colleges can support diversity."
                        </TextSectionSm>
                        <br/>
                        
                        <SubTitleSm className="text-center">-Kirkus Reviews</SubTitleSm>

                    </div>
                </div>
            </Wrapper>

            <Wrapper className="">
                <div className='bg-white bg-opacity-80 md:flex p-4 border rounded-xl shadow-lg my-4'>
                    <div className='shrink-0 md:w-1/4 bg-education bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'></div>
                    <div className=''>
                        <p className='font-light text-5xl'>Education that Works</p>
                        <br/>
                        <p className='text-lg'>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                        <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216"} title="purchase this book on amazon">buy this book</button>
                    </div>
                </div>
                <Wrapper color='light' className="opacity-80">
                    <TitleLg>What People are Saying</TitleLg>
                </Wrapper>
                <div className='flex justify-evenly'>
                    <div className='bg-white bg-opacity-80 p-4 border rounded shadow-lg my-2 w-1/3'>
                        <TextSectionSm className="text-center">
                            "James Stellar draws on his deep knowledge of 
                            neuroscience and his years of experience as an 
                            academic officer at major universities to make the 
                            case for adding experiential education to 
                            traditional, class-based undergraduate programs. 
                            The book's title—Education That Works—tells it all. 
                            Quite simply, experiential education is a pedagogy 
                            that empowers young people more effectively 
                            than classroom study alone."
                        </TextSectionSm>
                        <br/>
                        
                        <SubTitleSm className="text-center">-Richard Freeland, past President of Northeastern Universityand</SubTitleSm>

                    </div>
                    
                    <div className='bg-white bg-opacity-80 p-4 border rounded shadow-lg my-2 w-1/3'>
                        <TextSectionSm className="text-center">
                            "At a time when states across the nation are 
                            mandating experiential learning in higher education, 
                            neuroscientist and academic leader James Stellar has 
                            written a beautiful book that educates and inspires 
                            us about the unique power of experiential learning 
                            to transform students' visions and decisions about 
                            their best futures. Read this book and learn why 
                            experiential learning is the right next turn for 
                            higher education."
                        </TextSectionSm>
                        <br/>
                        
                        <SubTitleSm className="text-center">-Vita Rabinowitz, current Provost and Vice Chancellor of the CUNY system</SubTitleSm>
                    </div>
                </div>
            </Wrapper>

        </div>
    );
}


//"We hear all the time now in higher education that 
// experiential learning is the high-impact activity 
// that leads to high student engagement which in turn 
// leads to strong retention, graduation, and 
// post-graduate outcomes. 

//Part neuroscience primer and part part reflection on a long and successful career as a professor of neuroscience and pioneer of experiential learning, this delightful, highly readable book explains why experiential learning is so important— how it actually works, in our brains, and how it could work or work better in higher education today. Combining academic knowledge and reflection with substantive, authentic experiences that test and apply that knowledge when it really matters, is how our students can connect their talents and passions to meaningful careers. 


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