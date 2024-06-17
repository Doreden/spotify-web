import { useEffect, useState } from "react"
import { youtubeService } from "../services/youtube-service.js"
import { SearchInput } from "../cmps/search/SearchInput"
import { SearchResults } from "../cmps/search/SearchResults"
import { Browse } from "../cmps/search/Browse"
import { stationService } from "../services/station.service.js"

export function SearchPage() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [resultsStations, setResultsStations] = useState(null)

    useEffect(() => {
        if (searchInput) {
            onSearch()
            searchStations(searchInput)
        }
    }, [searchInput])

    async function onSearch() {
        const results = await youtubeService.getSongBySearch(searchInput)
        setSearchResults((prevResults) => results)
    }

    async function searchStations(txt) {
        const stations = await stationService.query({ txt })
        console.log(resultsStations)
        setResultsStations((prevStations) => stations)
    }

    return (
        <section className="search page">
            <SearchInput setSearchInput={setSearchInput} />
            {searchInput ? <SearchResults resultsStations={resultsStations} searchResults={searchResults} /> : <Browse />}
        </section>
    )
}