import Slider from '@mui/material/Slider'

export function VolumeSlider({ setVolume }) {

    function handleOnChange(event) {
        const volume = _convertIntegerToDecimal(event.target.value)
        setVolume(volume)
    }
    function _convertIntegerToDecimal(integer) {
        return parseFloat((integer / 100).toFixed(2))
    }

    return (
        <div className='volume-slider-container'>
            <Slider aria-label="volume-slider"
                min={0} max={100} defaultValue={100}
                onChange={handleOnChange}
            />
        </div>
    )
}