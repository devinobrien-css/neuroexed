import React, { useEffect, useState } from 'react';

import { member, sort_order } from '../../../schema/object_schema';
import { fetchData,putData,removeData } from '../../../access/dba';

/* STYLESHEET IMPORTS */
import '../admin.css'; //contains styles specific to the user page
import '../../../components/content_sections.css'; //contains general container styles

const NewPerson = (args) => {
    const [state,setState] = useState(true)

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
        <div className='editable selected-editable' id={'new-blog'}>
            <div>
                <p>{first} {last}</p>
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
                                    async () => {
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
                                        const sort = await fetchData('sort_orders')
                                        sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.push({'S':email})
                                        const output = await putData(
                                            'sort_orders',
                                            {},
                                            sort_order(
                                                'people',
                                                sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L
                                            )
                                        )
                                        window.location.reload()
                                        setState(false)
                                    }    
                                } 
                            >confirm</button> 
                            <button 
                                className='browser-btn'
                                onClick={
                                    async () => {
                                        await removeData('people',{
                                            'email':{'S':email}
                                        })
                                        setState(false)
                                        args.remove(false)
                                    }    
                                }
                            >delete</button> 
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
                <div className='editable-item'>
                    <label>First Name</label>
                    <textarea
                        id="first"
                        name="first"
                        value={first}
                        placeholder='first name...'
                        onChange={(event) => setFirst(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Last Name</label>
                    <textarea
                        id="last"
                        name="last"
                        value={last}
                        placeholder='last name...'
                        onChange={(event) => setLast(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Email</label>
                    <textarea
                        id="email"
                        name="email"
                        value={email}
                        placeholder='email...'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Lab Title</label>
                    <textarea
                        id="title"
                        name="title"
                        value={title}
                        placeholder='title...'
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Collegiate Title</label>
                    <textarea
                        id="collegiate"
                        name="collegiate"
                        value={collegiate}
                        placeholder='collegiate title...'
                        onChange={(event) => setCollegiate(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Year Joined</label>
                    <textarea
                        id="joined"
                        name="joined"
                        value={joined}
                        placeholder='year joined...'
                        onChange={(event) => setJoined(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        placeholder='description...'
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Instagram</label>
                    <textarea
                        id="instagram"
                        name="instagram"
                        value={instagram}
                        placeholder='instagram url...'
                        onChange={(event) => setInstagram(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>LinkedIn</label>
                    <textarea
                        id="linked"
                        name="linked"
                        value={linked}
                        placeholder='linked in url...'
                        onChange={(event) => setLinked(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Twitter</label>
                    <textarea
                        id="twitter"
                        name="twitter"
                        value={twitter}
                        placeholder='twitter...'
                        onChange={(event) => setTwitter(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

const EditablePerson = (args) => {
    const [state,setState] = useState(false)

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
        <div className={'editable ' + (state? 'selected-editable' : '')} id={args.id}>
            <div>
                <p>{first} {last}</p>
                <div className='edit-buttons'>
                    <button 
                        className='browser-btn' 
                        onClick={
                            () => {
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
                                        setState(false)
                                    }    
                                } 
                            >confirm</button> 
                            <button 
                                className='browser-btn'
                                onClick={
                                    /** Remove person from people and sort list
                                     */
                                    async () => {
                                        await removeData('people',{
                                            'email':{'S':email}
                                        })
                                        const sort = await fetchData('sort_orders')
                                        const output = sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.filter(user => {return user.S != email})
                                        await putData(
                                            'sort_orders',
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
                            >delete</button> 
                        </>
                        : <></>
                    }
                </div>
            </div>
            <div className={state ? 'hidden-content open' : 'hidden-content'}>
            <div className='editable-item'>
                    <label>First Name</label>
                    <textarea
                        id="first"
                        name="first"
                        value={first}
                        placeholder='first name...'
                        onChange={(event) => setFirst(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Last Name</label>
                    <textarea
                        id="last"
                        name="last"
                        value={last}
                        placeholder='last name...'
                        onChange={(event) => setLast(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Email</label>
                    <textarea
                        id="email"
                        name="email"
                        value={email}
                        placeholder='email...'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Lab Title</label>
                    <textarea
                        id="title"
                        name="title"
                        value={title}
                        placeholder='title...'
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Collegiate Title</label>
                    <textarea
                        id="collegiate"
                        name="collegiate"
                        value={collegiate}
                        placeholder='collegiate title...'
                        onChange={(event) => setCollegiate(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Year Joined</label>
                    <textarea
                        id="joined"
                        name="joined"
                        value={joined}
                        placeholder='year joined...'
                        onChange={(event) => setJoined(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        placeholder='description...'
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Instagram</label>
                    <textarea
                        id="instagram"
                        name="instagram"
                        value={instagram}
                        placeholder='instagram url...'
                        onChange={(event) => setInstagram(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>LinkedIn</label>
                    <textarea
                        id="linked"
                        name="linked"
                        value={linked}
                        placeholder='linked in url...'
                        onChange={(event) => setLinked(event.target.value)}
                    />
                </div>
                <div className='editable-item'>
                    <label>Twitter</label>
                    <textarea
                        id="twitter"
                        name="twitter"
                        value={twitter}
                        placeholder='twitter...'
                        onChange={(event) => setTwitter(event.target.value)}
                    />
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
            console.log("here" +[...itemList].length)
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
                        'sort_orders',
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
        const sort = await fetchData('sort_orders')
        const res = await fetchData('people')

        if(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.length !== 0)
            setPeople(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L,res.Items));
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
                        <div className='absolute bg-gray-100 shadow-lg w-4/5 rounded left-10 '>
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