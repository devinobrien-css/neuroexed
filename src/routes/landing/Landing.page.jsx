import React from 'react';
import NavHeader from '../../shared/components/NavHeader.component.jsx';
import LandingQuote from './sections/LandingQuote.component.jsx';
import LandingBlogs from './sections/LandingBlogs.component.jsx';
import LandingPublications from './sections/LandingPublications.component.jsx';
import LandingRedirect from './sections/LandingRedirect.component.jsx';
import Footer from '../../shared/components/Footer.jsx';

/** Landing page - initial route
 * @returns the components of the landing page
 */
const Landing = () => {

    return (
		<section>
            <NavHeader 
                title='Center for Neuroscience and Experiential Education'
                content='An interactive semi-virtual laboratory for study, writing, and research'
            />
            <div className='bg-white'>
                <LandingQuote />
            </div>
            {/* <div className='md:flex my-4'>
                <div className='w-full md:w-1/2 bg-cover rounded-xl bg-center bg-brain-gif bg-no-repeat p-4 min-h-[400px]'>
                </div>
                <div className='w-full md:w-1/2 md:ml-4 rounded-xl px-4 py-10 text-lg shadow-xl bg-light-hex bg-top bg-no-repeat bg-cover'>
                    <p className='text-justify h-fit my-auto md:text-xl'></p>
                </div>
            </div> */}
            <LandingBlogs />
            <LandingPublications />
            <LandingRedirect />
            <Footer />
		</section>
    );
}
export default Landing;