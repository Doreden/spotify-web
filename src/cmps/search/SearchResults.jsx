import { useEffect, useState } from "react"
import { PlaylistSongPreview } from "../station/stationDetails/PlaylistSongPreview"
import { utilService } from "../../services/util.service"

export function SearchResults({ searchResults }) {

    const [results, setResults] = useState(null)

    useEffect(() => {
        console.log("1")
        if (searchResults) {
            console.log("2")
            formatResults(searchResults)
        }
    }, [searchResults])

    function formatResults(searchResults) {
        const formattedResults = searchResults.map((item) => ({
            id: item.id.videoId,
            title: utilService.formatVideoTitle(item.snippet.title).title,
            artist: utilService.formatVideoTitle(item.snippet.title).artist,
            imgURL: item.snippet.thumbnails.default.url
        }))
        setResults((prevResults) => formattedResults)
        console.log(formattedResults)
    }

    if (!results) return

    return (
        <div className="search-results">
            <SongResults results={results} />
        </div>
    )
}


export function SongResults({ results }) {

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