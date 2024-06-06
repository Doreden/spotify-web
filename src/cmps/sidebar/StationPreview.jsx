import { Link } from "react-router-dom"

export function StationPreview({ station, OnStationClick, context, isActiveId }) {
    const handleClick = (e) => {
        e.stopPropagation()
        OnStationClick(station.id)
    }

    if (!station) return
    return (
        <Link to={`/station/${station.id}`} onClick={handleClick} >
            <div className={`${context}-station-preview ${isActiveId ? 'station-active' : ''} `}>
                <img src={`${station.imgUrl}`}></img>
                <div className="station-preview-text">
                    <div className="station-name">{station.name}</div>
                    <div className="created-by">{station.createdBy.username}</div>
                </div>
            </div>
        </Link>
    )
}

