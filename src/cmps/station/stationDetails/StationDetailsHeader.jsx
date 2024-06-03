import { useState } from "react"
import { utilService } from "../../../services/util.service"

export function StationDetailsHeader({ station }) {

    const [imgHover, setImgHover] = useState(false)

    function handleHover(isHover) {
        setImgHover((prevState) => isHover)
    }

    return (
        <>
            <div className="station-details-header">
                <div className="content">
                    <img onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} className="station-cover" src={imgHover ? 'spotify-web/imgs/change-cover.png' : `spotify-web/${station.imgUrl}`}></img>
                    <div className="station-info">
                        <h1 className="station-name">{station.name}</h1>
                        <div className="additional-info-line">
                            <span className="created-by">{station.createdBy.username}</span>
                            <span className="devider">•</span>
                            <span className="number-of-likes">{station.likedByUsers.length} Likes</span>
                            <span className="devider">•</span>
                            <span className="number-of-songs">{station.songs.length} Song{station.songs.length !== 1 ? 's' : ''}</span>
                            <span className="devider">•</span>
                            <span className="station-length">{utilService.formatStationLength(station.songs)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// TO ADD :
// Click On IMG -> "Fullscreens it"
