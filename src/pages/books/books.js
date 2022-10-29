import React from 'react';

/* STYLESHEET IMPORTS */
import './books.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';



const BooksHeader = () => {
    return (
        <div className='books-header'>
            <div>
                <p>Publications from members of CNEE</p>
            </div>
            <div>
                <p></p>
            </div>
        </div>


    );
}


const BooksSection = () =>{
    return (
        <div className='book-section'>
            <p></p>
            <div className='book column-container'>
                <div className='content-column-sm'>
                    
                </div>
                <div className='content-column-lg'>
                    <p>Diversity at College</p>
                    <p>In 2020, eight lab members and recent college graduates produced a book, Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education more Inclusive. The book is fully co-authored (not edited) and applies lessons from experiential education and social neuroscience thinking to five key student-centered stories, such as implicit bias or stereotype threat. The book was named as finalist for the 2021 Indie book awards in the social change category and serves as a basis for recent panel discussions.</p>
                    <button>PURCHASE HERE</button>
                </div>
            </div>

            <div className='book column-container'>
                <div className='content-column-sm'>
                    
                </div>
                <div className='content-column-lg'>
                    <p>Education that Works</p>
                    <p>Experiential Education complements the classical academic nature of the classroom-based college experience by bringing in direct experience with industry, non-profits, and governments. In 2017, Stellar wrote a book on this topic, Education that Works: The Neuroscience of Building a more Effective Higher Education. The book argues that due to how the brain works, students develop insight, maturity, and even a passion for their career growth, as well as key work-place skills and abilities that make them of good students, good citizens, and good employees.</p>
                    <button>PURCHASE HERE</button>
                </div>
            </div>
        </div>
    );
}


const Books = () => {
    return (
        <>
            <BooksHeader />
			<BooksSection />
            <Footer />
		</>
    )
}

export default Books;