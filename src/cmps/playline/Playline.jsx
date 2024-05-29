import { useRef, useState } from "react"
import { PlayerControls } from "./PlayerControls"
import ReactPlayer from "react-player"
import { useSelector } from "react-redux"
import { togglePlay } from "../../store/actions/player.action"


export function Playline() {

    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    // Will be moved to store
    // const [isPlaying, setIsPlaying] = useState(false)

    function onTogglePlay() {
        togglePlay(!isPlaying)
    }

    function onNextSong() {

    }

    function onPreviousSong() {

    }

    function toggleShuffle() {

    }

    function toggleRepeat() {

    }

    const state = {
        url: 'https://www.youtube.com/watch?v=3oK22ll4cxw',
        playing: isPlaying
    }

    return (

        <div className="playline">

            <div>Song Info</div>

            <div>
                <PlayerControls togglePlay={onTogglePlay} />
                {/* <ReactPlayer playing={isPlaying} url='https://www.youtube.com/watch?v=3oK22ll4cxw' width="0" height="0" /> */}
                <ReactPlayer {...state} width="0" height="0" />
                {/* </div> */}
            </div>

            <div>Volume</div>

        </div>

    )
}