import React, { useState,useEffect } from 'react';

import { fetchData } from '../../access/dba';

/* STYLESHEET IMPORTS */
import './projects.css'; //contains styles specific to the user page
import '../landing/landing.css'; //contains styles specific to the user page
import '../../components/content_sections.css'; //contains general container styles

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../../components/footer/footer';
import Modal from '../../components/modals/modal';
import { Profile } from '../people/people';


/** Header for the landing page
 * 
 * @returns 
 */
const ProjectsHeader = () => {
    return (
        <div className='projects-header'>
            <div>
                <p>Our Team's Projects and Collaborative Work</p>
            </div>
            <div>
                <p>Our collaborative projects inspire further expansion of our field and define new boundaries of our craft. Core values are what makes a team differentiable. Here are some of ours.</p>
            </div>
        </div>
    );
}

const Member = (args) => {
    const member_data = args.data.data.M

    const modal_content = (
        <div className='bg-white rounded overflow-hidden border-8 w-[100%]'>
            <Profile data={member_data}/>
        </div>
        
    );

    return (
        <div className='mini-profile' onClick={() => Modal(modal_content)}>
            <div>
                <img src={'./img/people/'+member_data.last.S.toLowerCase().replace("'","")+'.png'} alt={member_data.last.S}/>
            </div>
            <p>{member_data.first.S} {member_data.last.S}</p>
            <button>view profile</button>
        </div>
    )
}

