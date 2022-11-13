import { useState } from "react";
import DateCard from "../general/DateCard.component";

const Blog = (args) => {
    const [state,setState] = useState()
    const data = args.data
    const date = data['media_date'].S.split('/');

    return (
        <div className='group hover:shadow-xl shadow transition-all  bg-white mx-auto my-2 md:w-[48%] flex flex-col justify-between rounded-xl overflow-visible h-min min-h-[280px]'>  
            <div>
                <div className='flex justify-between p-2 bg-no-repeat bg-bottom bg-cover bg-hex rounded-t-xl overflow-visible max-h-16'>
                    {   
                        data['media_type'].S === "BLOG"?(
                            <>
                                <div className='flex'>
                                    <svg className='-mt-3 -ml-6 ' width="75" height="75" enableBackground="new 0 0 128 128" id="Layer_1" version="1.1" viewBox="0 0 128 128" ><circle cx="64" cy="64" fill="#4B5F83" id="circle" r="64"/><g id="icon"><path d="M95,96H33c-2.2,0-4-1.8-4-4V37c0-2.2,1.8-4,4-4h62c2.2,0,4,1.8,4,4v55C99,94.2,97.2,96,95,96z" fill="#FFFFFF" id="bg"/><g id="text"><rect fill="#E6E6E6" height="4" id="XMLID_2_" width="33" x="56" y="57"/><rect fill="#E6E6E6" height="4" id="XMLID_7_" width="33" x="56" y="65"/><rect fill="#E6E6E6" height="4" id="XMLID_8_" width="50" x="39" y="73"/><rect fill="#E6E6E6" height="4" id="XMLID_9_" width="50" x="39" y="81"/></g><rect fill="#22A7F0" height="12" id="img" width="12" x="39" y="57"/><path d="M95,33H33c-2.2,0-4,1.8-4,4v4.1V42v4h70v-4v-0.9V37C99,34.8,97.2,33,95,33z" fill="#E6E6E6" id="header"/><circle cx="36" cy="39.8" fill="#CF000F" id="red" r="2"/><circle cx="42" cy="39.8" fill="#E67E22" id="orange" r="2"/><circle cx="48" cy="39.8" fill="#26A65B" id="green" r="2"/></g></svg>
                                    <p className='my-auto text-white text-2xl font-bold pl-2 '
                                    >Blog</p>
                                </div>
                                <DateCard date={date} />
                            </>
                        ):(
                            <>
                                <div className='flex'>
                                    <svg className='-mt-3 -ml-6 ' width="75" height="75" viewBox="0 0 100 100"><path fill="#E37948" d="M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50-50-22.386-50-50 22.386-50 50-50z"/><g fill="#CC6D41"><path d="M70 33c-6.627 0-12 5.148-12 11.5 0 5.006 3.343 9.251 8 10.832v24.668c0 .504.385.959 1 1.311v6.689c0 .553.447 1 1 1v7.647c1.362-.526 2.698-1.104 4-1.743v-5.904c.553 0 1-.447 1-1v-6.689c.615-.352 1-.807 1-1.311v-24.668c4.658-1.581 8-5.826 8-10.832 0-6.352-5.372-11.5-12-11.5zM26 93.869v-15.869c.553 0 1-.447 1-1v-5.184c1.162-.413 2-1.512 2-2.816v-38c0-1.305-.838-2.402-2-2.816v-5.184c0-.552-.447-1-1-1v-15.869c-1.373.753-2.709 1.565-4 2.44v13.429c-.552 0-1 .448-1 1v5.184c-1.162.414-2 1.512-2 2.816v38c0 1.305.838 2.403 2 2.816v5.184c0 .553.448 1 1 1v13.43c1.291.874 2.627 1.686 4 2.439zM50 56.311c.615-.352 1-.807 1-1.311v-22.039c5.34-.261 8.842-2.593 10.613-5.975.775-.068 1.387-.814 1.387-1.736v-8.5c0-.902-.588-1.637-1.34-1.73-1.834-3.594-5.607-6.02-11.66-6.02-6.627 0-12 5.373-12 12 0 4.012 1.976 7.555 5 9.733v24.267c0 .504.385.959 1 1.311v6.689c0 .553.448 1 1 1v35.75c1.318.131 2.654.198 4 .225v-35.975c.553 0 1-.447 1-1v-6.689z"/></g><g fill="#E0E3E4"><path d="M23 92.073c1.294.832 2.628 1.606 4 2.318v-88.783c-1.372.712-2.706 1.486-4 2.319v84.146zM69 96.253c1.365-.562 2.698-1.186 4-1.861v-6.392h-4v8.253zM46 64v35.826c1.321.104 2.652.174 4 .174v-36h-4z"/></g><path fill="#C9CCCD" d="M23 92.073c.333.214.662.435 1 .642v-85.429c-.338.207-.667.427-1 .641v84.146z"/><path fill="#CCD0D2" d="M45 56h6v7c0 .553-.447 1-1 1h-4c-.553 0-1-.447-1-1v-7z"/><path fill="#B7BBBD" d="M46 63v-7h-1v7c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1z"/><g fill="#B7BBBD"><path d="M23 77v-6h-1v6c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1zM23 23c0-.553.447-1 1-1h-1c-.553 0-1 .447-1 1v6h1v-6z"/></g><path fill="#CCD0D2" d="M27 22h-4c-.553 0-1 .447-1 1v6h6v-6c0-.553-.447-1-1-1zm-5 55c0 .553.447 1 1 1h4c.553 0 1-.447 1-1v-6h-6v6z"/><path fill="#F4F4F7" d="M23 28h4c1.657 0 3 1.344 3 3v38c0 1.657-1.343 3-3 3h-4c-1.657 0-3-1.343-3-3v-38c0-1.656 1.343-3 3-3zM64 21c0-6.627-3.979-12-13-12-6.627 0-12 5.373-12 12 0 4.011 1.976 7.554 5 9.733v24.267c0 1.104 1.791 2 4 2s4-.896 4-2v-22.039c8.125-.398 12-5.593 12-11.961z"/><path fill="#EAEAED" d="M42 21c0-6.191 4.69-11.285 10.711-11.929-.55-.045-1.118-.071-1.711-.071-6.627 0-12 5.373-12 12 0 4.011 1.976 7.554 5 9.733v24.267c0 1.104 1.791 2 4 2 .531 0 1.036-.055 1.5-.148-1.465-.297-2.5-1.013-2.5-1.852v-22.698c1.253.444 2.595.698 4 .698.587 0 1.15-.027 1.695-.074-6.012-.65-10.695-5.74-10.695-11.926z"/><g fill="#7D7E80"><path d="M62.5 15c-.828 0-1.5.783-1.5 1.75v8.5c0 .967.672 1.75 1.5 1.75l.104-.012c.928-1.763 1.396-3.803 1.396-5.988 0-2.18-.44-4.219-1.34-5.981l-.16-.019zM51 20.5c0-.828-.672-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5h3c.828 0 1.5-.672 1.5-1.5z"/></g><path fill="#CCD0D2" d="M68 81h6v7c0 .553-.447 1-1 1h-4c-.553 0-1-.447-1-1v-7z"/><path fill="#B7BBBD" d="M69 88v-7h-1v7c0 .553.447 1 1 1h1c-.553 0-1-.447-1-1z"/><path fill="#F4F4F7" d="M71 33c6.627 0 12 5.148 12 11.5s-5.373 11.5-12 11.5-12-5.148-12-11.5 5.373-11.5 12-11.5z"/><path fill="#7D7E80" d="M71 38c.553 0 1 .447 1 1v2c0 .553-.447 1-1 1s-1-.447-1-1v-2c0-.553.447-1 1-1z"/><path fill="#F4F4F7" d="M77 49h-6l-6-1c2.103 2.104 2 7 2 7v25c0 1.104 1.791 2 4 2s4-.896 4-2v-25s-.103-3.896 2-6z"/><g fill="#E8E8EA"><path d="M67 55s.038-1.874-.43-3.802c-3.344-2.04-5.57-5.616-5.57-9.698 0-1.632.359-3.182.999-4.588-1.861 2.026-2.999 4.676-2.999 7.588 0 5.005 3.343 9.251 8 10.832v-.332zM75.212 52.789c-.237 1.237-.212 2.211-.212 2.211v.337c3.138-1.066 5.679-3.342 7.001-6.249-1.735 1.889-4.105 3.218-6.789 3.701z"/></g><path fill="#C9CCCD" d="M46 99.826l1 .076v-35.902h-1v35.826zM69 96.253c.336-.138.668-.28 1-.425v-7.828h-1v8.253z"/><path fill="#E8E8EA" d="M23 69v-38c0-1.656 1.343-3 3-3h-3c-1.657 0-3 1.344-3 3v38c0 1.657 1.343 3 3 3h3c-1.657 0-3-1.343-3-3z"/><path fill="#E9EAEE" d="M24 41h2c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2h-2c-1.104 0-2-.896-2-2v-16c0-1.104.896-2 2-2z"/><path fill="#D1D2D6" d="M26 41h-2c-1.104 0-2 .896-2 2v2c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v-2c0-1.104-.896-2-2-2z"/><path fill="#FDFDFD" d="M26 59h-2c-1.104 0-2-.896-2-2v2c0 1.104.896 2 2 2h2c1.104 0 2-.896 2-2v-2c0 1.104-.896 2-2 2z"/></svg>
                                    <p className='my-auto text-white text-2xl font-bold pl-2 '>Podcast</p>
                                </div>
                                <DateCard date={date} />
                            </>
                        
                        )
                    }
                </div>
                <p className='font-semibold text-xl p-2'>
                    {data['media_title'].S}
                </p>
            </div>
            <div
                className='border-t-2'
            >
                <div className={`overflow-hidden transition-all duration-300 ${state?"max-h-full opacity-100":"max-h-0 opacity-0"}`}>
                    <p className="p-2">{data['media_content'].S}</p>
                </div>
                <button 
                    className="underline text-blue-400 block mx-auto"
                    onClick={() => {
                        state?setState(false):setState(true)
                    }}    
                >read more</button>

                <button 
                    className='uppercase hover:scale-105 transform hover:bg-gray-400 transition-all mx-auto block bg-gray-300 rounded my-4 p-2'
                    onClick={
                        () => window.location.href = data['media_source'].S
                    }
                >{data['media_type'].S === "BLOG"?"read":"listen"}</button>
            </div>
        </div>
    )
}
export default Blog;