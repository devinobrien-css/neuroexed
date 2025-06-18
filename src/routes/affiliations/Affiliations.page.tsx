import React from 'react';
import Footer from '../../shared/components/footer/Footer';
import Navbar from '../../shared/components/Navbar';
import AffiliationsList from './sections/AffiliationsList';
import HeroSection from './sections/HeroSection';
import NetworkVisualization from './sections/NetworkVisualization';
import Header from '../../shared/components/Header';

const Affiliations = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl"></div>
        <div className="absolute -left-40 top-80 h-96 w-96 rounded-full bg-gradient-to-br from-teal-400/10 to-cyan-400/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl"></div>
      </div>

      <div className="relative">
        <Navbar />
        <Header
          title="Our Affiliations"
          sub_title="Explore our global network of partnerships and collaborations that drive innovation and impact."
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Partnership Stats */}
        {/* <PartnershipsStats /> */}

        {/* Main Affiliations Grid */}
        <section id="affiliations-list" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Our Global Network
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                Discover the incredible organizations and institutions that make
                our mission possible through meaningful partnerships and
                collaborative innovation.
              </p>
            </div>
            <AffiliationsList />
          </div>
        </section>

        {/* Network Visualization */}
        <NetworkVisualization />

        {/* Collaboration Timeline */}
        {/* <CollaborationTimeline /> */}

        <Footer />
      </div>
    </div>
  );
};

export default Affiliations;
