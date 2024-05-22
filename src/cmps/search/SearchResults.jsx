import { PlaylistSongPreview } from "../station/stationDetails/PlaylistSongPreview"

export function SearchResults({ searchResults }) {

    return (
        <div className="search-results">
            <SongResults results={searchResults} />
        </div>
    )
}

export function SongResults({ results }) {

    if (!results) return
    return (
        <>
            <div className="top-result">
                <div className="song-details">
                    <img src={results[0].imgURL}></img>
                    <div className="title-and-artist">
                        {results[0].title &&
                            <>
                                <div className="title">
                                    {results[0].title}
                                </div>
                            </>}
                        {results[0].artist &&
                            <div className="artist">
                                {results[0].artist}
                            </div>}
                    </div>
                </div>
            </div>



            <div className="rest-of-results">
                {results?.slice(1).map((song) => (
                    <div key={song.id} className="rest-result">
                        <PlaylistSongPreview key={song.id.videoId} song={song} />
                    </div>
                ))}
            </div>
        </>
    )
}

export function StationResults() {

}