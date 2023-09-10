import Header from '../../shared/components/Header';
import Footer from '../../shared/components/footer/Footer';
import ProjectsBrain from './sections/ProjectsBrain.component';
import ProjectsSection from './sections/ProjectsSection.component';
import ProjectsValues from './sections/ProjectsValues.component';

const Projects = () => {
  return (
    <section>
      <Header
        title="Our Team's Projects and Collaborative Work"
        sub_title="Our collaborative projects inspire further expansion of our field and define new boundaries of 
                our craft. Core values are what makes a team differentiable. Here are some of ours."
      />
      <ProjectsSection />
      <ProjectsValues />
      <ProjectsBrain />
      <Footer />
    </section>
  );
};
export default Projects;
