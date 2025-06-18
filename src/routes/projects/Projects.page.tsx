import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import Navbar from '../../shared/components/Navbar';
import ProjectsBrain from './sections/ProjectsBrain.component';
import ProjectsValues from './sections/ProjectsValues.component';
import ProjectsSection from './sections/ProjectsSection.component';
import { BrainEvolutionTimeline } from './sections/BrainEvolutionTimeline';

const Projects = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Header
        title="Research Projects"
        sub_title="Explore our lab's ongoing projects and research initiatives in neuroscience and education."
      />
      <ProjectsSection />
      <ProjectsValues />
      <BrainEvolutionTimeline />
      <ProjectsBrain />
      <Footer />
    </section>
  );
};

export default Projects;
