import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../access/dba';
import { Wrapper } from '../components/common.library';

/* COMPONENT AND ELEMENT IMPORTS */
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import { ScrollLoader } from '../components/loaders.library';

const StellarSection = () => {
    const [state,setState] = useState(false)

    return (
        <div className='p-4 shadow-xl border bg-cover bg-light-hex transition-all bg-no-repeat my-6 rounded-xl'>
            <p className='text-6xl font-light'>Our Lab Director, James Stellar</p>
            <div 
                className={`border mt-8 w-full  group shadow p-2 mx-auto transition-all hover:shadow-xl my-2 flex flex-col justify-between bg-white ${(state?"w-full":"md:w-1/2")}`}
            >
                <div className='flex flex-wrap'>
                <div 
                    className='group-hover:border-8 rounded-lg overflow-hidden border-double border-4 shadow-lg mx-auto  w-32 md:mx-0 h-min border-blue-300 transition-all '
                >
                    <img src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/stellar.png`} alt="James Stellar" />
                </div>
                <div className='pl-2 w-full md:w-3/5 flex flex-col justify-between'>
                    <p className="font-light text-4xl md:text-4xl w-full  mb-2 transition-all md:text-left text-center"> Dr. James Stellar</p>
                    <p className='italic text-gray-600 md:text-xl md:text-left text-center border-t-8 border-double border-gray-400'>Member since 2015</p>
                </div>

            </div>
                <div>
                    <button 
                        className="text-blue-500 block mx-auto underline"
                        onClick={() => {state?setState(false):setState(true)}}
                    >
                        {state?"close description":"read description"}
                    </button>
                    {state?
                        <div>
                            <p className='text-2xl font-light'>Momentous beginnings..</p>
                            <p  className='text-justify mb-4'> 
                                Stellar's career began as a basic neuroscientist, trained at the <b>University of Pennsylvania</b> as a PhD and postdoctoral fellow, and then appointed as an assistant and associate (untenured professor) at the <b>Department of Psychology at Harvard University</b>. In 1985 he wrote a book, <i>The Neurobiology of Motivation and Reward</i>, with his father, Eliot Stellar, also a neuroscience professor who had then returned to the faculty after serving as Provost at the <b>University of Pennsylvania</b>. In 1986, J. Stellar moved to <b>Northeastern University</b> in Boston, keeping his continuing research affiliation at McLean Hospital. His laboratory research focused on the dopamine brain systems in laboratory rats, beginning with studies of <i>rewarding electrical stimulation of the brain and then moving into cocaine research with an additional focus on craving from a behavioral, neuroanatomical, and molecular genetic change perspective </i>
                            </p>

                            <p className='text-2xl font-light'>Evolving his career..</p>
                            <p  className='text-justify mb-4'> 
                                Stellar's senior administrative career began in 1998 as Dean of the large <b>College of Arts and Sciences at Northeastern University</b>, during the period of a remarkable rise in university ranking (US News - from 165 to eventually in the 40s) and in college applications (tripling to 15,000 with an attendant 250 point Freshman SAT increase). Given his long-term interest in working with and even hiring his own undergraduates as laboratory research assistants and given his leadership in a cooperative education university, it was only natural that he would take an interest in <i>how learning from experience worked to transform the students and the university itself</i>. This interest was expressed through the <b>World Association of Cooperative Education (WACE)</b>, where he co-founded and co-directed their <b>Experiential Education Planning Institute</b> that for over 13 years worked with nearly 100 universities which developed institutional <i>Experiential Education Plans</i>. In 2008, he made a transition to administration in the public university as Provost at <b>Queens College CUNY</b> and then again as Provost at <b>University at Albany SUNY</b>. He also served at UAlbany as Interim President for an academic year before returning to the Provost position and then finally going back to the faculty as a Professor in the <b>Department of Psychology</b>. 
                            </p>

                            <p className='text-2xl font-light'>Reflecting on his neuroscience passion and work..</p>
                            <p  className='text-justify mb-4'> 
                                The union of Stellar's administrative career with his earlier work in basic neuroscience was reflected in his 2017 book, <i>Education that Works: The Neuroscience of Building a more Effective Higher Education (IdeaPress)</i>. The influence of the diversity mission at the public university is seen in a 2020 multi-authored book that he and recent college graduates have just produced, <i>Diversity at College: Real Stories of Students Conquering Bias and Making Higher Education More Inclusive</i>, from the same publisher. That basic union of behavioral neuroscience and combined learning from classic academics and direct experience remains the focus of this new virtual laboratory of students and colleagues that we are calling the <b>Center for Neuroscience and Experiential Education</b>.  It is reflected in Stellar's blog and podcast and in new projects on teaching for engagement and the neuroscience of how professional knowledge and even wisdom develops with experiential learning.
                            </p>

                            <p className='text-2xl font-light'>What's going on today..</p>
                            <p className='text-justify mb-4'> 
                                Stellar teaches courses on introductory psychology (with an active engagement approach borrowed from experiential education), psychopharmacology, and seminars on cognitive-limbic integration in making decisions. He works with universities, companies, institutes, consulting firms, and cooperative education societies (e.g. WACE).
                            </p>
                        </div>
                    :<></>}
                </div>
                
            </div>
        </div>
    )
}

export const Profile = (args) => {
    var data = args.data;
    const [state,setState] = useState(false)
    const socials = ['email','twitter','instagram','linkedin']
    
    return (
        <div 
            className={'my-4 w-11/12 group shadow-std mx-auto transition-all hover:shadow-xl flex flex-col justify-between min-h-[300px] bg-white  rounded-xl overflow-hidden ' + (state ? 'bg-opacity-90' : 'bg-opacity-60')}
        >
            <div className='flex flex-wrap'>
                <div className='h-24 w-full bg-hex bg-cover bg-no-repeat'>

                </div>
                <div 
                    className='group-hover:border-8 rounded-lg overflow-hidden border-double border-4 shadow-lg mx-auto  w-32 -mt-16 h-min border-blue-300 transition-all '
                >
                    <img src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${data["last"].S.toLowerCase().replace("'","")}.png`} alt={`Lab Member ${data["first"].S} ${data["last"].S}`} />
                </div>
            </div>
            <p className="font-light text-4xl w-full  mb-2 transition-all text-center mx-auto">{data['first'].S} {data['last'].S}</p>
            <div className='border-t-8 border-double border-gray-400 h-24'>
                <p className='italic text-gray-600 md:text-xl text-center'>Member since {data['year_joined'].S}</p>
                <p className='italic text-gray-600 md:text-lg text-center'>{data['lab_title'].S}</p>
            </div>
            <div>
                <div className=' border-t-2 border-b-2 my-1 py-1'>
                    <div className='flex m-auto w-4/5'>
                        {socials.map(social => {
                            if(data.socials.M[social].S !== ""){
                                return (
                                    <a 
                                        className='w-8 m-auto cursor-pointer hover:scale-110 transition-all'
                                        rel='noreferrer'
                                        target='_blank'
                                        href={(social === 'email' ? "mailto:" : "") + data.socials.M[social].S}
                                    >
                                        <img 
                                            alt={`headshot of ${social}`}
                                            src={`./img/social_logos/${social}.png`}
                                            className='rounded-lg block shrink-0 bg-blue-300'
                                        />
                                    </a>
                                )
                            }
                            else {
                                return <></>
                            }
                        })}
                    </div>
                </div>
                <div>
                    <button 
                        onClick={() => {
                            state?setState(false):setState(true)
                        }}
                        className="text-blue-500 block mx-auto underline p-2"    
                    >
                        {state?"close description":"read description"}
                    </button>
                    <p className={`transition-all  ${state?"h-48 overflow-scroll p-2":"p-0 h-0 overflow-hidden"}`}>{data['description'].S }</p>
                </div>
            </div>
        </div>
    )
}

