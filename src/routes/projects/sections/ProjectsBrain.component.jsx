import { useState } from "react";
import { TriuneBrain } from "../../../assets/TriuneBrain.component";
import { SectionTitle, SubTitleSm, TitleLg } from "../../../shared/components/common.library";


const brainData = {
    'NEO':{
        description:"The crowning achievement of evolution is the development of the 6 layer neocortex that houses our ability to perceive, act, and reason with a high degree of cognitive abstraction. Sitting at the highest level of brain function, it exercises the power of speech and handles the facts and theory learning seen in higher education. Research also indicates that it tends to perceive itself as the source of all awareness often ignoring the functioning of lower brain systems that our defining quote from Pascale calls “heart reasons.”",
        title:"Neomammilian Layer"
    },
    'PALEO':{
        description:"Sitting in the middle of the three brain levels, its limbic and motor systems generate the motivated actions required to preserve the body's health (feeding when hungry) and it gives pleasure and pain signals that can drive behavior (such as addiction). A tremendous amount of logic exists at this level, is largely outside awareness, but can guide decisions (e.g. in neuroeconomics). The integration of this “limbic logic” developed through direct experience (internships, etc.) with more cognitive classroom-based learning is the lab's main focus.",
        title:"Paleomammilian Layer"
    },
    'REPT':{
        description:"Lying at the bottom of the brain, it controls simple life-sustaining reflexes (such as breathing), as well as more complex patterns (e.g. lower motor control of walking).  It also mediates evolutionary encoded actions like eye-tracking (vs the primate brain which models the object's trajectory).  Although not much a subject of our lab's work, it nicely illustrates the principle of levels of function in the brain.",
        title:"Reptillian Layer"
    }
}


const ProjectsBrain = () => {
    const [selected,setSelected] = useState('NEO')

    return (
        <div className='flex md:flex-wrap flex-wrap-reverse justify-between my-32 rounded-xl'>
            <div className='bg-light-hex bg-cover bg-no-repeat bg-bottom  border rounded-tr-lg rounded-br-lg md:w-1/2 w-full'>
                <div className='bg-white rounded p-2 w-10/12 mx-auto shadow-std -mt-8'>
                    <SectionTitle>The Triune Brain</SectionTitle>
                    <SubTitleSm>Select a layer of the brain to explore further</SubTitleSm>
                    <br/>


                    <TitleLg>{brainData[selected].title}</TitleLg>
                    <p className='py-3'>{brainData[selected].description}</p>
                </div>
            </div>
            <div className='md:w-1/2 w-full p-2'>
                <TriuneBrain setState={setSelected}/>
            </div>
        </div>
    );
}

export default ProjectsBrain