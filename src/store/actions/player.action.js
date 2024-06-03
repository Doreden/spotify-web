import { store } from "../store"
import { utilService } from "../../services/util.service"
import { SET_PLAY, TOGGLE_PLAY, SET_STATION, SET_SONG, TOGGLE_SHUFFLE, TOGGLE_REPEAT, SET_SONG_IDX, SET_PAUSE } from "../reducers/player.reducer";

export function togglePlay(isPlaying){
    try{
        store.dispatch({ type : TOGGLE_PLAY, isPlaying : !isPlaying})
    }catch(err){
        console.log(err)
    }
}

export function toggleShuffle(isShuffle){
    try{
        store.dispatch({type: TOGGLE_SHUFFLE, isShuffle : !isShuffle })
    }catch(err){
        console.log(err)
    }
}

export function toggleRepeat(isRepeat){
    try{
        store.dispatch({type: TOGGLE_REPEAT, isRepeat : !isRepeat })
    }catch(err){
        console.log(err)
    }
}

export function playStation(station, songIdx = 0){
    store.dispatch({type : SET_STATION, songs : station.songs})
    store.dispatch({type: SET_SONG, song : station.songs[songIdx]})
    store.dispatch({type: SET_PLAY})
}

export function playPrevious(playingSongIdx, queue, isShuffle, isRepeat){
    if(isShuffle){
        let randomIdx = utilService.getRandomInt(queue.length)
        if(queue.length > 1){
            while(randomIdx === playingSongIdx){
                randomIdx = utilService.getRandomInt(queue.length)
            }
        }
        store.dispatch({type: SET_SONG_IDX, songIdx: randomIdx})
        store.dispatch({type: SET_SONG, song: queue[randomIdx]})
    }else{
        if(playingSongIdx === 0){
            store.dispatch({type: SET_SONG_IDX, songIdx: 0})
            store.dispatch({type: SET_SONG, song: queue[0]}) 
            if(!isRepeat){
                store.dispatch({type: SET_PAUSE})
            }
        }else{
            store.dispatch({type: SET_SONG_IDX, songIdx: playingSongIdx-1})
            store.dispatch({type: SET_SONG, song: queue[playingSongIdx-1]}) 
        }
    }
}

export function playNext(playingSongIdx, queue, isShuffle, isRepeat){
    if(isShuffle){
        let randomIdx = utilService.getRandomInt(queue.length)
        if(queue.length > 1){
            while(randomIdx === playingSongIdx){
                randomIdx = utilService.getRandomInt(queue.length)
            }
        }
        store.dispatch({type: SET_SONG_IDX, songIdx: randomIdx})
        store.dispatch({type: SET_SONG, song: queue[randomIdx]})
    }else{
        if(playingSongIdx+1 === queue.length){
            store.dispatch({type: SET_SONG_IDX, songIdx: 0})
            store.dispatch({type: SET_SONG, song: queue[0]}) 
            if(!isRepeat){
                store.dispatch({type: SET_PAUSE})
            }
        }else{
            store.dispatch({type: SET_SONG_IDX, songIdx: playingSongIdx+1})
            store.dispatch({type: SET_SONG, song: queue[playingSongIdx+1]}) 
        }
    }
}

export function setPlay(){
    store.dispatch({type: SET_PLAY})
}

export function playSingleSong(song){
    store.dispatch({type:SET_STATION, queue : [song]})
    store.dispatch({type:SET_SONG, song})
    store.dispatch({type: SET_PLAY})
}