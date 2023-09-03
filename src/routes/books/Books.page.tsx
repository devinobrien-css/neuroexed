import Footer from "../../shared/components/footer/Footer";
import NavHeader from "../../shared/components/Header";
import { SectionTitle } from "../../shared/components/common.library";
import EducationSection from "./sections/EducationSection.component";
import DiversitySection from "./sections/DiversitySection.component";

const BooksSection = () => {
  return (
    <div className="my-32 max-w-screen-xl mx-auto">
      <SectionTitle className="w-fit mx-auto">Our Books</SectionTitle>
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
      <NavHeader
        title="Publications from members of CNEE"
        sub_title="Showcasing the culmination of our groundbreaking research efforts"
      />
      <BooksSection />
      <Footer />
    </>
  );
};

export default Books;
