import { useEffect, useState } from "react"
import { PlaylistSongPreview } from "../station/stationDetails/PlaylistSongPreview"

export function SearchResults({searchResults}){

    const [results,setResults] = useState(null)
    
    useEffect(() => {
        formatResults()
    },[])

    function formatResults(){
        const formattedResults = JSON.parse(localStorage.getItem('search')).items.map((item) => ({
            id : item.id.videoId,
            title : item.snippet.title,
            imgURL: item.snippet.thumbnails.default.url
        }))
        setResults((prevResults) => formattedResults)
        console.log(formattedResults)
    }

    if (!results) return

    return (
        <div className="search-results">
        
            {/* <div>{results? JSON.stringify(results) : ""}</div> */}
            <SongResults results={results}/>
        </div>
    )
}


export function SongResults({results}){


    return (
        <>
            <div className="top-result"></div>
        
        
            <div className="rest-of-results">
                {results?.map((song) => (
                    <div className="rest-result">
                        <PlaylistSongPreview song={song}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export function StationResults(){

}