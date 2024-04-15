import { useEffect, useState } from "react"

export function SearchResults({searchResults}){

    const [results,setResults] = useState(null)
    
    useEffect(() => {
        formatResults()
    },[])

    function formatResults(){
        const formattedResults = JSON.parse(localStorage.getItem('search')).items.map((item) => ({
            id : item.id.videoId,
            title : item.snippet.title
        }))
        setResults((prevResults) => formattedResults)
    }

    return (
        <>
            <div>{results? JSON.stringify(results) : ""}</div>
        </>
    )
}