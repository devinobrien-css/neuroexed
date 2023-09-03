import React from "react";
import LandingQuote from "./sections/LandingQuote.component.jsx";
import LandingBlogs from "./sections/LandingBlogs.jsx";
import LandingPublications from "./sections/LandingBooks.js";
import Footer from "../../shared/components/footer/Footer.js";
import Header from "../../shared/components/Header.js";
import LandingRedirect from "./sections/LandingRedirect.component.jsx";

/** Landing page - initial route
 * @returns the components of the landing page
 */
const Landing = () => {
  return (
    <section>
      <Header
        title="Center for Neuroscience and Experiential Education"
        sub_title="An interactive semi-virtual laboratory for study, writing, and research"
      />
      <LandingQuote />
      <LandingBlogs />
      <LandingPublications />
      <LandingRedirect />
      <Footer />
    </section>
  );
};
export default Landing;
