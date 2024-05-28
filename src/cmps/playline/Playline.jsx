import { useRef, useState } from "react"
import { PlayerControls } from "./PlayerControls"

export function Playline() {


    const playerRef = useRef()

    function togglePlay() {
        setIsPlaying((prevState) => !prevState)
    }

    return (
        <div className="playline">

            <div>Song Info</div>


            <PlayerControls togglePlay={togglePlay} />

            <div>Volume</div>
        </div>
    )
}