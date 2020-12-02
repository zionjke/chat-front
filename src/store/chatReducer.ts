import {api} from "../api/api";

const InitialState = {
    messages: []
};

const chatReducer = (state: any = InitialState, action: any) => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {
                ...state,
                messages: action.messages
            };
        case "NEW_MESSAGE_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, action.message]
            }

    }
    return state
};

export default chatReducer


const messagesReceived = (messages: any) => ({type: 'MESSAGES_RECEIVED', messages});
const newMessageReceived = (message: any) => ({type: 'NEW_MESSAGE_RECEIVED', message});

export const createConnection = () => (dispatch: any) => {
    api.createConnection();
    api.subscribe((messages: any) => {
        dispatch(messagesReceived(messages))
    }, (message: any) => {
        dispatch(newMessageReceived(message))
    })
};


export const setClientName = (name:string) => (dispatch: any) => {
    api.sendName(name)
};

export const sendMessage = (message:string) => (dispatch: any) => {
    api.sendMessage(message)
};

export const destroyConnection = () => (dispatch: any) => {
    api.destroyConnection()
};
