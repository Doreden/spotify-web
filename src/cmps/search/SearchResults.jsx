import { playSingleSong } from "../../store/actions/player.action"
import { PlaylistSongPreview } from "../station/stationDetails/PlaylistSongPreview"
import { TopResult } from "./TopResult"
import { StationList } from "../StationList"

export function SearchResults({ searchResults, resultsStations }) {

    function onPlaySong(song) {
        playSingleSong(song)
    }

    if (!searchResults) return
    return (
        <div className="search-results">
            <TopResult song={searchResults[0]} onPlaySong={onPlaySong} />
            <div className="rest-of-results">
                {searchResults?.slice(1).map((song, idx) => (
                    <div onDoubleClick={() => onPlaySong(searchResults[idx + 1])} key={song.id} className="rest-result">
                        <PlaylistSongPreview key={song.id.videoId} song={song} />
                    </div>
                ))}
            </div>
            <StationList stations={resultsStations} listTitle={'Related Playlists'} />
        </div>
    )
}

