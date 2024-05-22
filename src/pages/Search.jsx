import { useEffect, useState } from "react"
import { SearchInput } from "../cmps/search/SearchInput"
import { SearchResults } from "../cmps/search/SearchResults"
import { Browse } from "../cmps/search/Browse"
import { stationService } from "../services/station.service"
import { utilService } from "../services/util.service"

export function Search() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)

    // TODO how to improve?
    useEffect(() => {
        if (searchInput) {
            Search()
        }
    }, [searchInput])

    async function Search() {
        const results = await stationService.getSongBySearch(searchInput)
        const formattedResults = formatResults(results)
        setSearchResults((prevFormattedResults) => formattedResults)
    }

    function formatResults(searchResults) {
        const formattedResults = searchResults.map((item) => ({
            id: item.id.videoId,
            title: utilService.formatVideoTitle(item.snippet.title).title,
            artist: utilService.formatVideoTitle(item.snippet.title).artist,
            imgURL: item.snippet.thumbnails.default.url
        }))
        return formattedResults
    }

    return (
        <>
            <section className="search page">
                <SearchInput setSearchInput={setSearchInput} />
                {searchInput ? <SearchResults searchResults={searchResults} /> : <Browse />}
            </section>
        </>
    )
}