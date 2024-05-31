import { Link } from "react-router-dom"

export function StationPreview({ station, isActiveId, onClick  }){
    const handleClick = (e) => {
        e.stopPropagation()
        onClick(station._id)
      }

    return (
        <Link to={`/station/${station.id}`} onClick={handleClick} >
            <div className="station-preview" onClick={() => onClick(station.id)}>
                <img src={station.albumCoverUrl}></img>
                <div className="station-preview-text">
                    <div className="station-name">{station.name}</div>
                    <div className="created-by">{station.createdBy}</div>
                </div>
            </div>
        </Link>
    )
}