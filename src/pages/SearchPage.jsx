import { useEffect, useState } from "react"
import { SearchInput } from "../cmps/search/SearchInput"
import { SearchResults } from "../cmps/search/SearchResults"
import { Browse } from "../cmps/search/Browse"
import { youtubeService } from "../services/youtube-service.js"

export function SearchPage() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)

    console.log(searchResults)

    // TODO how to improve?
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
        <>
            <section className="search page">
                <SearchInput setSearchInput={setSearchInput} />
                {searchInput ? <SearchResults searchResults={searchResults} /> : <Browse />}
            </section>
        </>
    )
}