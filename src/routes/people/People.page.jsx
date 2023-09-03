import React from "react";
import Footer from "../../shared/components/footer/Footer";
import NavHeader from "../../shared/components/Header";
import PeopleSection from "./sections/MemberSection.component";

const People = (args) => {
  return (
    <section>
      <NavHeader
        title="The Stellar Research Lab, an interdisciplinary team of neuroscience enthusiasts"
        message="With distinguished, oftentimes non-neuroscientist backgrounds, the lab approaches topics 
                from nontraditional points of view to compose unique content for the fellow curious mind."
      />
      {/* <StellarSection /> */}
      <PeopleSection />
      <Footer />
    </section>
  );
};

export default People;
