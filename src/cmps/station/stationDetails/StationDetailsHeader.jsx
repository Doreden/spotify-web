import { NavHeader } from "../../header/NavHeader"
import { utilService } from "../../../services/util.service"

export function StationDetailsHeader({station}){


    return (
        <>
            <div className="station-details-header">
                    <div className="content">
                        <img src={station.albumCoverUrl} ></img>
                        <div className="station-info">
                            <h1 className="station-name">{station.name}</h1>
                            <div className="additional-info-line">
                                <span className="created-by">{station.createdBy.username}</span>
                                <span className="devider">•</span>
                                <span className="number-of-likes">{station.likedByUsers.length} Likes</span>
                                <span className="devider">•</span>
                                <span className="number-of-songs">{station.songs.length} Song{station.songs.length!==1? 's' : ''}</span>
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
