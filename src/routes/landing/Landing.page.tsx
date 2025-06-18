import LandingQuote from './sections/LandingQuote.component';
import LandingBlogs from './sections/LandingBlogs';
import { LandingBooks } from './sections/LandingBooks';
import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import Navbar from '../../shared/components/Navbar';
import LandingRedirect from './sections/LandingRedirect.component';
import { Posts } from './sections/Posts';
import FeaturedResearch from './sections/FeaturedResearch';
import StatsSection from './sections/StatsSection';
import Testimonials from './sections/Testimonials';
import CallToAction from './sections/CallToAction';
import SocialMediaSection from './sections/SocialMediaSection';

const under_construction = false;

/** Landing page - initial route
 * @returns the components of the landing page
 */
const Landing = () => {
  return (
    <section className="scroll-smooth">
      <Navbar />

      {under_construction ? (
        <div className="relative">
          <div className="absolute left-0 top-0 z-100 h-screen w-full cursor-not-allowed"></div>
          <Header
            title="Under Construction"
            sub_title="This page is currently under construction. Please check back soon!"
            scrollToId="landing-main-content"
            buttonText="Learn More"
          />
        </div>
      ) : (
        <>
          <Header
            title="Center for Neuroscience and Experiential Education"
            sub_title="An interactive semi-virtual laboratory for study, writing, and research"
            scrollToId="landing-main-content"
            buttonText="Explore Our Work"
          />
          <div id="landing-main-content">
            <LandingQuote />
          </div>
          <FeaturedResearch />
          <StatsSection />
          <LandingRedirect />
          <SocialMediaSection />
          <LandingBlogs />
          {/* <Posts /> */}
          <LandingBooks />
          <CallToAction />
          {/* <Testimonials /> */}
          <Footer />
        </>
      )}
    </section>
  );
};

export default Landing;
