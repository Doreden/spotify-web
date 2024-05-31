const initialState = { user: null }

export const LOAD_STATIONS = 'LOAD_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_USER = 'SET_USER'

export function userReducer(state = initialState, cmd){
    switch(cmd.type){

        case SET_USER:
            return {...state, user: cmd.user}
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        case ADD_STATION:
            return {...state, user : {...state.user, likedStations: [...state.user.likedStations, cmd.miniNewStation] } }
        case REMOVE_STATION:
            return {...state, user : {...state.user, likedStations : state.user.likedStations.filter(station => station.id !== cmd.stationId)} }
       
        default:
            return state
    }
}

