export const TOGGLE_PLAY = 'TOGGLE_PLAY'

const initialState = { isPlaying: false, playingSongIdx: -1, queue: [] }

export function playerReducer(state = initialState, cmd){
    switch(cmd.type){
        case TOGGLE_PLAY:
            return {...state, isPlaying : cmd.isPlaying}
        default:
            return state
    }   
}
