export const SET_PLAY = 'SET_PLAY'
export const SET_PAUSE = 'SET_PAUSE'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const SET_STATION = 'SET_STATION'
export const SET_SONG = 'SET_SONG'
export const SET_SONG_IDX = 'SET_SONG_IDX'
export const SET_STATION_ID = 'SET_STATION_ID'

export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE'
export const TOGGLE_REPEAT = 'TOGGLE_REPEAT'

const initialState = { playingStationId : "", isPlaying: false, playingSongIdx: 0, queue: [], song: {}, isShuffle:false, isRepeat:false}

export function playerReducer(state = initialState, cmd){
    switch(cmd.type){
        case SET_STATION_ID:
            return {...state, playingStationId : cmd.playingStationId}
        case SET_PLAY:
            return {...state, isPlaying : true}
        case SET_PAUSE:
            return {...state, isPlaying : false}
        case TOGGLE_PLAY:
            return {...state, isPlaying : cmd.isPlaying}
        case SET_STATION:
            return {...state, queue : cmd.songs}
        case SET_SONG:
            return {...state, song : cmd.song}
        case SET_SONG_IDX:
                return {...state, playingSongIdx: cmd.songIdx}
        case TOGGLE_SHUFFLE:
            return {...state, isShuffle : cmd.isShuffle}
        case TOGGLE_REPEAT:
            return {...state, isRepeat : cmd.isRepeat}
        default:
            return state
    }   
}
