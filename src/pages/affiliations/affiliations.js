import React from 'react';

/* STYLESHEET IMPORTS */
import './affiliations.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';
import Modal from '../../components/modals/modal';

import { fetchData } from '../../access/dba';


/** Header for the landing page
 * 
 * @returns 
 */
const AffiliationsHeader = () => {
    return (
        <div className='affiliations-header'>
            <div>
                <p>The Affiliates of CNEE</p>
            </div>
            <div>
                <p>CNEE and its members work with a variety of entities to better understand and apply experiential education thinking to higher education and to the work-places and graduate/professional schools they serve.</p>
            </div>
        </div>
    );
}


const AffiliationsSpaceRow = (args) => {
    return (
        <div className={'space-row '+args.spec}>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

const Affiliation = (args) => {
    var affiliate = args.data;

    var modal_content = (
        <div className='bg-white rounded py-8 px-4'>
            <div className='text-xl md:text-4xl'>
                <p>You're about to leave our site!</p>
                <img 
                    className='rounded-lg'
                    src="./img/leaving.png" 
                    alt="leaving so soon?" 
                />
            </div>
            <div className='mx-auto block text-center rounded bg-gray-300 w-fit my-1 p-2 hover:w-3/5 transition-[width]'>
                <a href={affiliate.data.M.source.S} >Click to continue</a>
            </div>
        </div>
    )

    return (
        <div className='affiliation content-column'> 
            <div>
                <img src={'./img/affiliations_logos/'+affiliate.data.M.slug.S+'.png'} alt={affiliate.data.M.slug.S}/>
            </div> 
            <div>
                <p>{affiliate.name.S}</p>
            </div>
            <div>
                <button onClick={() => Modal(modal_content)}>VISIT SITE</button>
            </div>
        </div>
    )
}

const AffiliationsSection = () => {
    const [affiliations, setAffiliations] = React.useState();
    const getAffiliations = async () => {
        const res = await fetchData('affiliations')
        setAffiliations(res.Items);
    };
    React.useEffect(() => {
        getAffiliations();
    }, []);

    if(affiliations){
        return (
            <div className='affiliations-container'>
                <p>Affiliations</p>
                <div className='column-container'>
                    {
                        affiliations.map((affiliate,index) => {
                            return <Affiliation key={index} data={affiliate} />
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='affiliations-container'>
                <p>Affiliations</p>
            </div>
        );
    }
}

/**
 * 
 * @param {*} args 
 * @returns 
 */
const Affiliations = () => {
    return (
		<>
			<AffiliationsHeader />
            <AffiliationsSection />
            <AffiliationsSpaceRow />
            <Footer />
		</>
    );
}

export default Affiliations;