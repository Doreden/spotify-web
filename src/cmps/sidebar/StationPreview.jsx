import { Link } from "react-router-dom"

export function StationPreview({ station, OnStationClick, context, currentLocation }) {
    const handleClick = (e) => {
        e.stopPropagation()
        OnStationClick(station.id)
    }

    let isActive
    if (currentLocation) {
        const pathAsArray = currentLocation.split("/")

        if (pathAsArray[1] === "station") {
            isActive = pathAsArray[2] === station._id
        }
    }


    if (!station) return
    return (
        <Link to={`/station/${station._id}`} onClick={handleClick} >
            <div className={`${context}-station-preview ${isActive ? 'station-active' : ''} `}>
                <img src={`${station.imgUrl}`}></img>
                <div className="station-preview-text">
                    <div className="station-name">{station.name}</div>
                    <div className="created-by">{station.createdBy.username}</div>
                </div>
            </div>
        </Link>
    )
}

