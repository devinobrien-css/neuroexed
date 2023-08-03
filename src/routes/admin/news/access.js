import React, { useEffect, useState } from 'react';

import { post } from '../../../shared/types/object_schema';
import { fetchData,putData,removeData } from '../../../shared/services/dba';

const NewPost = (args) => {

    const [state,setState] = useState(true)

    const [title,setTitle] = useState("")
    const [date,setDate] = useState("")
    const [content,setContent] = useState("")
    
    return (
        <div className='editable selected-editable' id={'new-post'}>
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
                                        putData(
                                            'news',
                                            {},
                                            post(
                                                title,
                                                date,
                                                content
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
                                        await removeData('news',{
                                            'title':{'S':title}
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
                    <label>Title</label>
                    <textarea
                        id="title"
                        name="title"
                        value={title}
                        placeholder='post title...'
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>Date</label>
                    <textarea
                        id="date"
                        name="date"
                        value={date}
                        placeholder='post date...'
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        placeholder='post content...'
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

const EditablePost = (args) => {
    const [state,setState] = useState(false)
    const [title,setTitle] = useState(args.title)
    const [date,setDate] = useState(args.date)
    const [content,setContent] = useState(args.data.content.S)
    
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
                                        putData(
                                            'news',
                                            {},
                                            post(
                                                title,
                                                date,
                                                content
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
                                        await removeData('news',{
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
                    <label>Title</label>
                    <textarea
                        id="title"
                        name="title"
                        value={title}
                        placeholder='post title...'
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>Date</label>
                    <textarea
                        id="date"
                        name="date"
                        value={date}
                        placeholder='post date...'
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                <hr/>
                <div className='editable-item'>
                    <label>Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        placeholder='post content...'
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

const NewsAccess = () => {
    const [newPost,setNewPost] = useState(false)
    const [search,setSearch] = useState('')

    const [news, setNews] = useState();
    const getNews = async () => {
        const res = await fetchData('news');

        if(res === "ERROR"){
            setNews([]);
        }
        else
            setNews(res.Items)
    };

    useEffect(() => {
        getNews();
    }, []);

    if(news){
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
                    <button className='browser-btn' onClick={() => setNewPost(true)}>add new post</button>
                </div>
                {(newPost) ? <NewPost remove={setNewPost} /> : <></>}
                <div>
                    {
                        news.filter(post => 
                            post.title.S.toLowerCase().includes(search.toLowerCase())
                        ).map((item,index) => {
                            return (
                                <div>
                                    <EditablePost 
                                        key={item.title.S+index}
                                        data={item.data.M} 
                                        title={item.title.S} 
                                        date={item.date.S} 
                                        id={'editable-post-'+index} 
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

export default NewsAccess