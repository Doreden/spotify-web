

export function StationPreview({ station }){


    return (
        <div className="station-preview">
            <img src={station.albumCoverUrl}></img>
            <div className="station-preview-text">
                <div className="station-name">{station.name}</div>
                <div className="created-by">{station.createdBy.username}</div>
            </div>
        </div>
    )
}