function orderJsonObjects(order,objects){
    const output = []
    order.forEach(order_by => {
        output.push(objects.filter(object => {return object.email.S === order_by.S})[0])
    })
    return output
}

/** Fetches perople data, renders list of members
 * @returns 
 */
const PeopleSection = () => {
    const [search,setSearch] = useState("")
    const [loading,setLoading] = useState()
        
    const [people, setPeople] = useState();
    const getPeople = async () => {
        setLoading(true)
        const sort = await fetchData('sort-orders')
        const res = await fetchData('people')

        if(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.length !== 0)
            setPeople(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L,res.Items));
        else
            setPeople(res.Items)
        setLoading(false)
        
    };

    useEffect(() => {
        getPeople();
    }, []);

    return (
        <div 
            className='p-4 shadow-xl shadow-gray-400 bg-cover mb-4 bg-light-hex bg-no-repeat rounded-xl'
        >
            <p className='text-6xl font-light mb-4'>Our Lab Members</p>
            <div className='flex flex-col items-center'>
                <div className='flex shadow p-2 rounded-xl w-1/3'>
                    <Icon icon="fa6-solid:magnifying-glass" className='my-auto text-gray-500'/>
                    <input  className='text-xl ml-2 outline-none text-gray-500' placeholder={`Search for members...`} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div>
            <div className='flex flex-wrap'>
                {loading?(
                    <div className='flex flex-col items-center w-full min-h-[400px]'>
                        <ScrollLoader className="my-auto" />
                    </div>
                ):(
                    people?.filter(member => member.data.M.first.S.toLowerCase().includes(search) || member.data.M.last.S.toLowerCase().includes(search))
                    .map((member,index) => {
                        return (
                            <div className='w-full lg:w-1/2 xl:w-1/2'>
                                <Profile key={index} data={member.data.M}/>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}


/**
 * 
 * @param {*} args 
 * @returns 
 */
const People = (args) => {
    return (
		<>
			<Header
                content='The Stellar Research Lab, an interdisciplinary team of neuroscience enthusiasts'
                subtext='With distinguished, oftentimes non-neuroscientist backgrounds, the lab approaches topics from nontraditional points of view to compose unique content for the fellow curious mind.'
            />
            <StellarSection />
            <Wrapper>
                <br/>
            </Wrapper>
            <PeopleSection />
            <Footer />
		</>
    );
}

export default People;