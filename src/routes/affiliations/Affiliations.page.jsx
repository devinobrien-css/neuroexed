import Footer from "../../shared/components/Footer";
import NavHeader from "../../shared/components/NavHeader.component";
import AffiliationsList from "./sections/AffiliationsList";


/**Affiliations Section
 * @returns a list of affiliates
 */
const Affiliations = () => {
    
    return (
      <>
        <NavHeader 
          title='The Affiliates of CNEE'
          content='CNEE and its members work with a variety of entities to better understand and apply 
          experiential education thinking to higher education and to the work-places and 
          graduate/professional schools they serve.'
        />
        <AffiliationsList />
        <Footer />
      </>
    );
}

export default Affiliations;