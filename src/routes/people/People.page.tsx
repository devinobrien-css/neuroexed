import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import PeopleSection from './sections/MemberSection.component';

const People = () => {
  return (
    <section>
      <Header
        title="The Stellar Research Lab, an interdisciplinary team of neuroscience enthusiasts"
        sub_title="With distinguished, oftentimes non-neuroscientist backgrounds, the lab approaches topics 
                from nontraditional points of view to compose unique content for the fellow curious mind."
      />
      <PeopleSection />
      <Footer />
    </section>
  );
};

export default People;
