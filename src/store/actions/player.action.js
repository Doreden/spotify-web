import { store } from "../store";
import { TOGGLE_PLAY } from "../reducers/player.reducer";

export function togglePlay(isPlaying){
    store.dispatch({ type : TOGGLE_PLAY, isPlaying})
}