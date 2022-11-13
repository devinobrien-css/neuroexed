import React from 'react';

/* STYLESHEET IMPORTS */
import './affiliations.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';
import Modal from '../../components/modals/modal';

import { fetchData } from '../../access/dba';


/** Header for the affiliations page
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
        <div className='md:w-5/12 mx-auto p-4 my-4 bg-white rounded shadow-lg'> 
            <img 
                src={`https://neuro-exed-images.s3.us-east-1.amazonaws.com/affiliations/${affiliate.data.M.slug.S}.png`} 
                alt={`affiliation ${affiliate.name.S}`} 
                className='mx-auto my-4 shadow-lg shadow-gray-300 rounded p-2 border'
            /> 
            <p className='text-2xl my-2 text-center'>{affiliate.name.S}</p>
            <button
                className='bg-gray-800 hover:bg-gray-900 transition-all transform hover:scale-105 text-white rounded px-4 py-1 mx-auto block'
                onClick={() => Modal(modal_content)}>visit</button>
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

    return (
        <div className='p-4 shadow-xl bg-cover mb-4 bg-light-hex'>
            <p className='text-6xl font-light mb-4'>Our Affiliates</p>
            <div className='flex flex-wrap'>
                {
                    affiliations?.map((affiliate,index) => {
                        return <Affiliation key={index} data={affiliate} />
                    })
                }
            </div>
        </div>
    );
}

/**Affiliations Section
 * @param {*} args 
 * @returns 
 */
const Affiliations = () => {
    return (
		<>
			<AffiliationsHeader />
            <AffiliationsSection />
            <Footer />
		</>
    );
}

export default Affiliations;