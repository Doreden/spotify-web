import { Link } from "react-router-dom"
import Play from '../../assets/imgs/play2.svg'
import { ReactSVG } from "react-svg"
import { playStation } from "../../store/actions/player.action"
import { stationService } from "../../services/station.service"
import { useState } from "react"

export function StationPreview({ station, handleStationClick, context, currentLocation }) {

    const [isHover, setIsHover] = useState(false)

    function handleClick(ev) {
        // ev.stopPropagation()
        // handleStationClick(station._id)
    }

    // let isActive
    // if (currentLocation) {
    //     const pathAsArray = currentLocation.split("/")

    //     if (pathAsArray[1] === "station") {
    //         isActive = pathAsArray[2] === station._id
    //     }
    // }

    async function onPlayStation(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const fullStation = await stationService.getById(station._id)
        if (fullStation.songs.length > 0) {
            playStation(fullStation, 0)
        }
    }

    function handleMouseEnter() {
        setIsHover(() => true)
    }

    function handleMouseLeave() {
        setIsHover(() => false)
    }

    if (!station) return
    return (
        <Link to={`/station/${station._id}`} onClick={handleClick} >
            <div className={`${context}-station-preview`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img className='station-cover-img' src={`${station.imgUrl}`}></img>
                {context === 'main' && isHover &&
                    <button onClick={onPlayStation} className="station-play-button">
                        <div className="play-svg-container">
                            <ReactSVG src={Play} />
                        </div>
                    </button>
                }
                <div className="station-preview-text">
                    <div className="station-name">{station.name}</div>

                </div>
            </div>
        </Link>
    )
}

