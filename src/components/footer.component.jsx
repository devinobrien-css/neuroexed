import React, { useState } from 'react';
import Modal from './modals/modal';
import { useRecoilState } from "recoil";
import { pageState } from "../atom";
import { message } from '../schema/object_schema';
import { putData } from '../access/dba';

const BugModalContent = () => {
    const [sent,setSent] = useState(false)
    const [location,setLocation] = useState('')
    const [content,setContent] = useState('')

        if(sent){
            return (
                <div className='bg-white py-6 px-2 rounded w-[60vw]'>
                    <p>Bug Reported!</p>
                </div>
            )
        }
        else{
            return(
                <div className='bg-white rounded-xl overflow-clip md:w-[60vw] w-[90vw] pb-2'>
                    <div className=' w-full bg-cover bg-center bg-dark-hex'>
                        <p className='font-light text-6xl p-6 text-white'>Report a Bug</p>
                    </div>
                    <div className='shadow-lg rounded p-4 w-full md:w-4/5 mx-auto'>
                        <div className='pb-2'>
                            <p>Location</p>
                            <input 
                                className='w-full outline-none'
                                value={location}
                                placeholder='location of bug...'
                                onChange={(event) => {setLocation(event.target.value)}}
                            />
                        </div>
                        <div>
                            <p>Description</p>
                            <textarea
                                className='w-full border-0 p-0 rounded'
                                value={content}
                                placeholder='description of bug...'
                                onChange={(event) => {setContent(event.target.value)}}
                            ></textarea>
                        </div>
                    </div>
                    <button 
                        className='rounded bg-blue-300 px-2 block mx-auto mt-2'
                        onClick={
                            async () => {
                                var timestamp = new Date().getTime();

                                await putData(
                                    'messages',
                                    {},
                                    message(
                                        "error-"+timestamp,
                                        "Error Reporter",
                                        location,
                                        content,
                                        timestamp
                                    )
                                )

                                setContent('')
                                setLocation('')
                                setSent(true)
                            }
                        }
                    >send</button>
                </div>
            )
        }
}

const EmailModalContent = () => {
    const [sent,setSent] = useState(false)
    const [from,setFrom] = useState('')
    const [subject,setSubject] = useState('')
    const [content,setContent] = useState('')

    if(sent){
        return (
            <div className='bg-white py-6 px-2 rounded w-[60vw]'>
                <p>Message Sent!</p>
            </div>
        )
    }
    else{
        return (
            <div className='bg-white rounded-xl overflow-clip md:w-[60vw] w-[90vw] pb-2'>
                <div className=' w-full bg-cover bg-center bg-dark-hex'>
                    <p className='font-light text-6xl p-6 text-white'>Contact NeuroExed</p>
                </div>

                <div className='shadow-lg rounded p-4 w-full md:w-4/5 mx-auto'>
                    <div className='w-full'>
                        <p className='text-xl'>From</p>
                        <input 
                            value={from}
                            className="w-full focus:outline-none"
                            placeholder='email or name'
                            onChange={(event) => {setFrom(event.target.value)}}
                        />
                    </div>
                    <div className='w-full'>
                        <p className='text-xl'>Subject</p>
                        <input 
                            value={subject}
                            className="w-full focus:outline-none"
                            placeholder='topic of message'
                            onChange={(event) => {setSubject(event.target.value)}}
                        />
                    </div>
                    <div className='w-full'>
                        <p className='text-xl'>Message</p>
                        <textarea
                            value={content}
                            className="border-0 w-full p-0 rounded focus:outline-none"
                            placeholder='Hey there,'
                            onChange={(event) => {setContent(event.target.value)}}
                        ></textarea>
                    </div>
                </div>
                <button 
                    className='rounded bg-blue-300 px-2 block mx-auto my-4'
                    onClick={
                        async () => {
                            
                            var timestamp = new Date().getTime();

                            await putData(
                                'messages',
                                {},
                                message(
                                    "message-"+timestamp,
                                    from,
                                    subject,
                                    content,
                                    timestamp
                                )
                            )

                            setFrom('')
                            setSubject('')
                            setContent('')

                            setSent(true)
                        }
                    }
                >send</button>
            </div>
        )
    }
}


const Footer = () => {
    const [,setPage] = useRecoilState(pageState)

    return (
        <div className='md:flex bg-dark-hex rounded-xl bg-no-repeat bg-cover bg-center p-2 md:p-8'>
            <div className='w-full md:w-1/3'>
                <p className='text-white uppercase border-b-4 border-white text-2xl'>CONTACT</p>
                <div className='flex flex-col'>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => Modal(<EmailModalContent />)}>Send us a Message</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => setPage('people')}>Email a staff member</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => Modal(<BugModalContent />)}>Report a bug</button>
                </div>
            </div>
            <div className='w-full md:w-1/3'>
                <p className='text-white uppercase border-b-4 border-white text-2xl'>OUTREACH</p>
                <div className='flex flex-col'>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => window.location.href = 'http://otherlobe.com/'}>The Other Lobe Blog</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => setPage('/publications')}>Our Lab's Publications</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => window.location.href = 'https://experienced.simplecast.com/'}>Simplecast Podcast</button>
                </div>
            </div>
            <div className='w-full md:w-1/3'>
                <p className='text-white uppercase border-b-4 border-white text-2xl'>AFFILIATES</p>
                <div className='flex flex-col'>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => window.location.href = 'https://waceinc.org/'}>World Association of Cooperative Education</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => window.location.href = 'https://thecenterforsympatheticintelligence.org/'}>Center for Sympathetic Intelligence</button>
                    <button className="text-white text-left mb-3 text-xl" onClick={() => window.location.href = 'https://www.iq4.com/'}>IQ4 Transforming the Learning Economy</button>
                </div>
            </div>
        </div>
    )
}


export default Footer;