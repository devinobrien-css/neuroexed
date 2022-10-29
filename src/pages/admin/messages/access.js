import { useState, useEffect } from "react"
import { fetchData } from "../../../access/dba";



const MessageAccess = () => {
    const [messages,setMessages] = useState()
    const getNews = async () => {
        const res = await fetchData('messages');

        if(res === "ERROR"){
            setMessages([]);
        }
        else
            setMessages(res.Items)
    };

    useEffect(() => {
        getNews();
    }, []);

    if(messages){
        const message_map = {}

        messages.forEach(message => {
            message_map[parseInt(message.timestamp.N)] = message;
        });

        return (
            <div>
                {
                    Object.keys(message_map).sort().reverse().map(message => {

                        const current = message_map[message]
                        return(
                            <div className="shadow-lg flex justify-between px-2">
                                <div>
                                    <p className="font-bold">From :</p> 
                                    <p> {current.data.M.from.S}</p>
                                    
                                    <p className="font-bold">Subject :</p> 
                                    <p> {current.data.M.subject.S}</p>
                                    
                                    <p className="font-bold">Message :</p> 
                                    <p> {current.data.M.content.S}</p>
                                </div>
                                <div>
                                    <p>{new Date(parseInt(current.timestamp.N)).toLocaleDateString()}</p>
                                    <p>{new Date(parseInt(current.timestamp.N)).toLocaleTimeString()}</p>
                                </div>
                            </div>
                                
                        )
                    })
                }
            </div>
        )
    }
    else {
        return (
            <p>loading</p>
        )
    }
}
export default MessageAccess