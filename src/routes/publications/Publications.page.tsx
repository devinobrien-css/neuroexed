import React from 'react';
import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import Navbar from '../../shared/components/Navbar';
import { PublicationsTable } from './sections/Publications.component';

const Publications = () => {
  return (
    <section>
      <Navbar />
      <Header
        title="Our Publications"
        sub_title="Explore our research papers, books, and other scholarly work."
      />
      <div className="container mx-auto p-4">
        <PublicationsTable />
      </div>
      <Footer />
    </section>
  );
};

export default Publications;
