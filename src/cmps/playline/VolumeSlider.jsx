import { ReactSVG } from 'react-svg'
import mute from "../../assets/imgs/Volume0.svg"
import volumeUntil25 from "../../assets/imgs/Volume1.svg"
import volumeUntil75 from "../../assets/imgs/Volume2.svg"
import volumeUntil100 from "../../assets/imgs/Volume3.svg"


import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'

export function VolumeSlider({ setVolume, volume }) {

    const [svgSource, setSvgSource] = useState(volumeUntil100)
    const [isHovered, setIsHovered] = useState(false)

    function handleHover() {
        setIsHovered(() => true)
    }

    function handleHoverEnd() {
        setIsHovered(() => false)

    }

    useEffect(() => {
        const svgSource = getVolumeIcon(volume)
        setSvgSource((prevIdx) => svgSource)
    }, [volume])

    function handleOnChange(event) {
        const volume = _convertIntegerToDecimal(event.target.value)
        setVolume(volume)
    }
    function _convertIntegerToDecimal(integer) {
        return parseFloat((integer / 100).toFixed(2))
    }

    function getVolumeIcon(volume) {
        switch (true) {
            case volume === 0.0:
                return mute
            case volume > 0.0 && volume < 0.25:
                return volumeUntil25
            case volume >= 0.25 && volume < 0.75:
                return volumeUntil75
            case volume >= 0.75:
                return volumeUntil100
            default:
                return volumeUntil100
        }
    }

    return (
        <div className={`slider-container volume ${isHovered ? "active" : ""}`} onMouseEnter={handleHover} onMouseLeave={handleHoverEnd}>
            <div className='volume-svg-container'>
                <ReactSVG src={svgSource} />
            </div>

            <Slider aria-label="volume-slider"
                min={0} max={100} defaultValue={100}
                onChange={handleOnChange}
            />
        </div>
    )
}