import React from "react"



export const BlogMd = ({data}) => {
    return (
        <div 
            className='cursor-pointer group transition-all bg-white mx-auto my-2 w-full flex flex-col justify-between shadow hover:shadow-xl overflow-visible h-min min-h-[280px]'
            onClick={
                () => window.location.href = data['media_source'].S
            }    
        >  
            <div className="text-left p-4">
                <p className='text-2xl font-lato font-light'>
                    {data['media_type'].S === 'BLOG' ? 'Blog: ': 'Podcast: '}
                    {data['media_title'].S}
                </p>
                <p>{new Date(data['media_date'].S).toDateString()}</p>
            </div>
            <div
                className='border-t-2 text-left'
            >
                <div className={`overflow-hidden transition-all duration-300 `}>
                    <p className="p-2">{data['media_content'].S}</p>
                </div>
            </div>
        </div>
    )
}

export const BlogStyledMd = ({data,index}) => {
    console.log()
    return (
        <div 
            className='cursor-pointer group transition-all  bg-white mx-auto my-2 w-full flex flex-col shadow justify-between hover:shadow-xl overflow-visible h-min min-h-[280px]'
            onClick={
                () => window.location.href = data['media_source'].S
            }
        >  
            <div className={`overflow-clip border h-48 w-full`}>
                <img alt='Blog neuron background' src={`./img/backgrounds/bg-${index}.png`}  className="w-full"/>
            </div>
            <div className="text-left p-4">
                <p className='text-2xl font-lato font-light'>
                    {data['media_type'].S === 'BLOG' ? 'Blog: ': 'Podcast: '}
                    {data['media_title'].S}
                </p>
                <p>{new Date(data['media_date'].S).toDateString()}</p>
            </div>
            <div
                className='border-t-2 text-left'
            >
                <div className={`overflow-hidden transition-all duration-300 `}>
                    <p className="p-2">{data['media_content'].S}</p>
                </div>
            </div>
        </div>
    )
}