const initialState = { stations: [] }

export const LOAD_STATIONS = 'LOAD_STATIONS'

export function stationReducer(state = initialState, cmd){
    switch(cmd.type){
        case LOAD_STATIONS:
            return {...state, stations: cmd.newStations}
        default:
            return state
    }
}