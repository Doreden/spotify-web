import { StationPreview } from "./sidebar/StationPreview"

export function StationList({ stations, listTitle }) {

    listTitle = "Your Playlists:"

    if (!stations) return
    console.log(stations[0])
    return (
        <div className="station-list-container">
            <div className="list-title">
                {listTitle}
            </div>
            <div className="station-list">
                {stations.map((station) => (<StationPreview station={station} context={'main'} key={station.id} />))}
            </div>
        </div>
    )
}