import { useEffect, useState } from "react"
import { youtubeService } from "../services/youtube-service.js"
import { SearchInput } from "../cmps/search/SearchInput"
import { SearchResults } from "../cmps/search/SearchResults"
import { Browse } from "../cmps/search/Browse"

export function SearchPage() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        if (searchInput) {
            onSearch()
        }
    }, [searchInput])

    async function onSearch() {
        const results = await youtubeService.getSongBySearch(searchInput)
        setSearchResults((prevResults) => results)
    }

    return (
        <section className="search page">
            <SearchInput setSearchInput={setSearchInput} />
            {searchInput ? <SearchResults searchResults={searchResults} /> : <Browse />}
        </section>
    )
}