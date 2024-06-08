import Slider from '@mui/material/Slider'
import { utilService } from '../../services/util.service'
import { useRef, useState } from 'react'



export function PlaySlider({ songProggresionData, onSeek }) {

    const [isHovered, setIsHovered] = useState(false)


    function handleOnChange(event) {
        onSeek(event.target.value)
    }

    function handleHover() {
        console.log("hover")
        setIsHovered(() => true)
    }

    function handleHoverEnd() {
        setIsHovered(() => false)

    }

    return (
        <div className={`slider-container play ${isHovered ? "active" : ""}`} onMouseEnter={handleHover} onMouseLeave={handleHoverEnd}>
            <div className="time-elapsed">
                {utilService.formatSongLength(Math.floor(songProggresionData.playedSeconds))}
            </div>
            <Slider aria-label="play-slider"
                value={songProggresionData.playedSeconds}
                min={0}
                max={songProggresionData.songDuration}
                onChange={handleOnChange}
            />
            <div className="song-duration">
                {songProggresionData.songDuration ? utilService.formatSongLength(songProggresionData.songDuration) : '0:00'}
            </div>
        </div>
    )

}