import React, { useState,useEffect } from 'react';
import { fetchData } from '../access/dba';
import Footer from '../components/footer.component';
import Modal from '../components/modals/modal';
import { Profile } from './people';
import Header from '../components/header.component';

const Member = (args) => {
    const member_data = args.data.data.M

    return (
        <div className=' mx-4 min-w-[140px] bg-white rounded p-2 shadow border flex flex-col justify-between' 
            onClick={() => Modal(
                <div className='bg-white rounded overflow-hidden w-[100%]'>
                    <Profile data={member_data}/>
                </div>
            )}>
            <img 
                className='w-16 rounded mx-auto'
                src={`https://neuro-exed-images.s3.us-east-1.amazonaws.com/profile_pictures/${member_data.last.S.toLowerCase().replace("'","")}.png`} 
                alt={member_data.last.S.toLowerCase()}
            />
            <div>
                <p className='text-center mx-auto'>{member_data.first.S} {member_data.last.S}</p>
                <button className='underline text-blue-300 text-center mx-auto block'>view profile</button>
            </div>
        </div>
    )
}

const Project = (args) => {
    var project = args.data;
    return (
        <div className='md:w-[45%] my-4 mx-auto bg-white shadow-lg rounded border p-4 flex flex-col justify-between'>  
                <p className='text-2xl'>{project.title.S}</p>
                <p>{project.data.M.description.S}</p>
                <p className='text-2xl mt-4'>Cluster Members</p>
                <div className='flex overflow-x-scroll'>
                    {
                        args.members.map((member,index) => {
                            return <Member key={index} data={member} />
                        })
                    }
                </div>
        </div>
    )
}

const ProjectList = (args) => {
    var all_projects = args.data;

    const [people, setPeople] = useState();
    const getPeople = async () => {
        const res = await fetchData('people')
        setPeople(res.Items);
    };
    useEffect(() => {
        getPeople();
    }, []);

    if(people){
        var output = [];
        all_projects.forEach((project,index) => {
            const project_members = people.filter(
                person => (
                    project.data.M.members.L.filter(
                        potential_member => (
                            potential_member.M.email.S === person.email.S
                            )).length === 1))

            output.push(<Project key={index} data={project} members={project_members}/>)
        })
        return output;
    }
    else {
        return <></>
    }
}

function orderJsonObjects(order,objects){
    const output = []
    order.forEach(order_by => {
        output.push(objects.filter(object => {return object.title.S === order_by.S})[0])
    })
    return output
}

 const ProjectSection = () => {
    const [projects, setProjects] = React.useState();
    const getProjects = async () => {
        const res = await fetchData('projects');
        const sort = await fetchData('sort_orders')

        if(sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L.length !== 0)
            setProjects(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L,res.Items));
        else
            setProjects(res.Items)
    };

    useEffect(() => {
        getProjects();
    }, []);

    if(projects){
        return (
            <div className='p-4 shadow-xl border bg-cover bg-light-hex'>
                <p className='text-6xl font-light'>Our Latest Projects</p>
                <div className='md:flex flex-wrap'>
                    <ProjectList data={projects} />
                </div>
            </div>
        );
    }
    else {
        return (
            <></>
        );
    }
}

const brainData = {
    'NEO':"The crowning achievement of evolution is the development of the 6 layer neocortex that houses our ability to perceive, act, and reason with a high degree of cognitive abstraction. Sitting at the highest level of brain function, it exercises the power of speech and handles the facts and theory learning seen in higher education. Research also indicates that it tends to perceive itself as the source of all awareness often ignoring the functioning of lower brain systems that our defining quote from Pascale calls “heart reasons.”",
    'PALEO':"Sitting in the middle of the three brain levels, its limbic and motor systems generate the motivated actions required to preserve the body's health (feeding when hungry) and it gives pleasure and pain signals that can drive behavior (such as addiction). A tremendous amount of logic exists at this level, is largely outside awareness, but can guide decisions (e.g. in neuroeconomics). The integration of this “limbic logic” developed through direct experience (internships, etc.) with more cognitive classroom-based learning is the lab's main focus.",
    'REPT':"Lying at the bottom of the brain, it controls simple life-sustaining reflexes (such as breathing), as well as more complex patterns (e.g. lower motor control of walking).  It also mediates evolutionary encoded actions like eye-tracking (vs the primate brain which models the object's trajectory).  Although not much a subject of our lab's work, it nicely illustrates the principle of levels of function in the brain."
}

