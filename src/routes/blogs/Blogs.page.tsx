import Header from '../../shared/components/Header';
import Footer from '../../shared/components/footer/Footer';
import LandingBlogs from '../landing/sections/LandingBlogs';
import Podcasts from './Podcasts.component';

const Blogs = () => {
  return (
    <div>
      <Header
        title="Neuroexed's Blogs & Podcast"
        sub_title="These podcasts explore the process of learning from direct experiences in all of its forms."
      />
      <Podcasts />
      <div className="my-32 px-2">
        <h1 className=" text-center font-raleway text-4xl font-light md:text-6xl">
          Explore Our Lab's Blog Posts
        </h1>
        <br />
        <p className="mx-auto text-center font-lato text-lg font-light md:w-3/4">
          NeuroExed's papers and articles explore the process of learning from
          direct experiences in all of its forms.
        </p>
        <br />
        <p className="mx-auto text-center font-lato text-lg font-light md:w-3/4">
          We host our blogs on our sister site, The Other Lobe, which you can
          find{' '}
          <a
            href="http://otherlobe.com/"
            className="hover:text-moonstone-soft text-moonstone"
          >
            here
          </a>
          .
        </p>
        <LandingBlogs includeTitle={false} />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
