/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { member, sort_order } from '../../shared/types/object_schema';
import { fetchData,putData,removeData, uploadFileToBucket } from '../../shared/services/dba';
import StandardInput from './components/StandardInput.component';
import StandardTextArea from './components/StandardTextArea.component';
import addUpdatePerson from '../../shared/services/mutations/personMutations';
import ColorButton from '../../shared/components/buttons/ColorButton.component';


const ErrorMessage = ({error,message,type}) => {
    if(error.includes(type)){
        return (
            <p className='text-red-500 italic text-sm'>{message}</p>
        )
    }
}

const NewPerson = (args) => {
    // state control variables
    const[imageUpload,setImageUpload] = useState()
    const[state,setState] = useState(true)
    const[error,setError] = useState([])
    

    // input variables
    const [first,setFirst] = useState("")
    const [last,setLast] = useState("")
    const [collegiate,setCollegiate] = useState("")
    const [title,setTitle] = useState("")
    const [joined,setJoined] = useState("")
    const [description,setDescription] = useState("")
    const [email,setEmail] = useState("")
    const [twitter,setTwitter] = useState("")
    const [instagram,setInstagram] = useState("")
    const [linked,setLinked] = useState("")

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
                        <p className='text-4xl font-light'>{first} {last}{title?", "+title:""}</p>
                        <p className='text-2xl font-light'>{email}</p>
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
                                        if(first.length === 0){
                                            setError(...error,'missing-first')
                                        }
                                        if(last === ""){
                                            setError([...error,'missing-last'])
                                        }
                                        if(email === ""){
                                            setError([...error,'missing-email'])
                                        }
                                        if(email.split[' '] > 0){
                                            setError([...error,'bad-email'])
                                        }
                                        if(!email.includes("@")){
                                            setError([...error,'bad-email'])
                                        }
                                        if(error)
                                            return
                                        
                                        await addUpdatePerson(
                                            member(
                                                first,last,
                                                collegiate,
                                                title,joined,
                                                description,
                                                {
                                                    'email':email,
                                                    'twitter':twitter,
                                                    'linkedin':linked,
                                                    'instagram':instagram
                                                }
                                            )
                                        )

                                        window.location.reload()

                                        if(imageUpload){
                                            const fileName = `${last.toLowerCase()}.png`
                                            uploadFileToBucket('profile_pictures',fileName, imageUpload)
                                        }

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
                    title={"First Name"}
                    value={first}
                    className={'border rounded-t px-2'}
                    setValue={setFirst}
                />
                <ErrorMessage error={error} message={'please enter a first name'} type='missing-first' />

                <StandardInput 
                    title={"Last Name"}
                    value={last}
                    className={'border px-2'}
                    setValue={setLast}
                />
                <ErrorMessage error={error} message={'please enter a first name'} type='missing-last' />

                <StandardInput
                    title={"Email"}
                    value={email}
                    className={'border px-2'}
                    type="email"
                    setValue={setEmail}
                />
                <ErrorMessage error={error} message={'please enter a first name'} type='missing-email' />
                <ErrorMessage error={error} message={'please enter a valid email e.g. johndoe@gmail.com'} type='bad-email' />
                <StandardInput 
                    title={"Lab Title"}
                    className={'border px-2'}
                    value={title}
                    setValue={setTitle}
                />
                <StandardInput 
                    title={"Collegiate Title"}
                    className={'border px-2'}
                    value={collegiate}
                    setValue={setCollegiate}
                />
               <StandardInput 
                    title={"Year Joined"}
                    className={'border px-2'}
                    type='date'
                    value={joined === '' ? new Date().toISOString().substring(0,10) : joined}
                    setValue={setJoined}
                />
                <StandardTextArea
                    title={"Description"}
                    className={'border px-2'}
                    value={description}
                    setValue={setDescription}
                />
                
                <StandardInput 
                    title={"Instagram URL"}
                    className={'border px-2'}
                    value={instagram}
                    setValue={setInstagram}
                />
                <StandardInput 
                    title={"LinkedIn URL"}
                    className={'border px-2'}
                    value={linked}
                    setValue={setLinked}
                />
                <StandardInput 
                    title={"Twitter URL"}
                    className={'border rounded-b px-2'}
                    value={twitter}
                    setValue={setTwitter}
                />
                <div
                    className={'border-2 px-2'}
                >
                    <p className="text-gray-500">Profile Picture</p>
                    <input 
                        className="block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                        type="file" 
                        accept="image/png"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0])
                        }}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help"> PNG (MAX. 600x600px).</p>
                </div>
            </div>
        </div>
    )
}

