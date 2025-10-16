import React from 'react';
import DiversitySection from './sections/DiversitySection.component';
import EducationSection from './sections/EducationSection.component';
import ProfessionalWisdomSection from './sections/ProfessionalWisdomSection.component';
import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import Navbar from '../../shared/components/Navbar';

const Books = () => {
  return (
    <section>
      <Navbar />
      <Header
        title="Books Published By Our Lab"
        sub_title="Explore our publications on experiential education, diversity in higher education, and career development."
        scrollToId="books-main-content"
        buttonText="View Books"
      />
      <div id="books-main-content" className="mx-auto">
        <ProfessionalWisdomSection />
        <DiversitySection />
        <EducationSection />
      </div>
      <Footer />
    </section>
  );
};

export default Books;
