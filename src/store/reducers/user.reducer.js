import { UserService } from "../../services/user.service"


const initialState = { user: null }

export const LOAD_USER = 'LOAD_USER'
export const LOAD_STATIONS = 'LOAD_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_USER = 'SET_USER'

export function userReducer(state = initialState, cmd){
    switch(cmd.type){
        case LOAD_USER:
            return {...state, user: UserService.createMinimalUser(cmd.user)}
        case SET_USER:
            return {...state, user: cmd.user}
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        case ADD_STATION:
            return {...state, user : {...state.user, likedStations: [...state.user.likedStations, cmd.newStation] } }
        case REMOVE_STATION:
            return {...state, stations: state.stations.filter(station => station.id !== cmd.stationId)}
       
        default:
            return state
    }
}

