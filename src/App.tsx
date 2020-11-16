import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://samurai-chat-back.herokuapp.com/');

function App() {

    useEffect(() => {

    }, []);

    const [messages, setMessages] = useState([
        {id: "dawdadas", message: "Hello", user: {id: "21555fsdf", name: "Artem"}},
        {id: "dawd4das", message: "Whats up?", user: {id: "215dza55fsdf", name: "Viktor"}}
    ]);

    const [message, setMessage] = useState('hello');

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
                        messages.map(m => (
                            <div key={m.id}>
                                <b>{m.user.name}:</b>
                                {m.message}
                                <hr/>
                            </div>
                        ))
                    }
                </div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}>
                </textarea>
                <button onClick={() => socket.emit('client-message-sent',message,setMessage('')) }>Send Message</button>
            </div>
        </div>
    );
}

export default App;
