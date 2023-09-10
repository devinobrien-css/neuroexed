import Header from '../../shared/components/Header';
import Footer from '../../shared/components/footer/Footer';
import { Posts } from './components/Posts';

const News = () => {
  return (
    <>
      <Header
        title="Latest news from CNEE"
        sub_title="View our latest announcements, posts and more"
      />
      <Posts />
      <Footer />
    </>
  );
};

export default News;
