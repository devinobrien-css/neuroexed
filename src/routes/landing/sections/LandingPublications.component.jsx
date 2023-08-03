const LandingPublications = () => {
    return (
        <div className='bg-cover bg-landing backdrop-opacity-10 my-32 bg-no-repeat shadow-2xl shadow-gray-900'>
            <div className='backdrop-contrast-30 backdrop-blur-md p-16'>
                <p className='text-6xl font-raleway text-white mb-8 text-center'>Recent Publications</p>
                <div className='md:flex p-8 my-4 border justify-center'>
                    <img src='./img/diversity.png' alt='Diversity at College Book' className='block w-1/4 p-12'/>
                    <div className='w-2/5 pl-2 flex flex-col h-max-content'>
                        <div className='my-auto'>
                            <p className='text-white font-light text-5xl font-lato'>Diversity at College</p>
                            <br/>
                            <p className='text-lg text-gray-400 font-lato'>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                            <button className='my-6 mx-auto px-4 py-2 block rounded border-white border-2 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"}>PURCHASE</button>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>

                <div className='md:flex p-8 my-4 border justify-center'>
                    <div className='w-2/5 pl-2 flex flex-col h-max-content'>
                        <div className='my-auto'>
                            <p className='text-white font-light text-5xl font-lato'>Education that Works</p>
                            <br/>
                            <p className='text-lg text-gray-400 font-lato'>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                            <button className='my-6 mx-auto px-4 py-2 block rounded border-white border-2 transition-all transform hover:scale-105 text-white' onClick={() => window.location.href = "https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352"}>PURCHASE</button>
                        </div>
                    </div>
                    <img src='./img/education.png' alt='Education that Works Book' className='block w-1/4 p-12'/>
                </div>
            </div>
        </div>
    )
}

export default LandingPublications;