const EditablePerson = (args) => {

    const [state,setState] = useState(false)
    const[imageUpload,setImageUpload] = useState()

    const [first,setFirst] = useState(args.data['first'].S)
    const [last,setLast] = useState(args.data['last'].S)
    const [collegiate,setCollegiate] = useState(args.data['collegiate_title'].S)
    const [title,setTitle] = useState(args.data['lab_title'].S)
    const [joined,setJoined] = useState(args.data['year_joined'].S)
    const [description,setDescription] = useState(args.data['description'].S)
    const [email,setEmail] = useState(args.data['socials'].M['email'].S)
    const [twitter,setTwitter] = useState(args.data['socials'].M['twitter'].S)
    const [instagram,setInstagram] = useState(args.data['socials'].M['instagram'].S)
    const [linked,setLinked] = useState(args.data['socials'].M['linkedin'].S)
    
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
                                        await putData(
                                            'people',
                                            {},
                                            member(
                                                first,last,
                                                collegiate,
                                                title,joined,
                                                description,
                                                {
                                                    'email':email,
                                                    'twitter':twitter,
                                                    'linkedin':linked,
                                                    'instagram':instagram
                                                }
                                            )
                                        )   


                                        if(imageUpload){
                                            const fileName = `${last.toLowerCase()}.png`
                                            uploadFileToBucket('profile_pictures',fileName, imageUpload)
                                        }

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
                                        await removeData('people',{
                                            'email':{'S':email}
                                        })
                                        const sort = await fetchData('sort-orders')
                                        const output = sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.filter(user => {return user.S !== email})
                                        await putData(
                                            'sort-orders',
                                            {},
                                            sort_order(
                                                'people',
                                                output
                                            )
                                        )
                                        setState(false)
                                        document.querySelector('#'+args.id).replaceWith()
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
                    className={'border rounded-t px-2'}
                    title={"First Name"}
                    value={first}
                    setValue={setFirst}
                />
                <StandardInput 
                    className={'border px-2'}
                    title={"Last Name"}
                    value={last}
                    setValue={setLast}
                />
                <StandardInput
                    className={'border px-2'}
                    title={"Email"}
                    value={email}
                    setValue={setEmail}
                />
                <StandardInput 
                    className={'border px-2'}
                    title={"Lab Title"}
                    value={title}
                    setValue={setTitle}
                />
                <StandardInput 
                    className={'border px-2'}
                    title={"Collegiate Title"}
                    value={collegiate}
                    setValue={setCollegiate}
                />
               <StandardInput 
                    className={'border px-2'}
                    title={"Year Joined"}
                    type={'date'}
                    value={new Date(joined).toISOString().substring(0,10)}
                    setValue={setJoined}
                />
                <StandardTextArea 
                    className={'border px-2'}
                    title={"Description"}
                    value={description}
                    setValue={setDescription}
                />
                <StandardInput 
                    className={'border px-2'}
                    title={"Instagram URL"}
                    value={instagram}
                    setValue={setInstagram}
                />
                <StandardInput 
                    className={'border px-2'}
                    title={"LinkedIn URL"}
                    value={linked}
                    setValue={setLinked}
                />
                <StandardInput 
                    className={'border rounded-b px-2'}
                    title={"Twitter URL"}
                    value={twitter}
                    setValue={setTwitter}
                />
                <div
                    className={'border-2 p-2 md:flex'}
                >
                    <p className="text-gray-500 md:w-3/12">Profile Picture</p>
                    <div>
                        <input 
                            className="md:border-l block w-min h-min my-auto overflow-hidden text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none " 
                            type="file" 
                            accept="image/png"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0])
                            }}
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help"> PNG (MAX. 600x600px). <span className='italic'>The file name should be the user's last name</span></p>
                    </div>
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
                    {(newPerson) ? <NewPerson remove={setNewPerson} /> : <></>}
                    <div>
                        {
                            people.filter(person => 
                                (person.data.M.first.S.toLowerCase().includes(search.toLowerCase()) || 
                                person.data.M.last.S.toLowerCase().includes(search.toLowerCase()))
                            ).map((person,index) => {
                                return (
                                    <div key={""+person.email.m+index}>
                                        <EditablePerson 
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