import React, { useEffect, useState } from 'react';

import { member, sort_order } from '../../schema/object_schema';
import { fetchData,putData,removeData } from '../../access/dba';
import S3ImageUpload,{ uploadFile, deleteFile } from "react-s3"

import StandardInput from './components/StandardInput.component';
import StandardTextArea from './components/StandardTextArea.component';
import addUpdatePerson from '../../access/mutations/personMutations';
import ColorButton from '../../components/buttons/ColorButton.component';

const NewPodcast = (args) => {
    // state control variables
    const[imageUpload,setImageUpload] = useState()
    const[state,setState] = useState(true)
    const[error,setError] = useState([])
    const Error = ({message,type}) => {
        if(error.includes(type)){
            return (
                <p className='text-red-500 italic text-sm'>{message}</p>
            )
        }
    }

    // input variables
    const [title,setTitle] = useState("")
    const [season,setSeason] = useState("")
    const [episode,setEpisode] = useState("")
    const [date,setDate] = useState("")
    const [transcript,setTranscript] = useState("")

    return (
        <div className={`border-b-2 border-gray-600 transition-all selected-editable`} id={'new-blog'}>
            <div className='flex flex-row justify-between p-4'>
                <div className='flex'>
                    <div className='w-16'>
                        <img 
                            className="block my-auto" alt="uploaded file" 
                            src={
                                imageUpload?
                                URL.createObjectURL(imageUpload)
                                :
                                "https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/profile.png"
                            } 
                        />
                    </div>
                    <div className='ml-2 '>
                        <p className='text-4xl font-light'>{title}</p>
                        <p className='text-2xl font-light'>S{season}:E{episode}</p>
                    </div>
                </div>
                <div className=''>
                    <ColorButton
                        color={"blue"}
                        title={state ? "cancel" : "edit"}
                        onClick={() => {
                            if(state)
                                args.remove(false)
                            
                            state ? 
                            setState(false) 
                            : setState(true)
                        }}
                    />
                    {
                        state ? 
                        <>
                            <ColorButton
                                color={"yellow"}
                                title={"confirm"}
                                onClick={
                                    async () => {
                                        setError([])
                                        if(title === ""){
                                            setError(...error,'missing-title')
                                        }
                                        if(date === ""){
                                            setError([...error,'missing-date'])
                                        }
                                        if(season === ""){
                                            setError([...error,'missing-season'])
                                        }
                                        if(episode === ""){
                                            setError([...error,'missing-episode'])
                                        }
                                        if(error)
                                            return
                                        
                                        // await addUpdatePerson(
                                        //     member(
                                        //         first,last,
                                        //         collegiate,
                                        //         title,joined,
                                        //         description,
                                        //         {
                                        //             'email':email,
                                        //             'twitter':twitter,
                                        //             'linkedin':linked,
                                        //             'instagram':instagram
                                        //         }
                                        //     )
                                        // )

                                        window.location.reload()
                                        setState(false)
                                    }    
                                } 
                            />
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
                <StandardInput 
                    title={"Title"}
                    value={title}
                    className={'border rounded-t px-2'}
                    setValue={setTitle}
                />
                <Error message={'please enter a title'} type='missing-title' />

                <StandardInput 
                    title={"Season"}
                    value={season}
                    type='number'
                    className={'border px-2'}
                    setValue={setSeason}
                />
                <Error message={'please enter a season'} type='missing-season' />

                <StandardInput 
                    title={"Episode"}
                    value={episode}
                    type='number'
                    className={'border px-2'}
                    setValue={setEpisode}
                />
                <Error message={'please enter an episode'} type='missing-episode' />

                <StandardInput 
                    title={"Date"}
                    value={date !== '' ? date : new Date.toISOString().substring(0,10) }
                    type='date'
                    className={'border px-2'}
                    setValue={setDate}
                />
                <Error message={'please enter a date'} type='missing-date' />

                <div
                    className={'border-2 px-2'}
                >
                    <p className="text-gray-500">Audio File</p>
                    <input 
                        class="block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                        type="file" 
                        accept="image/png"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3</p>
                </div>
            </div>
        </div>
    )
}

const EditablePodcast = (args) => {

    const [state,setState] = useState(false)
    const[imageUpload,setImageUpload] = useState()

    const [title,setTitle] = useState("")
    const [season,setSeason] = useState("")
    const [episode,setEpisode] = useState("")
    const [date,setDate] = useState("")
    const [transcript,setTranscript] = useState("")
    
    return (
        <div className={`border-b-2 border-gray-600 transition-all hover:bg-white p-2 ${state?'bg-white':'bg-gray-300'}`} id={args.id}>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='w-16 my-auto'>
                        <img 
                            className="rounded-lg" alt="uploaded file" 
                            src={
                                imageUpload?
                                URL.createObjectURL(imageUpload)
                                :
                                `https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${last.replace("'","").toLowerCase()}.png`
                            } 
                        />
                    </div>
                    <div className='ml-2 my-auto'>
                        <p className='text-4xl font-light'>{first} {last}</p>
                        <p className='text-2xl font-light'>{email}</p>
                    </div>
                </div>
                <div className='flex my-auto'>
                    <ColorButton
                        color={"blue"}
                        title={state ? "cancel" : "edit"}
                        onClick={() => {
                            state ? 
                            setState(false) 
                            : setState(true)
                        }}
                    />
                    {
                        state ? 
                        <>
                            <ColorButton
                                color={"yellow"}
                                title={"confirm"}
                                onClick={
                                    async() => {
                                        // await putData(
                                        //     'people',
                                        //     {},
                                        //     member(
                                        //         first,last,
                                        //         collegiate,
                                        //         title,joined,
                                        //         description,
                                        //         {
                                        //             'email':email,
                                        //             'twitter':twitter,
                                        //             'linkedin':linked,
                                        //             'instagram':instagram
                                        //         }
                                        //     )
                                        // )   

                                        // const config = {
                                        //     bucketName: process.env.REACT_APP_NEUROEXED_BUCKET,
                                        //     dirName: "profile_pictures",
                                        //     region: process.env.REACT_APP_NEUROEXED_REGION,
                                        //     accessKeyId: process.env.REACT_APP_NEUROEXED_ACCESS,
                                        //     secretAccessKey: process.env.REACT_APP_NEUROEXED_SECRET,
                                        // }


                                        // if(imageUpload){

                                        //     uploadFile(imageUpload, config)
                                        //     .then(data => console.log(data))
                                        //     .catch(e => {
                                        //         console.log('error')
                                        //         console.log(e)
                                        //     })
                                        // }

                                        setState(false)
                                    }    
                                } 
                            />
                            <ColorButton
                                color={"red"}
                                title={"delete"}
                                onClick={
                                    /** Remove person from people and sort list
                                     */
                                    async () => {
                                        // await removeData('people',{
                                        //     'email':{'S':email}
                                        // })
                                        // const sort = await fetchData('sort-orders')
                                        // const output = sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.filter(user => {return user.S != email})
                                        // await putData(
                                        //     'sort-orders',
                                        //     {},
                                        //     sort_order(
                                        //         'people',
                                        //         output
                                        //     )
                                        // )
                                        // setState(false)
                                        // document.querySelector('#'+args.id).replaceWith()
                                    }    
                                } 
                            />
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
                <StandardInput 
                    title={"Title"}
                    value={title}
                    className={'border rounded-t px-2'}
                    setValue={setTitle}
                />
                <StandardInput 
                    title={"Season"}
                    value={season}
                    type='number'
                    className={'border px-2'}
                    setValue={setSeason}
                />
                <StandardInput 
                    title={"Episode"}
                    value={episode}
                    type='number'
                    className={'border px-2'}
                    setValue={setEpisode}
                />
                <StandardInput 
                    title={"Date"}
                    value={date !== '' ? date : new Date.toISOString().substring(0,10) }
                    type='date'
                    className={'border px-2'}
                    setValue={setDate}
                />
                <StandardTextArea 
                    title={"Transcript"}
                    value={transcript}
                    className={'border px-2'}
                    setValue={setTranscript}
                />
                <div
                    className={'border-2 px-2'}
                >
                    <p className="text-gray-500">Audio File</p>
                    <input 
                        class="block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                        type="file" 
                        accept="image/png"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3</p>
                </div>
            </div>
        </div>
    )
}


const SortablePersonList = ({ items }) => {

    const [itemList,setItemList] = useState([])

    let tempList=[]
    useEffect(() => {
        tempList=[]
        items.map(item => {
            tempList.push(item)
        })
        setItemList(tempList)
    },[])

    function decrement(index){
        if(index!==0){
            tempList = [...itemList]
            const temp = tempList[index-1]
            tempList[index-1] = tempList[index]
            tempList[index] = temp
            setItemList(tempList)
        }
    }

    function increment(index){
        if(index < [...itemList].length-1){
            tempList = [...itemList]
            const temp = tempList[index+1]
            tempList[index+1] = tempList[index]
            tempList[index] = temp
            setItemList(tempList)
        }
    }

    return (
        <div className='border-2 h-96 overflow-scroll relative'>
            {
                itemList.map((person,index)=>{
                    return(
                        <div 
                            key={person.data.M.first.S + "-" + index}
                            className='flex justify-between shadow-lg rounded w-4/5 mx-auto my-1 bg-gray-200'
                        >
                            <div className='my-auto'>
                                <p
                                    className='text-lg px-2 font-bold'
                                >{person.data.M.first.S} {person.data.M.last.S}</p>
                            </div>
                            <div className='flex flex-col h-min'>
                                <button
                                    className='h-min p-0 rounded text-center my-1 border-2  hover:bg-gray-300'
                                    onClick={() => {
                                        decrement(index)
                                    }}
                                >
                                    ^
                                </button>

                                <button 
                                    className='h-min px-2 rounded text-center my-1 border-2 rotate-180 hover:bg-gray-300'
                                    onClick={() => {
                                        increment(index)
                                    }}
                                >
                                    ^
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            <button 
                className='sticky bg-gray-300 bottom-1 left-2 p-2 rounded hover:bg-gray-400'
                onClick={async () => {
                    const string_list = []
                    itemList.map(person => {
                        string_list.push(person.email)
                    })
                    await putData(
                        'sort-orders',
                        {},
                        sort_order(
                            'people',
                            string_list
                        )
                    )
                    window.location.reload()
                }}
            >
                confirm changes
            </button>
        </div>
    )
}




function orderJsonObjects(order,objects){
    const output = []
    order.map(order_by => {
        output.push(objects.filter(object => {return object.email.S === order_by.S})[0])
    })
    return output
}


const PeopleAccess = () => {
    const [editOrder,setEditOrder] = useState(false)
    const [newPerson,setNewPerson] = useState(false)
    const [search,setSearch] = useState('')

    const [people, setPeople] = React.useState();
    const getPeople = async () => {
        const sort = await fetchData('sort-orders')
        const res = await fetchData('people')

        
        if(sort.Count !== 0)
            if(sort?.Items?.filter(order => {
                return order.type?.S === "people"
            })[0]?.sort?.L?.length !== 0)
                setPeople(orderJsonObjects(sort.Items.filter(order => {return order.type?.S === "people"})[0].sort?.L,res.Items));
            else
                setPeople(res.Items)
        else
            setPeople(res.Items)
    };


    useEffect(() => {
        getPeople();

    }, []);

    if(people){
        return (
            <>
                {
                    editOrder?
                    (
                        <div className='absolute bg-gray-100 shadow-lg w-4/5 rounded left-10 z-[1000]'>
                            <button 
                                className='px-2 rounded hover:bg-blue-100 absolute top-0 right-0 z-[55] bg-gray-200'
                                onClick={() => {
                                    setEditOrder(false)
                                }}    
                            >X</button>
                            <p className='text-red-400 italic px-2'>(confirming changes will refresh the page)</p>
                            <SortablePersonList items={people}/>
                        </div>
                    )
                    :
                    (
                        <></>
                    )
                }
                <div className='editable-list'>
                    <div>
                        <textarea
                            id="search"
                            name="search"
                            value={search}
                            placeholder='search...'
                            onChange={(event) => {setSearch(event.target.value)}}
                        />
                        <div className=''>
                            <button className='browser-btn' onClick={() => {
                                setEditOrder(true)
                            }}>
                                edit order
                            </button>
                            <button className='browser-btn' onClick={() => setNewPerson(true)}>add new person</button>
                        </div>
                    </div>
                    {(newPerson) ? <NewPodcast remove={setNewPerson} /> : <></>}
                    <div>
                        {
                            people.filter(person => 
                                (person.data.M.first.S.toLowerCase().includes(search.toLowerCase()) || 
                                person.data.M.last.S.toLowerCase().includes(search.toLowerCase()))
                            ).map((person,index) => {
                                return (
                                    <div key={""+person.email.m+index}>
                                        <EditablePodcast 
                                            key={person.email.S+index}
                                            data={person.data.M} 
                                            id={'editable-person-'+index} 
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
    else{
        return (
            <></>
        )
    }
}

export default PeopleAccess