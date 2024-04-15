import { useEffect, useState } from "react";
import { SearchInput } from "../cmps/search/SearchInput";
import { SearchResults } from "../cmps/search/SearchResults";
import { Browse } from "../cmps/search/Browse";

export function Search(){

    const API_KEY = 'AIzaSyCho4TT_0wURSDbQ0zGNEmtyHLte3-M0Mg'

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    


    async function Search(){
        // const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCho4TT_0wURSDbQ0zGNEmtyHLte3-M0Mg&q=${searchInput}&part=snippet&type=video`)
        // const results = await response.json()
        // setSearchResults((prevResults) => results)
        // localStorage.setItem('search', JSON.stringify(results))
    }


    useEffect(() => {
        console.log(searchInput)
        Search()

    },[searchInput])

    return (
        <>
            <section className="search page">
                <SearchInput setSearchInput={setSearchInput}/>
                {searchInput? <SearchResults searchResults={searchResults}/> : <Browse/>}
            </section>
        </>
    )
}