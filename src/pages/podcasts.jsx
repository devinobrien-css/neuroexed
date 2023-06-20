import { SectionTitle, TitleXl, Wrapper } from "../components/common.library";
import Header from "../components/header.component";



// const Podcast = ({ podcast }) => {

//     const [modal, setModal] = useState()
//     return (
//         <>
//             {
//                 modal ? (
//                     <div className="absolute w-full h-full flex flex-col top-0 left-0 bg-gray-800 bg-opacity-30 z-[10001]">
//                         <div className="w-3/5 p-8 my-auto mx-auto bg-white rounded relative">
//                             <button className="absolute top-4 right-4 bg-gray-300 rounded-lg p-2" onClick={() => setModal()}>close</button>
//                             <p className="text-lg font-bold font-lato">{podcast.title}</p>
//                             <p className="text-gray-600 font-light">{podcast.episode}</p>
//                             <p className="uppercase text-gray-500">{podcast.date}</p>
//                             <hr className="my-2" />
//                             <div className="md:flex gap-8">
//                                 <div className="md:w-1/2">
//                                     <p className="text-md font-bold font-lato">Description</p>
//                                     <p className="text-gray-800 font-light">{podcast.summary}</p>
//                                 </div>

//                                 <div>
//                                     <p className="text-md font-bold font-lato">Contributors</p>
//                                     {
//                                         podcast.contributors.map((person, index) => {
//                                             return <p key={index} className="text-gray-800 font-light">{person}</p>
//                                         })
//                                     }
//                                     <hr className="my-2" />
//                                     <p className="text-md font-bold font-lato">Keywords</p>
//                                     {
//                                         podcast.keywords.map((keyword, index) => {
//                                             return <p key={index} className="text-gray-800 font-light">{keyword}</p>
//                                         })
//                                     }
//                                 </div>
//                                 <div>
//                                     <audio controls>
//                                         <source src="horse.mp3" type="audio/mpeg" />
//                                     </audio>
//                                     <br />
//                                     <button className="font-lato rounded-xl p-3 bg-gray-100 text-center w-full">Read Transcript</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (<></>)
//             }
//             <div className="sm:w-4/5 sm:max-w-[420px] md:w-2/5 mx-auto my-4 bg-white rounded-lg p-3 hover:shadow-xl transition-all transform cursor-pointer"
//                 onClick={() => setModal(true)}
//             >
//                 <div>
//                     <hr />
//                     <div className="p-2">
//                         <p className="text-gray-600 font-light">{podcast.episode}</p>

//                         <p className="text-lg font-bold font-lato">{podcast.title}</p>

//                         <p className="uppercase text-gray-500">{podcast.date}</p>
//                         <hr />

//                         <div className="flex justify-end w-full pt-2">
//                             <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
//                                 <Icon icon="bx:headphone" width="25" className="" />
//                                 <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">listen</p>
//                             </div>

//                             <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
//                                 <Icon icon="material-symbols:ios-share-rounded" width="25" />
//                                 <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">share</p>
//                             </div>

//                             <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
//                                 <Icon icon="material-symbols:download-rounded" width="25" />
//                                 <p className="group-hover:opacity-100 group-hover:w-24 text-center group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">download</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// const fakeData = [
//     {
//         title: '4.4 Ricardo Torres, President and CEO, National Student Clearinghouse',
//         episode: 'S4:E4',
//         date: 'November 16, 2021',
//         summary: 'Ricardo Torres has been with the National Student Clearinghouse (NSC) for 27 years having earned a BS degree from Manhattan College and an MBA from Georgetown University.  Over that time the NSC has become a trusted partner for 3,600 colleges and universities and 17,000 high schools, creating unique pathways that can track the journeys of learners throughout their educational careers.  More recently, the NSC has become involved with the Learning and Employment Record (LER) that documents skills that could be useful to post-graduation employment or even further schooling. Here, the NFC works with the federal government, states, the National Governors Association, colleges and universities, and major corporations. This podcast reviews some of that work and the implications of an LER for universities, their students, and business. The idea of skills documentation, done right and ubiquitously, and done with modern technology has profound implications for all involved.  As Rick says at one point in the interview, it takes the friction out of that interaction.  And that builds a better outcome for all.',
//         contributors: [
//             "Jim Stellar",
//             "Adrienne Dooley",
//             "Mary Churchill",
//             "Ricardo Torres"
//         ],
//         keywords: [
//             'credentials',
//             'experiential education',
//             'highered',
//             'industry',
//             'university',
//             'college',
//             'skills'
//         ]
//     },
//     {
//         title: '4.3 John Cimino, President of Associated Solo Artists',
//         episode: 'S4:E3',
//         date: 'August 17, 2021'
//     },
//     {
//         title: '4.2 Karsten Zegwaard, The University of Waikato',
//         episode: 'S4:E2',
//         date: 'May 4, 2021'
//     },
//     {
//         title: '4.1 Ken Smith, Jobs for America\'s Graduates',
//         episode: 'S4:E1',
//         date: 'March 16, 2021'
//     },
//     {
//         title: '3.3 Alex Johnson, Massachusetts General Hospital Institute of Health Professions',
//         episode: 'S3:E3',
//         date: 'January 26, 2021'
//     }
// ]