const ProjectBrainSection = () => {
    const [selected,setSelected] = useState('NEO')

    return (
        <div className='md:flex flex-wrap justify-between my-8'>
            <div className='md:w-1/2'>
                <div className='bg-light-hex bg-cover bg-no-repeat bg-bottom p-4 border shadow rounded-lg'>
                    <p className='text-6xl font-light'>The Triune Brain</p>
                    <div className='border shadow rounded-lg overflow-clip'>
                        <button 
                            className={`w-1/3 transition-all ${(selected==="NEO")?"bg-gray-100":" bg-gray-300"}`} 
                            onClick={() => setSelected('NEO')}
                        
                        >NEO</button>
                        <button 
                            className={`w-1/3 transition-all ${selected==="PALEO"?"bg-gray-100":" bg-gray-300"}`} 
                            onClick={() => setSelected('PALEO')}
                        
                        >PALEO</button>
                        <button 
                            className={`w-1/3 transition-all ${selected==="REPT"?"bg-gray-100":" bg-gray-300"}`} 
                            onClick={() => setSelected('REPT')}
                        
                        >REPTILIAN</button>
                    </div>
                    <p className='py-3'>
                        {
                            brainData[selected]
                        }
                    </p>
                </div>
            </div>
            <div className='md:w-1/2 w-full'>
                <div className='bg-triune bg-contain h-full min-h-[200px] bg-no-repeat bg-center border shadow rounded-lg ml-4'>
                    
                </div>
            </div>
        </div>
    );
}

 const ProjectValuesSection = () => {
    return (

        <div className='p-4 shadow-xl border bg-cover bg-bottom bg-light-hex'>
            <p className='text-6xl font-light'>Our lab group's core values</p>
            <div className='md:flex flex-wrap'>
                <div className='w-full md:w-[45%] shadow-lg mx-auto bg-white p-4 bg-opacity-90 my-4 rounded border'>  
                    <p className='text-3xl'>The Experiential Development of Professional Wisdom</p>
                    <p>Student development of "so-called" soft-skills, professional knowledge, entrepreneurship, and even wisdom through experiential education is seen as a natural progression with age and with experiential activities. This project examines how learning from experience in conjunction with a strong academic curriculum can develop expertise in a skill and thinking area. Knowing the modern view of neuroplasticity, it also looks at factors such as engagement that produce brain and behavioral changes. Knowing modern neuroscience, it looks at cognitive-emotional integration as below.</p>
                </div>
                <div className='w-full md:w-[45%] shadow-lg mx-auto bg-white p-4 bg-opacity-90 my-4 rounded border'>  
                    <p className='text-3xl'>Cognitive-Emotional Brain Circuit Integration and Reflection</p>
                    <p>Reflection facilitates the integration of emotion with cognition in producing student maturity from experiential education. While focused on the neuroscience of brain areas and networks from brain scanner studies, this project also learns from other fields such as art/music, social psychology/sociology, philosophy, etc. A particular interest is in the two-way communication between unconscious (mammalian brain) and conscious (primate brain) decision-making brain circuits and its enhancement over time. We also are interested in parallels to mindfulness and growth mindset practices.</p>
                </div>
                <div className='w-full md:w-[45%] shadow-lg mx-auto bg-white p-4 bg-opacity-90 my-4 rounded border'>  
                    <p className='text-3xl'>Diversity and inclusion</p>
                    <p>Using experiential education thinking to promote students taking agency in working with diverse groups of college students for a diverse world is the focus of this project. Several members of the lab recently produced a book on this topic, using student and alumni stories to illustrate basic social neuroscience principles of relevant unconscious decision-making. There is no question that diversity/inclusion generally is a compelling issue of our time inside and outside of the college experience and is an ongoing interest of the lab.</p>
                </div>
                <div className='w-full md:w-[45%] shadow-lg mx-auto bg-white p-4 bg-opacity-90 my-4 rounded border'>  
                    <p className='text-3xl'>Engaged Teaching</p>
                    <p>Applying lessons from experiential education and the above projects, the goal here is to better reach, engage, and promote active learning in all classroom students, ranging from those who are passionate about the topic to those who may lack confidence or are otherwise less engaged. We are currently using a balanced hybrid, flipped-classroom teaching model with group work and continuous student feedback in an introductory psychology class that the lab director teaches every semester and which has research assistance from lab members.</p>
                </div>
            </div>
        </div>
    );
}

const Projects = (args) => {
    return (
		<>
            <Header 
                content={"Our Team's Projects and Collaborative Work"} 
                subtext={"Our collaborative projects inspire further expansion of our field and define new boundaries of our craft. Core values are what makes a team differentiable. Here are some of ours."}
            />
            <ProjectSection />
            <ProjectBrainSection />
            <ProjectValuesSection />
            <Footer />
		</>
    );
}
export default Projects;