const Project = (args) => {
    var project = args.data;
    return (
        <div className='project'>  
            <div>
                <p>{project.title.S}</p>
                <p>{project.data.M.description.S}</p>
            </div>
            <div>
                <p>Cluster Members</p>
                <div>
                    {
                        args.members.map((member,index) => {
                            return <Member key={index} data={member} />
                        })
                    }
                </div>
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
    order.map(order_by => {

        output.push(objects.filter(object => {return object.title.S === order_by.S})[0])
    })
    return output
}

/** Quote for the landing page
 * 
 * @returns 
 */
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
            <div className='project-container'>
                <p>Our Latest Projects</p>
                <div className='column-container'>
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


const PageSpaceRow = (args) => {
    return (
        <div className={'space-row '+args.spec}>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

function switch_content(section){
    const text = document.getElementById('triune-text');

    if(section === 'NEO'){
        document.getElementById('paleo-btn').classList.remove('selected');
        document.getElementById('rept-btn').classList.remove('selected');
        document.getElementById('neo-btn').classList.toggle('selected');
        text.innerHTML = "The crowning achievement of evolution is the development of the 6 layer neocortex that houses our ability to perceive, act, and reason with a high degree of cognitive abstraction. Sitting at the highest level of brain function, it exercises the power of speech and handles the facts and theory learning seen in higher education. Research also indicates that it tends to perceive itself as the source of all awareness often ignoring the functioning of lower brain systems that our defining quote from Pascale calls “heart reasons.”";
    }
    else if(section === 'PALEO'){
        document.getElementById('neo-btn').classList.remove('selected');
        document.getElementById('rept-btn').classList.remove('selected');
        document.getElementById('paleo-btn').classList.toggle('selected');
        text.innerHTML = "Sitting in the middle of the three brain levels, its limbic and motor systems generate the motivated actions required to preserve the body's health (feeding when hungry) and it gives pleasure and pain signals that can drive behavior (such as addiction). A tremendous amount of logic exists at this level, is largely outside awareness, but can guide decisions (e.g. in neuroeconomics). The integration of this “limbic logic” developed through direct experience (internships, etc.) with more cognitive classroom-based learning is the lab's main focus.";
    }
    else if(section === 'REPT'){
        document.getElementById('paleo-btn').classList.remove('selected');
        document.getElementById('neo-btn').classList.remove('selected');
        document.getElementById('rept-btn').classList.toggle('selected');
        text.innerHTML = "Lying at the bottom of the brain, it controls simple life-sustaining reflexes (such as breathing), as well as more complex patterns (e.g. lower motor control of walking).  It also mediates evolutionary encoded actions like eye-tracking (vs the primate brain which models the object's trajectory).  Although not much a subject of our lab's work, it nicely illustrates the principle of levels of function in the brain.";
    }
}

const ProjectBrainSection = () => {
    return (
        <div className='column-container triune-brain-container'>
            <div className='content-column'>
                <div className='triune-brain-detail'>
                    <p>The Triune Brain</p>
                    <div className='triune-brain-toggle'>
                        <button id='neo-btn' className='selected' onClick={() => switch_content('NEO')}>NEO</button>
                        <button id='paleo-btn' onClick={() => switch_content('PALEO')}>PALEO</button>
                        <button id='rept-btn' onClick={() => switch_content('REPT')}>REPTILIAN</button>
                    </div>
                    <p id='triune-text'>The crowning achievement of evolution is the development of the 6 layer neocortex that houses our ability to perceive, act, and reason with a high degree of cognitive abstraction. Sitting at the highest level of brain function, it exercises the power of speech and handles the facts and theory learning seen in higher education. Research also indicates that it tends to perceive itself as the source of all awareness often ignoring the functioning of lower brain systems that our defining quote from Pascale calls “heart reasons.”</p>
                </div>
            </div>
            <div className='content-column'>
                <div className='triune-brain'>
                    
                </div>
            </div>
        </div>
    );
}

/** Quote for the landing page
 * 
 * @returns 
 */
 const ProjectValuesSection = () => {
    return (

        <div className='project-container'>
            <p>Our lab group's core values</p>
            <div className='column-container'>
                <div className='project content-column'>  
                    <div>
                        <p>The Experiential Development of Professional Wisdom</p>
                        <p>Student development of "so-called" soft-skills, professional knowledge, entrepreneurship, and even wisdom through experiential education is seen as a natural progression with age and with experiential activities. This project examines how learning from experience in conjunction with a strong academic curriculum can develop expertise in a skill and thinking area. Knowing the modern view of neuroplasticity, it also looks at factors such as engagement that produce brain and behavioral changes. Knowing modern neuroscience, it looks at cognitive-emotional integration as below.</p>
                    </div>
                </div>
                <div className='project content-column'>  
                    <div>
                        <p>Cognitive-Emotional Brain Circuit Integration and Reflection</p>
                        <p>Reflection facilitates the integration of emotion with cognition in producing student maturity from experiential education. While focused on the neuroscience of brain areas and networks from brain scanner studies, this project also learns from other fields such as art/music, social psychology/sociology, philosophy, etc. A particular interest is in the two-way communication between unconscious (mammalian brain) and conscious (primate brain) decision-making brain circuits and its enhancement over time. We also are interested in parallels to mindfulness and growth mindset practices.</p>
                    </div>
                </div>
                <div className='project content-column'>  
                    <div>
                        <p>Diversity and inclusion</p>
                        <p>Using experiential education thinking to promote students taking agency in working with diverse groups of college students for a diverse world is the focus of this project. Several members of the lab recently produced a book on this topic, using student and alumni stories to illustrate basic social neuroscience principles of relevant unconscious decision-making. There is no question that diversity/inclusion generally is a compelling issue of our time inside and outside of the college experience and is an ongoing interest of the lab.</p>
                    </div>
                </div>
                <div className='project content-column'>  
                    <div>
                        <p>Engaged Teaching</p>
                        <p>Applying lessons from experiential education and the above projects, the goal here is to better reach, engage, and promote active learning in all classroom students, ranging from those who are passionate about the topic to those who may lack confidence or are otherwise less engaged. We are currently using a balanced hybrid, flipped-classroom teaching model with group work and continuous student feedback in an introductory psychology class that the lab director teaches every semester and which has research assistance from lab members.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


/**
 * 
 * @param {*} args 
 * @returns 
 */
const Projects = (args) => {
    return (
		<>
			<ProjectsHeader />
            <ProjectSection />
            <PageSpaceRow />
            <ProjectBrainSection />
            <PageSpaceRow spec={'switch-img-position-center'}/>
            <ProjectValuesSection />
            <PageSpaceRow />
            <Footer />
		</>
    );
}

export default Projects;