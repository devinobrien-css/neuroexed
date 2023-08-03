import { SubTitleSm, TextSectionSm, TitleLg } from "../../../shared/components/common.library";


const DiversitySection = () => {
    return (
        <div className="border rounded shadow-lg my-4 p-12">
            <div className='md:flex p-4'>
                <div className='shrink-0 md:w-1/4 bg-diversity bg-contain min-h-[300px] bg-no-repeat bg-center mx-auto'>

                </div>
                <div className=''>
                    <div className=''>
                        <p className='font-light text-5xl font-raleway'>Diversity at College</p>
                        <br/>
                        <p className='text-justify font-lato font-light'>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                    </div>
                    <div className='flex justify-evenly my-2 md:w-1/2 mx-auto'>
                        <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"} title="purchase this book on amazon">buy this book</button>
                        <button className='my-6 mx-auto px-4 py-2 block rounded bg-blue-900 hover:bg-blue-400 hover:text-gray-600 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://diversityatcollege.com"} title="visit diversity at college's website">visit their site</button>
                    </div>
                    <br/>
                    <div className='flex justify-evenly my-2'>
                        <img src="img/bba-award.png" alt="Best Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                        <img src="img/indie-award.png" alt="Indie Book Award Logo" className='w-1/3 shrink-0 max-w-[150px]' />
                    </div>


                </div>
            </div>
            <hr className="border-2 w-5/6 mx-auto my-4"/>
            <div>
                <TitleLg className='w-fit mx-auto'>What People are Saying</TitleLg>

                <div className='flex justify-evenly'>
                    <div className='p-4 my-2 w-2/3'>
                        <TextSectionSm className="text-center font-light">
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
            </div>

        </div>
    )
}

export default DiversitySection;