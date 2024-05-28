import { useState } from "react"

import previous_song from '../../assets/imgs/previous_song.svg'
import { ReactSVG } from "react-svg"

export function PlayerControls({ togglePlay }) {

    return (
        <div className="player-controls">
            <ReactSVG src={previous_song} style={{ width: 50, height: 50 }} />
            <button onClick={togglePlay}>Play</button>
        </div>
    )
}