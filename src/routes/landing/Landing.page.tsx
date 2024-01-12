import React from 'react';
import LandingQuote from './sections/LandingQuote.component.jsx';
import LandingBlogs from './sections/LandingBlogs.jsx';
import LandingPublications from './sections/LandingBooks.js';
import Footer from '../../shared/components/footer/Footer.js';
import Header from '../../shared/components/Header.js';
import LandingRedirect from './sections/LandingRedirect.component.js';

const under_construction = false;

/** Landing page - initial route
 * @returns the components of the landing page
 */
const Landing = () => {
  return (
    <section className="scroll-smooth">
      {under_construction ? (
        <div className="relative">
          <div className="z-100 absolute left-0 top-0 h-screen w-full cursor-not-allowed"></div>
          <Header
            title="Under Construction"
            sub_title="This page is currently under construction. Please check back soon!"
          />
        </div>
      ) : (
        <>
          <Header
            title="Center for Neuroscience and Experiential Education"
            sub_title="An interactive semi-virtual laboratory for study, writing, and research"
          />
          <LandingQuote />
          <LandingBlogs />
          <LandingPublications />
          <LandingRedirect />
          <Footer />
        </>
      )}
    </section>
  );
};
export default Landing;
