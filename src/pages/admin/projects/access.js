import React, { useEffect, useState } from 'react';

import { project,sort_order } from '../../../schema/object_schema';
import { fetchData,putData,removeData } from '../../../access/dba';

/* STYLESHEET IMPORTS */
import '../admin.css'; //contains styles specific to the user page
import '../../../components/content_sections.css'; //contains general container styles

const NewProject = (args) => {
    const [people, setPeople] = useState();
    const getPeople = async () => {
        const res = await fetchData('people');
        console.log(res)

        if(res === "EMPTY"){
            setPeople([]);
        }
        else
            setPeople(res.Items)
    };

    useEffect(() => {
        getPeople();
    }, []);

    const [state,setState] = useState(true)

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")


    const [newMember,setNewMember] = useState("")
    const [selectedMembers,setSelectedMembers] = useState([])

    function handleRemove(id) {
        const newList = selectedMembers.filter((item) => item.M.id.S !== id);
    
        setSelectedMembers(newList);
    }

    function handleAdd(person) {
        const newList = selectedMembers.filter((item) => item.M.id.S !== person.data.M.slug.S);
        newList.push({
            'M': {
                'id':{'S':person.data.M.slug.S},
                'email':{'S':person.email.S},
                'first':{'S':person.data.M.first.S},
                'last':{'S':person.data.M.last.S}
            }
        })
        console.log(newList)
        setSelectedMembers(newList)
    }

    
    if(people){
        return (
            <div className='editable selected-editable' id={'new-project'}>
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
                                        async () => {
                                            putData(
                                                'projects',
                                                {},
                                                project(
                                                    title,
                                                    description,
                                                    selectedMembers
                                                )
                                            )
                                            const sort = await fetchData('sort_orders')
                                            sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L.push({'S':title})
                                            const output = await putData(
                                                'sort_orders',
                                                {},
                                                sort_order(
                                                    'projects',
                                                    sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L
                                                )
                                            )
                                            setState(false)
                                        }    
                                    } 
                                >confirm</button> 
                                <button 
                                    className='browser-btn'
                                    onClick={
                                        async () => {
                                            await removeData('projects',{
                                                'title':{'S':title}
                                            })
                                            const sort = await fetchData('sort_orders')
                                            const output = sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L.filter(project => {return project.S != title})
                                            await putData(
                                                'sort_orders',
                                                {},
                                                sort_order(
                                                    'projects',
                                                    output
                                                )
                                            )
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
                        <label>title</label>
                        <textarea
                            id="title"
                            name="title"
                            value={title}
                            placeholder='project title...'
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <hr/>
                    <p className='sub-header'>Project Description</p>

                    <div className='editable-item'>
                        <label>description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            placeholder='project description...'
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <hr/>

                    <p className='sub-header'>Members</p>
                    <div className='selected-member-list'>
                        {selectedMembers.map((item) => (
                            <div>
                                <img src={'./img/people/'+item.M.last.S.toLowerCase().replace("'","")+'.png'} alt={'photo of '+item.M.last.S} />
                                <p>{item.M.first.S} {item.M.last.S}</p>
                                <button type="button" onClick={() => handleRemove(item.M.id.S)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='editable-item'>
                        
                        <label>add members</label> 
                        <textarea
                            id="members"
                            name="members"
                            placeholder='new member...'
                            value={newMember}
                            onChange={(event) => setNewMember(event.target.value)}
                           
                        />
                        <div className='filtered-member-list'>
                            {
                                newMember !== ""?
                                    people.filter(person => (selectedMembers.filter(selected => selected.M.id.S === person.data.M.slug.S).length === 0 )&&
                                                            (person.data.M.slug.S.toLowerCase().includes(newMember.toLowerCase()) || 
                                                            person.data.M.first.S.toLowerCase().includes(newMember.toLowerCase()) || 
                                                            person.data.M.last.S.toLowerCase().includes(newMember.toLowerCase()))
                                                            
                                                            ).map(person => {
                                        return (
                                            <div onClick={() =>  handleAdd(person)}>
                                                <img src={'./img/people/'+person.data.M.last.S.toLowerCase().replace("'","")+'.png'} alt={'photo of '+person.data.M.last.S} />
                                                <p>{person.data.M.first.S} {person.data.M.last.S}</p>
                                            </div>
                                        )
                                    })
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return <></>
    }
}

const EditableProject = (args) => {
    const [people, setPeople] = useState();
    const getPeople = async () => {
        const res = await fetchData('people');
        console.log(res)

        if(res === "EMPTY"){
            setPeople([]);
        }
        else
            setPeople(res.Items)
    };

    useEffect(() => {
        getPeople();
    }, []);

    const [state,setState] = useState(false)

    console.log(args.data)
    const [title,setTitle] = useState(args.title)
    const [description,setDescription] = useState(args.data.description.S)


    const [newMember,setNewMember] = useState("")
    const [selectedMembers,setSelectedMembers] = useState(args.data.members.L)

    function handleRemove(id) {
        const newList = selectedMembers.filter((item) => item.M.id.S !== id);
    
        setSelectedMembers(newList);
    }

    function handleAdd(person) {
        const newList = selectedMembers.filter((item) => item.M.id.S !== person.data.M.slug.S);
        newList.push({
            'M': {
                'id':{'S':person.data.M.slug.S},
                'email':{'S':person.email.S},
                'first':{'S':person.data.M.first.S},
                'last':{'S':person.data.M.last.S}
            }
        })
        console.log(newList)
        setSelectedMembers(newList)
    }

    
    if(people){
        return (
            <div className={'editable ' + (state? 'selected-editable' : '')} id={args.id}>
                <div>
                    <p>{title}</p>
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
                                        () => {
                                            console.log(
                                                project(
                                                    title,
                                                    description,
                                                    selectedMembers
                                                )
                                            )
                                            putData(
                                                'projects',
                                                {},
                                                project(
                                                    title,
                                                    description,
                                                    selectedMembers
                                                )
                                            )
                                            setState(false)
                                        }    
                                    } 
                                >confirm</button> 
                                <button 
                                    className='browser-btn'
                                    onClick={
                                        async () => {
                                            await removeData('projects',{
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
                    <div className='editable-item'>
                        <label>title</label>
                        <textarea
                            id="title"
                            name="title"
                            value={title}
                            placeholder='project title...'
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <hr/>
                    <p className='sub-header'>Project Description</p>

                    <div className='editable-item'>
                        <label>description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            placeholder='project description...'
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <hr/>

                    <p className='sub-header'>Members</p>
                    <div className='selected-member-list'>
                        {selectedMembers.map((item) => (
                            <div>
                                <img src={'./img/people/'+item.M.last.S.toLowerCase().replace("'","")+'.png'} alt={'photo of '+item.M.last.S} />
                                <p>{item.M.first.S} {item.M.last.S}</p>
                                <button type="button" onClick={() => handleRemove(item.M.id.S)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='editable-item'>
                        
                        <label>add members</label> 
                        <textarea
                            id="members"
                            name="members"
                            placeholder='new member...'
                            value={newMember}
                            autoComplete="false"
                            autoFill="false"
                            onChange={(event) => setNewMember(event.target.value)}
                           
                        />
                        <div className='filtered-member-list'>
                            {
                                newMember !== ""?
                                    people.filter(person => (selectedMembers.filter(selected => selected.M.id.S === person.data.M.slug.S).length === 0 )&&
                                                            (person.data.M.slug.S.toLowerCase().includes(newMember.toLowerCase()) || 
                                                            person.data.M.first.S.toLowerCase().includes(newMember.toLowerCase()) || 
                                                            person.data.M.last.S.toLowerCase().includes(newMember.toLowerCase()))
                                                            
                                                            ).map(person => {
                                        return (
                                            <div onClick={() =>  handleAdd(person)}>
                                                <img src={'./img/people/'+person.data.M.last.S.toLowerCase().replace("'","")+'.png'} alt={'photo of '+person.data.M.last.S} />
                                                <p>{person.data.M.first.S} {person.data.M.last.S}</p>
                                            </div>
                                        )
                                    })
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return <></>
    }
}

const SortableProjectList = ({ items }) => {

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
                itemList.map((project,index)=>{
                    return(
                        <div 
                            key={project.title.S + "-" + index}
                            className='flex justify-between shadow-lg rounded w-4/5 mx-auto my-1 bg-gray-200'
                        >
                            <div className='my-auto'>
                                <p
                                    className='text-lg px-2 font-bold'
                                >{project.title.S}</p>
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
                    itemList.map(project => {
                        string_list.push(project.title)
                    })
                    await putData(
                        'sort_orders',
                        {},
                        sort_order(
                            'projects',
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

        output.push(objects.filter(object => {return object.title.S === order_by.S})[0])
    })
    return output
}

const ProjectAccess = () => {
    const [editOrder,setEditOrder] = useState(false)
    const [newProject,setNewProject] = useState(false)
    const [search,setSearch] = useState("")

    const [projects, setProjects] = useState();
    const getProjects = async () => {
        const sort = await fetchData('sort_orders')
        const res = await fetchData('projects');

        if(sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L.length !== 0)
            setProjects(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "projects"})[0].sort.L,res.Items));
        else
            setProjects(res.Items)
    };

    React.useEffect(() => {
        getProjects();
    }, []);

    if(projects){
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
                            <SortableProjectList items={projects}/>
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
                        <div>
                            <button className='browser-btn' onClick={() => {
                                setEditOrder(true)
                            }}>
                                edit order
                            </button>
                            <button className='browser-btn' onClick={() => setNewProject(true)}>add new project</button>
                        </div>
                    </div>
                    {newProject ? <NewProject remove={setNewProject}/> : <></>}
                    <div>
                        {
                            projects.filter(project => 
                                project.title.S.toLowerCase().includes(search.toLowerCase())
                            ).map((project,index) => {
                                return (
                                    <div>
                                        <EditableProject 
                                            key={project.title.S+index}
                                            data={project.data.M}
                                            title={project.title.S} 
                                            id={'editable-project-'+index}
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

export default ProjectAccess