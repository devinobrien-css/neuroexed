import React, { useEffect, useState } from 'react';

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Modal from '../components/modals/modal';

import { fetchData } from '../access/dba';
import { ScrollLoader } from '../components/loaders.library';
import Header from '../components/header.component';
import { SectionTitle } from '../components/common.library';


const Affiliation = (args) => {
    var affiliate = args.data;
    var modal_content = (
        <div className='bg-white rounded py-8 px-4'>
            <div className='text-xl md:text-4xl'>
                <p>You're about to leave our site!</p>
                
            </div>
            <div className='mx-auto block text-center rounded bg-gray-300 w-fit my-1 p-2 hover:scale-105 transform transition-all'>
                <a href={affiliate.data.M.source.S} >Click to continue</a>
            </div>
        </div>
    )

    return (
        <div className='hover:shadow-xl shadow-gray-400 max-w-[450px] md:w-5/12 mx-auto transition-all my-4 bg-white rounded-xl hover:scale-105 transform shadow overflow-hidden pb-4 cursor-pointer' onClick={() => Modal(modal_content)}> 
            <img src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/affiliations/${affiliate.data.M.slug.S.toLowerCase()}.png`} className="block max-w-full min-h-[200px]" alt={`Website of ${affiliate.name.S}`}/>
            <p className='text-2xl my-2 text-center'>{affiliate.name.S}</p>
            <button
                className='bg-gray-800 hover:bg-gray-900 transition-all transform hover:scale-105 text-white rounded px-4 py-1 mx-auto block'
                onClick={() => Modal(modal_content)}>visit</button>
        </div>
    )
}

const AffiliationsSection = () => {
    const [affiliations, setAffiliations] = React.useState();
    const [loading,setLoading] = useState()
    const getAffiliations = async () => {
        setLoading(true)
        const res = await fetchData('affiliations')
        setAffiliations(res.Items);
        setLoading()
    };
    useEffect(() => {
        getAffiliations();
    }, []);

    return (
        <div className='p-4 shadow-std bg-cover rounded-xl my-4 bg-light-hex'>
            <SectionTitle>Our Affiliates</SectionTitle>
            <div className='flex flex-wrap'>
                {loading?(
                    <div className='flex flex-col items-center w-full min-h-[400px]'>
                        <ScrollLoader />
                    </div>
                ):(<></>)}
                {affiliations?.map((affiliate,index) => {
                    return <Affiliation key={index} data={affiliate} />
                })}
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
			<Header 
                content={"The Affiliates of CNEE"}
                subtext={"CNEE and its members work with a variety of entities to better understand and apply experiential education thinking to higher education and to the work-places and graduate/professional schools they serve."}
            />
            <AffiliationsSection />
            <Footer />
		</>
    );
}

export default Affiliations;