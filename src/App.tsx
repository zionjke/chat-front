import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./store/store";
import {createConnection, destroyConnection, sendMessage, setClientName} from "./store/chatReducer";


function App() {

    const dispatch = useDispatch();
    const messages:Array<any> = useSelector((state: AppState) => state.chat.messages);

    useEffect(() => {
        dispatch(createConnection());

        return () => {
            dispatch(destroyConnection())
        }
    }, []);





    const [message, setMessage] = useState('hello');

    const [name, setName] = useState<string>('');

    const messagesBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesBlockRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

    const sendMessageHandler = (): void => {
        dispatch(sendMessage(message));
        setMessage('')
    };





    return (
        <div className="App">
            <div>
                <div style={{
                    border: "1px solid black",
                    padding: "10px",
                    height: "300px",
                    width: "300px",
                    overflowY: "scroll"
                }}>
                    {
                        messages &&
                        messages.map(m => (
                            <div  key={m.id}>
                                <b>{m.user.name}:</b>
                                {m.message}
                                <hr/>
                            </div>
                        ))
                    }
                    <div ref={messagesBlockRef}></div>
                </div>
                <div>
                    <input type="text" placeholder="Введите имя" value={name}
                           onChange={e => setName(e.currentTarget.value)}/>
                    <button onClick={() => {setClientName(name)}}>Send name</button>
                </div>
                <div>
                     <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}>
                </textarea>
                    <button onClick={sendMessageHandler}>Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
