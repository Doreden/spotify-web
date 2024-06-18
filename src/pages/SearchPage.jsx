// Hooks
import { useEffect, useState } from "react"
// Services
import { youtubeService } from "../services/youtube-service.js"
import { stationService } from "../services/station.service.js"
// Components
import { SearchResults } from "../cmps/search/SearchResults"
import { SearchInput } from "../cmps/search/SearchInput"

export function SearchPage() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [resultsStations, setResultsStations] = useState(null)

    useEffect(() => {
        if (searchInput) {
            onSearch()
            searchStations()
        }
    }, [searchInput])

    async function onSearch() {
        const songResults = await youtubeService.getSongBySearch(searchInput)
        setSearchResults((prevResults) => songResults)
    }

    async function searchStations() {
        const stationResults = await stationService.query({ txt: searchInput })
        setResultsStations((prevStations) => stationResults)
    }

    return (
        <section className="search page">
            <SearchInput setSearchInput={setSearchInput} />
            {searchInput &&
                <SearchResults resultsStations={resultsStations} searchResults={searchResults} />
            }
        </section>
    )
}