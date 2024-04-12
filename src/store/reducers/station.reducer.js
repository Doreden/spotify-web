const initialState = { stations: [] }

export const LOAD_STATIONS = 'LOAD_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'

export function stationReducer(state = initialState, cmd){
    switch(cmd.type){
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        case ADD_STATION:
            return {...state, stations: [...state.stations, cmd.newStation] }
        case REMOVE_STATION:
            return {...state, stations: state.stations.filter(station => station.id !== cmd.stationId)}
        default:
            return state
    }
}




