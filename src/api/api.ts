import io from "socket.io-client";

// export const socket = io('localhost:3005');


// socket.on('init-messages-published', (messages: any) => {
//     setMessages(messages)
// });
// socket.on('new-message-sent', (message: any) => {
//     setMessages(messages => [...messages, message])
// })

export const api = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io('localhost:3005');
    },

    subscribe(initMessagesHandler: (messages: any) => void, newMessageSentHandler: (message: any) => void) {
        this.socket?.on('init-messages-published', initMessagesHandler);
        this.socket?.on('new-message-sent', newMessageSentHandler)
    },

    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null
    },
    sendName(name:string) {
        this.socket?.emit('client-name-sent',name)
    },
    sendMessage(message:string) {
        this.socket?.emit('client-message-sent',message)
    }
};
