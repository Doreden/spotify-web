import { legacy_createStore as createStore, combineReducers } from 'redux'
import { stationReducer } from './reducers/station.reducer'

const rootReducer = combineReducers({
    stationModule : stationReducer
})

export const store = createStore(rootReducer)



store.subscribe(() => {
    console.log('current state: ', store.getState())
})























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