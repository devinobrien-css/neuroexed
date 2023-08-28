import React, { useEffect, useState } from 'react';

import { blog, sort_order } from '../../../shared/types/object_schema';
import { fetchData,putData,removeData } from '../../../shared/services/dba';

/* STYLESHEET IMPORTS */
import StandardInput from '../components/StandardInput.component';
import StandardSelect from '../components/StandardSelect.component';
import StandardTextArea from '../components/StandardTextArea.component';

const NewBlog = (args) => {
    const [state,setState] = useState(true)

    const [title,setTitle] = useState("")
    const [date,setDate] = useState("")
    const [content,setContent] = useState("")
    const [source,setSource] = useState("")
    const [type,setType] = useState("")
    
    return (
        <div className='editable selected-editable' id={'new-blog'}>
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
                                            'blogs',
                                            {},
                                            blog(title,type,date,source,content)
                                        )
                                        const sort = await fetchData('sort-orders')
                                        sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L = [{'S':title}, ...sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L]
                                        await putData(
                                            'sort-orders',
                                            {},
                                            sort_order(
                                                'blogs',
                                                sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L
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
                                        await removeData('blogs',{
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
                <StandardInput
                    title={"Title"}
                    className={'border px-2'}
                    value={title}
                    setValue={setTitle}
                />
                <StandardInput 
                    title={"Date"}
                    className={'border px-2'}
                    type='date'
                    value={date !== '' ? date : new Date().toISOString().substring(0,10)}
                    setValue={setDate}
                />
                <StandardSelect
                    title='Media Type'
                    className={'border px-2'}
                    options={['BLOG','PODCAST']}
                    selected={type}
                    setSelected={setType}
                />
                <StandardInput 
                    title={"Source"}
                    className={'border px-2'}
                    value={source}
                    setValue={setSource}
                />
                <StandardTextArea 
                    title={"Description"}
                    className={'border px-2'}
                    value={content}
                    setValue={setContent}
                />
            </div>
        </div>
    )
}

const EditableBlog = (args) => {
    const [state,setState] = useState(false)

    const [title,setTitle] = useState(args.data['media_title'].S)
    const [date,setDate] = useState(args.data['media_date'].S)
    const [content,setContent] = useState(args.data['media_content'].S)
    const [source,setSource] = useState(args.data['media_source'].S)
    const [type,setType] = useState(args.data['media_type'].S)
    

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
                                            'blogs',
                                            {},
                                            blog(title,type,date,source,content)
                                        )
                                        setState(false)
                                    }    
                                } 
                            >confirm</button> 
                            <button 
                                className='browser-btn'
                                onClick={
                                    async () => {
                                        await removeData('blogs',{
                                            'title':{'S':args.data['media_title'].S},
                                        })
                                        const sort = await fetchData('sort-orders')
                                        const output = sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L.filter(blog => {return blog.S !== title})
                                        await putData(
                                            'sort-orders',
                                            {},
                                            sort_order(
                                                'blogs',
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
                <StandardInput
                    title={"Title"}
                    className={'border px-2'}
                    value={title}
                    setValue={setTitle}
                />
                <StandardInput 
                    title={"Date"}
                    className={'border px-2'}
                    type='date'
                    value={new Date(date).toISOString().substring(0,10)}
                    setValue={setDate}
                />
                <StandardSelect
                    title='Media Type'
                    className={'border px-2'}
                    options={['BLOG','PODCAST']}
                    selected={type}
                    setSelected={setType}
                />
                <StandardInput 
                    title={"Source"}
                    className={'border px-2'}
                    value={source}
                    setValue={setSource}
                />
                <StandardTextArea 
                    title={"Description"}
                    className={'border px-2'}
                    value={content}
                    setValue={setContent}
                />
            </div>
        </div>
    )
}

const SortableBlogList = ({ items }) => {

    const [itemList,setItemList] = useState([])

    let tempList=[]
    useEffect(() => {
        tempList=[]
        items.forEach(item => {
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
                itemList.map((blog,index)=>{
                    return(
                        <div 
                            key={blog.data.M.media_title.S + "-" + index}
                            className='flex justify-between shadow-lg rounded w-4/5 mx-auto my-1 bg-gray-200'
                        >
                            <div className='my-auto w-4/5'>
                                <p
                                    className='text-lg px-2 font-bold whitespace-nowrap overflow-hidden'
                                >{blog.data.M.media_title.S}</p>
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
                    itemList.forEach(blog => {
                        string_list.push({'S':blog.title.S})
                    })
                    await putData(
                        'sort-orders',
                        {},
                        sort_order(
                            'blogs',
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
    order.forEach(order_by => {
        output.push(objects.filter(object => {return object.title.S === order_by.S})[0])
    })
    return output
}


const BlogAccess = () => {
    const [editOrder,setEditOrder] = useState(false)
    const [search,setSearch] = useState('')
    const [newBlog,setNewBlog] = useState(false)

    const [blogs, setBlogs] = useState();
    const getBlogs = async () => {
        const sort = await fetchData('sort-orders')
        const res = await fetchData('blogs')

        if(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L.length !== 0)
            setBlogs(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "blogs"})[0].sort.L,res.Items))
        else
            setBlogs(res.Items);
    };

    useEffect(() => {
        getBlogs();
    }, []);

    if(blogs){
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
                            <SortableBlogList items={blogs}/>
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
                            <button className='browser-btn' onClick={() => setNewBlog(true)}>add new blog</button>
                        </div>
                    </div>
                    {(newBlog) ? <NewBlog remove={setNewBlog} /> : <></>}
                    <div>
                        {
                            blogs.filter(blog => 
                                blog.title.S.toLowerCase().includes(search.toLowerCase())
                            ).map((blog,index) => {
                                return (
                                    <div
                                        key={index}
                                    >
                                        <EditableBlog 
                                            key={blog.data.M.media_title.S+index}
                                            data={blog.data.M} 
                                            id={'editable-blog-'+index} 
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

export default BlogAccess