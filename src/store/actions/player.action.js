import { store } from "../store";
import { SET_PLAY, TOGGLE_PLAY, SET_STATION, SET_SONG } from "../reducers/player.reducer";

export function togglePlay(isPlaying){
    try{
        store.dispatch({ type : TOGGLE_PLAY, isPlaying})
    }catch(err){
        console.log(err)
    }
}

export function playStation(station, songIdx = 0){
    store.dispatch({type : SET_STATION, songs : station.songs})
    store.dispatch({type: SET_SONG, song : station.songs[songIdx]})
    store.dispatch({type: SET_PLAY})
}

export function setPlay(){
    store.dispatch({type: SET_PLAY})
}