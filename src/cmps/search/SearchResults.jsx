import { playSingleSong } from "../../store/actions/player.action"
import { PlaylistSongPreview } from "../station/stationDetails/PlaylistSongPreview"

export function SearchResults({ searchResults }) {

    function onPlaySong(song) {
        console.log(song)
        playSingleSong(song)
    }

    if (!searchResults) return
    return (
        <div className="search-results">
            <div onDoubleClick={() => onPlaySong(searchResults[0])} className="top-result">
                <div className="song-details">
                    <img src={searchResults[0].imgURL}></img>
                    <div className="title-and-artist">
                        {searchResults[0].title &&
                            <>
                                <div className="title">
                                    {searchResults[0].title}
                                </div>
                            </>}
                        {searchResults[0].artist &&
                            <div className="artist">
                                {searchResults[0].artist}
                            </div>}
                    </div>
                </div>
            </div>

            <div className="rest-of-results">
                {searchResults?.slice(1).map((song, idx) => (
                    <div onDoubleClick={() => onPlaySong(searchResults[idx + 1])} key={song.id} className="rest-result">
                        <PlaylistSongPreview key={song.id.videoId} song={song} />
                    </div>
                ))}
            </div>
        </div>
    )
}

