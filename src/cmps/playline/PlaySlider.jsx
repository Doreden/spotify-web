import Slider from '@mui/material/Slider'
import { utilService } from '../../services/util.service'
import { useRef } from 'react'



export function PlaySlider({ songProggresionData, onSeek }) {

    function handleOnChange(event) {
        onSeek(event.target.value)
    }

    return (
        <div className="play-slider-container">
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