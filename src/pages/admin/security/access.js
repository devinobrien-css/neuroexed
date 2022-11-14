import React, { useEffect, useState } from 'react';

import { log } from '../../../schema/object_schema';
import { fetchData,putData,removeData } from '../../../access/dba';

/* STYLESHEET IMPORTS */
import '../admin.css'; //contains styles specific to the user page
import '../../../components/content_sections.css'; //contains general container styles


const EditableProject = (args) => {
    const [people, setPeople] = useState();
    const getPeople = async () => {
        const res = await fetchData('people');

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

const ProjectAccess = () => {
    const [newProject,setNewProject] = useState(false)
    const [search,setSearch] = useState("")

    const [projects, setProjects] = useState();
    const getProjects = async () => {
        const res = await fetchData('projects');

        if(res === "ERROR"){
            setProjects([]);
        }
        else
            setProjects(res.Items)
    };

    React.useEffect(() => {
        getProjects();
    }, []);

    if(projects){
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
                    <button className='browser-btn' onClick={() => setNewProject(true)}>add new project</button>
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
        )
    }
    else{
        return (
            <></>
        )
    }
}

export default ProjectAccess