import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
    chat: chatReducer
});

export type AppState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store
