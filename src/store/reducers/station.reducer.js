const initialState = { stations: [] }

export const LOAD_STATIONS = 'LOAD_STATIONS'
export const ADD_STATION = 'ADD_STATION'

export function stationReducer(state = initialState, cmd){
    switch(cmd.type){
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        case ADD_STATION:
            return {...state, stations: [...stations, cmd.station] }
        default:
            return state
    }
}




