import { legacy_createStore as createStore, combineReducers } from 'redux'
import { stationReducer } from './reducers/station.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    stationModule : stationReducer,
    userModule : userReducer
})

export const store = createStore(rootReducer)























// function createStore(reducer){
//     let state = reducer(undefined)
//     let listeners = []


//     function getState(){

//     }

//     // Command consists of a Type, and data to change
//     function dispach(command){
//         state = reducer(state, command)
//         // Invoke every function in listeners array
//         listeners.forEach(listener => listener())
//     }

//     // * Listener is a function
//     function subscribe(listener){
//         listeners.push(listener)

//         return () => {
//             listeners = listener.filter(currListener => currListener !== listener)
//         }
//     }

//     return {
//         getState,
//         dispach,
//         subscribe
//     }
// }