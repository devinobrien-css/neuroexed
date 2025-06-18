import Header from '../../shared/components/Header';
import Footer from '../../shared/components/footer/Footer';
import Navbar from '../../shared/components/Navbar';
import BlogsSection from './sections/BlogsSection';
import Podcasts from './Podcasts.component';
import { motion } from 'framer-motion';

const Blogs = () => {
  return (
    <div>
      <Navbar />
      <Header
        title="Neuroexed's Blogs & Podcast"
        sub_title="These podcasts explore the process of learning from direct experiences in all of its forms."
      />

      <div className="mx-auto my-32 max-w-7xl px-4">
        <BlogsSection />

        <Podcasts />
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
