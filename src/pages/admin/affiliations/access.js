import React, { useEffect, useState } from 'react';

import { affiliation } from '../../../schema/object_schema';
import { fetchData,putData,removeData } from '../../../access/dba';

/* STYLESHEET IMPORTS */
import '../admin.css'; //contains styles specific to the user page
import '../../../components/content_sections.css'; //contains general container styles

const NewAffiliate = (args) => {

    const [state,setState] = useState(true)

    const [name,setName] = useState("")
    const [source,setSource] = useState("")
    const [slug,setSlug] = useState("")
    
    return (
        <div className='editable selected-editable' id={'new-affiliate'}>
            <div>
                <p>{name}</p>
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
                                        putData(
                                            'affiliations',
                                            {},
                                            affiliation(
                                                name,
                                                source,
                                                slug
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
                                        await removeData('affiliations',{
                                            'name':{'S':name}
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
                    <label>name</label>
                    <textarea
                        id="name"
                        name="name"
                        value={name}
                        placeholder='affiliate name...'
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>short name</label>
                    <textarea
                        id="slug"
                        name="slug"
                        value={slug}
                        placeholder='affiliate shortname...'
                        onChange={(event) => setSlug(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>source</label>
                    <textarea
                        id="source"
                        name="source"
                        value={source}
                        placeholder='affiliate source...'
                        onChange={(event) => setSource(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

const EditableAffiliate = (args) => {

    const [state,setState] = useState(false)
    const [name,setName] = useState(args.name)
    const [source,setSource] = useState(args.data.source.S)
    const [slug,setSlug] = useState(args.data.slug.S)
    

    return (
        <div className={'editable ' + (state? 'selected-editable' : '')} id={args.id}>
            <div>
                <p>{name}</p>
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
                                            'affiliations',
                                            {},
                                            affiliation(
                                                name,
                                                source,
                                                slug
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
                                        await removeData('affiliations',{
                                            'name':{'S':name}
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
                    <label>name</label>
                    <textarea
                        id="name"
                        name="name"
                        value={name}
                        placeholder='affiliate name...'
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>short name</label>
                    <textarea
                        id="slug"
                        name="slug"
                        value={slug}
                        placeholder='affiliate shortname...'
                        onChange={(event) => setSlug(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>source</label>
                    <textarea
                        id="source"
                        name="source"
                        value={source}
                        placeholder='affiliate source...'
                        onChange={(event) => setSource(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

const AffiliateAccess = () => {
    const [newAffiliate,setNewAffiliate] = useState(false)
    const [search,setSearch] = useState('')

    const [affiliates, setAffiliates] = useState();
    const getAffiliates = async () => {
        const res = await fetchData('affiliations');
        console.log(res)

        if(res === "ERROR"){
            console.log('err')
            setAffiliates([]);
        }
        else
            setAffiliates(res.Items)
    };

    useEffect(() => {
        getAffiliates();
    }, []);

    if(affiliates){
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
                    <button className='browser-btn' onClick={() => setNewAffiliate(true)}>add new affiliate</button>
                </div>
                {(newAffiliate) ? <NewAffiliate remove={setNewAffiliate} /> : <></>}
                <div>
                    {
                        affiliates.filter(affiliate => 
                            affiliate.name.S.toLowerCase().includes(search.toLowerCase())
                        ).map((item,index) => {
                            return (
                                <div>
                                    <EditableAffiliate 
                                        key={item.name.S+index}
                                        data={item.data.M} 
                                        name={item.name.S} 
                                        id={'editable-affiliate-'+index} 
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

export default AffiliateAccess