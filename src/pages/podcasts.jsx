import { useEffect, useState } from "react";
import { SectionTitle, TitleXl, Wrapper } from "../components/common.library";
import Header from "../components/header.component";
import { fetchData } from "../access/dba";
import { Icon } from "@iconify/react";



const Podcast = ({ podcast }) => {
    console.log(podcast)

    const [modal, setModal] = useState()
    const [transcript, setTranscript] = useState()
    return (
        <>
            {
                modal ? (
                    transcript? (
                        <div className="absolute w-full h-full flex flex-col top-0 left-0 bg-gray-800 bg-opacity-30 z-[10001]">
                            <div className="w-3/5 p-8 my-auto mx-auto bg-white rounded relative space-y-4">
                                <p className="text-gray-600 font-light text-xl mx-auto block text-center">{podcast.season.S}.{podcast.episode.S} <span className="md:text-4xl text-lg font-bold font-lato text-black">{podcast.title.S}</span></p>

                                <audio controls id="download-me" className="mx-auto">
                                    <source src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/podcasts/${podcast.season.S}.${podcast.episode.S}`} type="audio/mpeg" />
                                </audio>
                                <button className="absolute top-4 left-4 bg-gray-300 rounded-lg p-2" onClick={() => setTranscript()}>back</button>
                                <p className="h-96 overflow-scroll">{podcast.transcript.S}</p>
                            </div>
                        </div>
                    ):(
                        <div className="absolute w-full h-full flex flex-col top-0 left-0 bg-gray-800 bg-opacity-30 z-[10001]">
                            <div className="w-3/5 p-8 my-auto mx-auto bg-white rounded relative">
                                <button className="absolute top-4 right-4 bg-gray-300 rounded-lg p-2" onClick={() => setModal()}>close</button>
                            
                                <p className="text-gray-600 font-light">{podcast.season.S}.{podcast.episode.S} <span className="text-xl font-bold font-lato text-black">{podcast.title.S}</span></p>
                                <p className="uppercase text-gray-500">{podcast.date.S}</p>
                                <hr className="my-2" />
                                <div className="md:flex gap-8">

                                    <div className="md:w-1/2">
                                        <p className="text-md font-bold font-lato">Description</p>
                                        <p className="text-gray-800 font-light">{podcast.summary?.S}</p>
                                        <hr className="my-2" />
                                        <p className="text-md font-bold font-lato">Contributors</p>
                                        <div>
                                            {
                                                podcast.contributors?.L.map((person, index) => {
                                                    return <p key={index} className="text-gray-800 font-light">{person.S}</p>
                                                })
                                            }
                                        </div>
                                        <hr className="my-2" />
                                        <p className="text-md font-bold font-lato">Keywords</p>
                                        <div>
                                            {/* {
                                                podcast.keywords.map((keyword, index) => {
                                                    return <p key={index} className="text-gray-800 font-light">{keyword}</p>
                                                })
                                            } */}
                                        </div>
                                    </div>

                                    <div>
                                        <audio controls id="download-me">
                                            <source src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/podcasts/${podcast.season.S}.${podcast.episode.S}`} type="audio/mpeg" />
                                        </audio>
                                        <br />
                                        <button className="font-lato rounded-xl p-3 bg-gray-100 text-center w-full" onClick={()=>setTranscript(true)}>Read Transcript</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ) : (<></>)
            }
            <div className="mx-auto my-4 bg-white border-b-2 border-t-2 p-3 hover:shadow-xl transition-all transform cursor-pointer">
                <div>
                    <hr />
                    <div className="p-2">
                        <div className="flex">
                            <div className="w-full">
                                <p className="text-gray-600 font-light text-4xl">{podcast.season.S}.{podcast.episode.S} <span className="text-xl font-normal font-lato text-black">{podcast.title.S}</span></p>
                                <p className=" text-gray-500 font-sans font-light text-lg italic">Released on {new Date(podcast.date.S).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-between w-1/4  my-auto h-full">
                                <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group"
                                    onClick={() => setModal(true)}
                                >
                                    <Icon icon="bx:headphone" width="25" className="" />
                                    <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">listen</p>
                                </div>

                                <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
                                    <Icon icon="material-symbols:ios-share-rounded" width="25" />
                                    <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">share</p>
                                </div>

                                <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group"
                                    onClick={(e)=> {
                                        setModal(false)
                                        e.preventDefault()
                                        const link = document.createElement('a');
                                        link.href = `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/podcasts/${podcast.season.S}.${podcast.episode.S}`;
                                        link.download = `${podcast.title.S}.mp3`; // Set the desired file name
                                        
                                        // Trigger the download
                                        link.click();
                                    }}
                                >
                                    <Icon icon="material-symbols:download-rounded" width="25" />
                                    <p 
                                        className="group-hover:opacity-100 group-hover:w-24 text-center group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded"
                                    >download</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <p className="text-gray-500">{podcast.summary.S}</p>
                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
}

/** Podcasts page
 * @param {*} args
            * @returns
            */
const Podcasts = (args) => {

    const [podcasts, setPodcasts] = useState();
    const getPodcasts = async () => {
        const res = await fetchData('podcasts');

        if(res === "ERROR"){
            setPodcasts([]);
        }
        else
            setPodcasts(res.Items)
    };

    useEffect(() => {
        getPodcasts();
    }, []);

    console.log(podcasts)

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
                <TitleXl>Season 1</TitleXl>
                {
                    podcasts?.filter(podcast => Number(podcast.season.S) === 1)
                    .sort((a,b) => Number(a.data.M.episode.S) - Number(b.data.M.episode.S))
                    .map((podcast) => {
                        console.log(podcast)
                        return (
                            <Podcast podcast={podcast.data.M} />
                        )
                    })
                }
            </Wrapper>

        </>
    );
}

export default Podcasts;