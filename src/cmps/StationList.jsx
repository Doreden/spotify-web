import { StationPreview } from "./sidebar/StationPreview"

export function StationList({ stations, listTitle }) {

    if (!stations) return
    
    return (
        <div className="station-list-container">
            <div className="list-title">
                {listTitle}
            </div>
            <div className="station-list">
                {stations.map((station) => (<StationPreview station={station} context={'main'} key={station._id} />))}
            </div>
        </div>
    )
}