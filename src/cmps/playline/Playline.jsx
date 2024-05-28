import { useRef, useState } from "react"
import { PlayerControls } from "./PlayerControls"
import ReactPlayer from "react-player"

export function Playline() {

    // Will be moved to store
    const [isPlaying, setIsPlaying] = useState(false)


    const playerRef = useRef()

    function togglePlay() {
        setIsPlaying((prevState) => !prevState)
    }

    return (

        <div className="playline">

            <div>Song Info</div>

            <div>
                <PlayerControls togglePlay={togglePlay} />
                <ReactPlayer playing={isPlaying} url='https://www.youtube.com/watch?v=3oK22ll4cxw' width="0" height="0" />
            </div>

            <div>Volume</div>

        </div>

    )
}