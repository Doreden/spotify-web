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

                            {/* TODO - on albums - release year, on playlists - how many likes */}
                            {/* <span className="year-released">{station.releaseYear}</span> */}
                            {/* <span className="devider">•</span> */}
                            <span className="number-of-songs">{station.songs.length} Songs</span>
                            <span className="devider">•</span>
                            <span className="station-length">{utilService.formatStationLength(station.songs)}</span>

                          <span className="year-released">{station.releaseYear}</span>
                            <span className="devider">•</span>
                            <span className="number-of-songs">{station.
                                songs.length} Songs</span>
                            {/* <span className="station-length"> Create Convertion Util Function </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// TO ADD :
// Click On IMG -> "Fullscreens it"
