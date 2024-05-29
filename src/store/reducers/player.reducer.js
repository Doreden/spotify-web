export const SET_PLAY = 'SET_PLAY'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SET_STATION = 'SET_STATION'
export const SET_SONG = 'SET_SONG'

export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const TOGGLE_REPEAT = 'TOGGLE_REPEAT'

const initialState = { isPlaying: false, playingSongIdx: -1, queue: [], song: {}, isShuffle:false, isRepeat:false}

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
        case TOGGLE_SHUFFLE:
            return {...state, isShuffle : cmd.isShuffle}
        case TOGGLE_REPEAT:
            return {...state, isRepeat : cmd.isRepeat}
        default:
            return state
    }   
}
