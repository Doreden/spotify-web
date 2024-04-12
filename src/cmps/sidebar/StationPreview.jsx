import { Link } from "react-router-dom";
import { removeStation } from "../../store/actions/station.action";

export function StationPreview({ station }){

    function handleRemoveStation(stationId){
        removeStation(stationId)
    }

    return (
        <Link to={`/station/${station.id}`}>
            <div className="station-preview">
                <img src={station.albumCoverUrl}></img>
                <div className="station-preview-text">
                    <div className="station-name">{station.name}</div>
                    <div className="created-by">{station.createdBy.username}</div>
                </div>
            </div>
        </Link>
    )
}