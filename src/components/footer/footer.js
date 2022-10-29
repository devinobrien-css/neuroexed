import React, { useState } from 'react';
import './footer.css'; //contains styles specific to the footer 
import Modal from '../modals/modal';
import { useRecoilState } from "recoil";
import { pageState } from "../../atom";
import { message } from '../../schema/object_schema';
import { putData } from '../../access/dba';

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
                <div className='bg-white py-6 px-2 rounded w-[60vw]'>
                    <p className='font-bold text-2xl text-center'>Report a Bug</p>
                    <div className='pb-2'>
                        <p>Location</p>
                        <input 
                            className='w-full shadow-lg'
                            value={location}
                            placeholder='location of bug...'
                            onChange={(event) => {setLocation(event.target.value)}}
                        />
                    </div>
                    <div>
                        <p>Description</p>
                        <textarea
                            className='w-full shadow-lg'
                            value={content}
                            placeholder='description of bug...'
                            onChange={(event) => {setContent(event.target.value)}}
                        ></textarea>
                    </div>
                    <button 
                        className='rounded bg-blue-300 px-2 block mx-auto'
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
            <div className='bg-white py-6 px-2 rounded w-[60vw]'>
                <p className='font-bold text-2xl'>Contact Us</p>

                <div>
                    <p>From</p>
                    <input 
                        value={from}
                        placeholder='email or name...'
                        onChange={(event) => {setFrom(event.target.value)}}
                    />
                </div>
                <div>
                    <p>Subject</p>
                    <input 
                        value={subject}
                        placeholder='topic of message...'
                        onChange={(event) => {setSubject(event.target.value)}}
                    />
                </div>
                <div>
                    <p>Content</p>
                    <textarea
                        value={content}
                        placeholder='message content...'
                        onChange={(event) => {setContent(event.target.value)}}
                    ></textarea>
                </div>
                <button 
                    className='rounded bg-blue-300 px-2 block mx-auto'
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
        <div className='footer'>
            <div>
                <p>CONTACT</p>
                <div>
                    <button onClick={() => Modal(<EmailModalContent />)}>Send us a Message</button>
                    <button onClick={() => setPage('/people')}>Email a staff member</button>
                    <button onClick={() => Modal(<BugModalContent />)}>Report a bug</button>
                </div>
            </div>
            <div>
                <p>OUTREACH</p>
                <div>
                    <button onClick={() => window.location.href = 'http://otherlobe.com/'}>The Other Lobe Blog</button>
                    <button onClick={() => setPage('/publications')}>Our Lab's Publications</button>
                    <button onClick={() => window.location.href = 'https://experienced.simplecast.com/'}>Simplecast Podcast</button>
                </div>
            </div>
            <div>
                <p>AFFILIATES</p>
                <div>
                    <button onClick={() => window.location.href = 'https://waceinc.org/'}>World Association of Cooperative Education</button>
                    <button onClick={() => window.location.href = 'https://thecenterforsympatheticintelligence.org/'}>Center for Sympathetic Intelligence</button>
                    <button onClick={() => window.location.href = 'https://www.iq4.com/'}>IQ4 Transforming the Learning Economy</button>
                </div>
            </div>
        </div>
    )
}


export default Footer;