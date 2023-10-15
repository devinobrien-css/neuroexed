import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import EducationSection from './sections/EducationSection.component';
import DiversitySection from './sections/DiversitySection.component';

const BooksSection = () => {
  return (
    <div className="mx-auto my-32 max-w-screen-xl">
      <p className="mb-8 font-raleway text-4xl font-light md:text-6xl">
        Our Books
      </p>
      <br />
      <DiversitySection />
      <br />
      <EducationSection />
    </div>
  );
};

const Books = () => {
  return (
    <>
      <Header
        title="Publications from members of CNEE"
        sub_title="Showcasing the culmination of our groundbreaking research efforts"
      />
      <BooksSection />
      <Footer />
    </>
  );
};

export default Books;
