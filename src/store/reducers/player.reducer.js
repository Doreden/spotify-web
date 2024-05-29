export const SET_PLAY = 'SET_PLAY'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SET_STATION = 'SET_STATION'
export const SET_SONG = 'SET_SONG'

const initialState = { isPlaying: false, playingSongIdx: -1, queue: [], song: {}}

export function playerReducer(state = initialState, cmd){
    switch(cmd.type){
        case SET_PLAY:
            return {...state, isPlaying : true}
        case TOGGLE_PLAY:
            return {...state, isPlaying : cmd.isPlaying}
        case SET_STATION:
            return {...state, queue : cmd.songs}
        case SET_SONG:
            return {...state, song : cmd.song}
        default:
            return state
    }   
}
