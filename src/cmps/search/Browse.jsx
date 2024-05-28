import { useRef, useState } from "react"
import YouTube from "react-youtube"

import ReactPlayer from "react-player"


export function Browse() {

    const [isPlaying, setIsPlaying] = useState(false)

    const playerRef = useRef()

    function togglePlay() {
        setIsPlaying((prevState) => !prevState)
    }

    return (
        <>
            {/* <div>Browse</div> */}
            {/* <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} ref={playerRef} /> */}

            <button onClick={togglePlay}>Play</button>
            <ReactPlayer
                ref={playerRef}
                url='https://www.youtube.com/watch?v=kXYiU_JCYtU'
                playing={isPlaying}
                width="0"
                height="0"
            />
        </>
    )
}