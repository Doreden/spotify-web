const initialState = { user: null, stations : [] }

export const LOAD_STATIONS = 'LOAD_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATIONS = 'UPDATE_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_USER = 'SET_USER'
export const LIKE_SONG = 'LIKE_SONG'
export const REMOVE_FROM_LIKED_SONGS = 'REMOVE_FROM_LIKED_SONGS'

export function userReducer(state = initialState, cmd){
    switch(cmd.type){

        case SET_USER:
            return {...state, user: cmd.user}
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        case LIKE_SONG:
            return {...state, user : {...state.user, likedSongs : [...state.user.likedSongs, cmd.song]}}
        case REMOVE_FROM_LIKED_SONGS:
            return {...state, user : {...state.user, likedSongs : state.user.likedSongs.filter(song => song.id !== cmd.song.id)}}
        case ADD_STATION:
            return {...state, stations : [...state.stations, cmd.miniNewStation]  }
        case UPDATE_STATIONS:
            return {...state, user : {...state.user, likedStations: cmd.updatedStations } }
        case REMOVE_STATION:
            return {...state, stations : state.stations.filter(station => station._id !== cmd.stationId)}
       
        default:
            return state
    }
}