/** Podcasts page
 * @param {*} args
            * @returns
            */
const Podcasts = (args) => {
    const s4urls = [
        'https://player.simplecast.com/8942ca9d-6218-4e6f-9f8c-a520f45afabd?dark=false',
        'https://player.simplecast.com/a8711359-f80f-4d41-b4d8-ff7ce582c84f?dark=false',
        'https://player.simplecast.com/98a3aa39-446d-4c52-bd66-c7991441a8d4?dark=false',
        'https://player.simplecast.com/a8963523-2ba7-4ca9-bef5-88db7b61517b?dark=false',
    ]

    const s3urls = [
        'https://player.simplecast.com/d69df545-1382-4b0a-9366-35e3d2e9a792?dark=false',
        'https://player.simplecast.com/5279ba05-b4ab-4ed6-800a-a445bc474c9d?dark=false',
        'https://player.simplecast.com/fec441ee-ebba-49cc-a2a0-cc128cc33e6f?dark=false'
    ]

    const s2urls = [
        'https://player.simplecast.com/2694dcab-0b13-4c19-a704-3c3ae89b8169?dark=false',
        'https://player.simplecast.com/f1e4c1a9-00ec-4258-863c-59cf56cfde40?dark=false',
        'https://player.simplecast.com/9a903507-cdbb-4587-8b10-2babbd74aae0?dark=false',
        'https://player.simplecast.com/12c5cb29-448b-4ba2-861a-1d37f65b1ea5?dark=false',
    ]

    const s1urls = [
        'https://player.simplecast.com/89cb10cd-26d1-4ddf-b6f2-75841469bad8?dark=false',
        'https://player.simplecast.com/61bb8bf2-d39b-4e41-bc0d-3517dd3dfc16?dark=false',
        'https://player.simplecast.com/e26ff0a0-c98a-4724-80b5-d29f0ffd85ee?dark=false',
        'https://player.simplecast.com/8c8e849c-fd39-4c78-b768-fdd079f3620e?dark=false'
    ]
    return (
        <>
            <Header
                content="ExperiencED Podcast"
                subtext='Thia podcast explores the process of learning from a direct experience in all of its forms.'
            />

            <Wrapper color='light'>
                <SectionTitle>Episodes</SectionTitle>
                <br />
                {/* <div className="md:flex">
                    <div className="transition-all w-full sm:w-1/2 md:w-1/4 flex justify-between bg-white shadow">
                        <p className="my-auto ml-4">
                            Apply a Filter
                        </p>
                        <div className="bg-gray-300 p-3">
                            <Icon icon="material-symbols:filter-list-rounded" width="30" className="my-auto" />
                        </div>
                    </div>

                    <div className="transition-all w-full sm:w-1/2 md:w-1/4 flex justify-between md:ml-4 md:mt-0 mt-4 bg-white shadow">
                        <p className="my-auto ml-4">
                            Search
                        </p>
                        <div className="p-3">
                            <Icon icon="ph:magnifying-glass-duotone" width="30" className="my-auto" />
                        </div>
                    </div>
                </div> */}
            </Wrapper>

            <Wrapper  color='light'>
                <div>
                    <TitleXl>Season 4</TitleXl>
                    <br/>
                    <div className="flex flex-wrap">
                    {
                        s4urls.map((url,index) => {
                            return <iframe title={index} height="200px" width="100%" frameborder="no" scrolling="no" seamless src={url}></iframe>

                        })
                    }
                    </div>
                </div>
                <br/>
                <br/>
                <div>
                    <TitleXl>Season 3</TitleXl>
                    <br/>
                    <div className="flex flex-wrap">
                    {
                        s3urls.map((url,index) => {
                            return <iframe title={index} height="200px" width="100%" frameborder="no" scrolling="no" seamless src={url}></iframe>

                        })
                    }
                    </div>
                </div>
                <br/>
                <br/>
                <div>
                    <TitleXl>Season 2</TitleXl>
                    <br/>
                    <div className="flex flex-wrap">
                    {
                        s2urls.map((url,index) => {
                            return <iframe title={index} height="200px" width="100%" frameborder="no" scrolling="no" seamless src={url}></iframe>

                        })
                    }
                    </div>
                </div>
                <br/>
                <br/>
                <div>
                    <TitleXl>Season 1</TitleXl>
                    <br/>
                    <div className="flex flex-wrap">
                    {
                        s1urls.map((url,index) => {
                            return <iframe title={index} height="200px" width="100%" frameborder="no" scrolling="no" seamless src={url}></iframe>

                        })
                    }
                    </div>
                </div>
            </Wrapper>

        </>
    );
}

export default Podcasts;