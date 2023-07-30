import React, { useEffect, useState } from 'react';

import { podcast, post } from '../../../schema/object_schema';
import { fetchData,putData,removeData, uploadFileToBucket } from '../../../access/dba';

/* STYLESHEET IMPORTS */
import '../admin.css'; //contains styles specific to the user page
import '../../../components/content_sections.css'; //contains general container styles
import StandardInput from '../components/StandardInput.component';
import StandardTextArea from '../components/StandardTextArea.component';

const NewPodcast = (args) => {

    const [state,setState] = useState(true)

    const [title,setTitle] = useState("")
    const [season,setSeason] = useState("")
    const [episode,setEpisode] = useState("")
    const [date,setDate] = useState("")
    const [transcript,setTranscript] = useState("")
    const [summary,setSummary] = useState("")
    const [imageUpload,setImageUpload] = useState("")
    const [contributors, setContributors] = useState([]);

    const handleInputChange = (index, event) => {
        const newStrings = [...contributors];
        newStrings[index] = event.target.value;
        setContributors(newStrings);
    };

    const handleAddString = () => {
        const newStrings = [...contributors];
        newStrings.push('');
        setContributors(newStrings);
    };

    const handleRemoveString = (index) => {
        const newStrings = [...contributors];
        newStrings.splice(index, 1);
        setContributors(newStrings);
    };
    
    return (
        <div className='editable selected-editable' id={'new-post'}>
            <div>
                <p>{season}{(season && episode) ? '.' : ''}{episode} {title}</p>
                <div className='edit-buttons'>
                    <button 
                        className='browser-btn' 
                        onClick={
                            () => {
                                if(state)
                                    args.remove(false)
                                
                                state ? 
                                setState(false) 
                                : setState(true)
                            }
                        }
                    >
                        {state ? "cancel" : "edit"}
                    </button>
                    {
                        state ? 
                        <>
                            <button 
                                className='browser-btn'
                                onClick={
                                    () => {
                                        const contributorList = contributors.map(contributor => {
                                            return {
                                                'S':contributor
                                            }
                                        });
                                        putData(
                                            'podcasts',
                                            {},
                                            podcast(
                                                title,
                                                episode,
                                                season,
                                                date,
                                                transcript,
                                                summary,
                                                contributorList
                                            )
                                        )

                                        if(imageUpload){
                                            const fileName = `${season}.${episode}.png`
                                            uploadFileToBucket('podcasts',fileName, imageUpload)
                                        }

                                        setState(false)
                                    }    
                                } 
                            >confirm</button> 
                            <button 
                                className='browser-btn'
                                onClick={
                                    async () => {
                                        // await removeData('podcasts',{
                                        //     'title':{'S':title}
                                        // })
                                        setState(false)
                                        args.remove(false)
                                    }    
                                } 
                            >cancel</button> 
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
                <StandardInput 
                    title={"Title"}
                    className={'border px-2'}
                    value={title}
                    setValue={setTitle}
                />
                <hr/>
                <StandardInput 
                    title={"Season"}
                    type='number'
                    className={'border px-2'}
                    value={season}
                    setValue={setSeason}
                />
                <hr/>
                <StandardInput 
                    title={"Episode Number"}
                    type='number'
                    className={'border px-2'}
                    value={episode}
                    setValue={setEpisode}
                />
                <hr/>
                <StandardInput 
                    title={"Date"}
                    type='date'
                    className={'border px-2'}
                    value={date}
                    setValue={setDate}
                />
                <hr/>
                <div
                    className={'border-2 px-2'}
                >
                    <p className="text-gray-500">Audio File</p>
                    <input 
                        className="block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                        type="file" 
                        accept=".mp3,audio/*"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">accepts .mp3</p>
                </div>
                <hr/>
                <StandardTextArea 
                    title={"Transcript"}
                    className={'border px-2'}
                    value={transcript}
                    setValue={setTranscript}
                />
                <StandardTextArea 
                    title={"Summary"}
                    className={'border px-2'}
                    value={summary}
                    setValue={setSummary}
                />
                <div
                    className={'border-2 p-2'}
                >
                    <div className='flex justify-between'>
                        <p className="text-gray-500">Contributors</p>
                        <button className='browser-btn' onClick={handleAddString}>Add Contributor</button>
                    </div>
                    <div>
                        {
                            contributors.map((contributor,index) => {
                                return (
                                    <div
                                        className={`md:flex justify-between border-t`}
                                    >
                                        <label
                                            className="w-3/12 text-gray-500"
                                        >
                                            Name
                                        </label>
                                        
                                        <input
                                            id='contributor-input'
                                            name={title}
                                            value={contributor}
                                            onChange={(e) => handleInputChange(index,e)}
                                            autoComplete="false"
                                            placeholder={'Enter contributor'}
                                            className="w-full border-0 md:border-gray-300 md:border-l md:pl-2"
                                        />
                                        <button className='browser-btn' onClick={handleRemoveString}>X</button>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <hr/>

            </div>
        </div>
    )
}

const EditablePodcast = (args) => {
    const [state,setState] = useState(false)

    const [title,setTitle] = useState(args.title)
    const [season,setSeason] = useState(args.data.season.S)
    const [episode,setEpisode] = useState(args.data.episode.S)
    const [date,setDate] = useState(args.data.date.S)
    const [transcript,setTranscript] = useState(args.data.transcript.S)
    const [summary,setSummary] = useState(args.data.summmary?.S ?? '')
    const [imageUpload,setImageUpload] = useState("")
    const [contributors, setContributors] = useState(args.data.contributors?.L.map(item => item.S) ?? []);

    const handleInputChange = (index, event) => {
        const newStrings = [...contributors];
        newStrings[index] = event.target.value;
        setContributors(newStrings);
    };

    const handleAddString = () => {
        const newStrings = [...contributors];
        newStrings.push('');
        setContributors(newStrings);
    };

    const handleRemoveString = (index) => {
        const newStrings = [...contributors];
        newStrings.splice(index, 1);
        setContributors(newStrings);
    };
    
    return (
        <div className='editable selected-editable' id={args.id}>
            <div>
                <p>{title}</p>
                <div className='edit-buttons'>
                    <button 
                        className='browser-btn' 
                        onClick={
                            () => {
                                if(state)
                                    args.remove(false)
                                
                                state ? 
                                setState(false) 
                                : setState(true)

                                
                            }
                        }
                    >
                        {state ? "cancel" : "edit"}
                    </button>
                    {
                        state ? 
                        <>
                            <button 
                                className='browser-btn'
                                onClick={
                                    () => {
                                        console.log(contributors)
                                        const contributorList = contributors.map(contributor => {
                                            return {
                                                'S':contributor
                                            }
                                        });
                                        putData(
                                            'podcasts',
                                            {},
                                            podcast(
                                                title,
                                                episode,
                                                season,
                                                date,
                                                transcript,
                                                summary,
                                                contributorList
                                            )
                                        )

                                        if(imageUpload){
                                            const fileName = `${season}.${episode}.png`
                                            uploadFileToBucket('podcasts',fileName, imageUpload)
                                        }

                                        setState(false)
                                    }    
                                } 
                            >confirm</button> 
                            <button 
                                className='browser-btn'
                                onClick={
                                    async () => {
                                        await removeData('podcasts',{
                                            'title':{'S':title}
                                        })
                                        
                                        setState(false)
                                        document.querySelector('#'+args.id).replaceWith()
                                    }    
                                } 
                            >delete</button> 
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
                <StandardInput 
                    title={"Title"}
                    className={'border px-2'}
                    value={title}
                    setValue={setTitle}
                />
                <hr/>
                <StandardInput 
                    title={"Season"}
                    type='number'
                    className={'border px-2'}
                    value={season}
                    setValue={setSeason}
                />
                <hr/>
                <StandardInput 
                    title={"Episode Number"}
                    type='number'
                    className={'border px-2'}
                    value={episode}
                    setValue={setEpisode}
                />
                <hr/>
                <StandardInput 
                    title={"Date"}
                    type='date'
                    className={'border px-2'}
                    value={date}
                    setValue={setDate}
                />
                <hr/>
                <StandardTextArea 
                    title={"Summary"}
                    className={'border px-2'}
                    value={summary}
                    setValue={setSummary}
                />
                <hr/>
                <div
                    className={'border-2 px-2'}
                >
                    <p className="text-gray-500">Audio File</p>
                    <input 
                        className="block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                        type="file" 
                        accept=".mp3,audio/*"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">accepts .mp3</p>
                </div>
                <hr/>
                <StandardTextArea 
                    title={"Transcript"}
                    className={'border px-2'}
                    value={transcript}
                    setValue={setTranscript}
                />
                <div
                    className={'border-2 p-2'}
                >
                    <div className='flex justify-between'>
                        <p className="text-gray-500">Contributors</p>
                        <button className='browser-btn' onClick={handleAddString}>Add Contributor</button>
                    </div>
                    <div>
                        {
                            contributors?.map((contributor,index) => {
                                return (
                                    <div
                                        className={`md:flex justify-between border-t`}
                                    >
                                        <label
                                            className="w-3/12 text-gray-500"
                                        >
                                            Name
                                        </label>
                                        
                                        <input
                                            id='contributor-input'
                                            name={title}
                                            value={contributor}
                                            onChange={(e) => handleInputChange(index,e)}
                                            autoComplete="false"
                                            placeholder={'Enter contributor'}
                                            className="w-full border-0 md:border-gray-300 md:border-l md:pl-2"
                                        />
                                        <button className='browser-btn' onClick={handleRemoveString}>X</button>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const PodcastAccess = () => {
    const [newPodcast,setNewPodcast] = useState(false)
    const [search,setSearch] = useState('')

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

    if(podcasts){
        return (
            <div className='editable-list'>
                <div>
                    <textarea
                        id="search"
                        name="search"
                        value={search}
                        placeholder='search...'
                        onChange={(event) => {setSearch(event.target.value)}}
                    />
                    <button className='browser-btn' onClick={() => setNewPodcast(true)}>add new podcast</button>
                </div>
                {(newPodcast) ? <NewPodcast remove={setNewPodcast} /> : <></>}
                <div>
                    {
                        podcasts.filter(podcast => 
                            podcast.title.S.toLowerCase().includes(search.toLowerCase())
                        ).map((item,index) => {
                            return (
                                <div key={item.title.S+index}>
                                    <EditablePodcast 
                                        title={item.title.S} 
                                        data={item.data.M} 
                                        id={'editable-podcast-'+index} 
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    else{
        return (
            <></>
        )
    }
}

export default PodcastAccess