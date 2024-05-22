import { useEffect, useState } from "react";
import { SearchInput } from "../cmps/search/SearchInput";
import { SearchResults } from "../cmps/search/SearchResults";
import { Browse } from "../cmps/search/Browse";
import { stationService } from "../services/station.service";

export function Search(){

    

    const [searchInput, setSearchInput] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    
    // TODO

    async function Search(){
        const results= await stationService.getSongBySearch(searchInput)
        setSearchResults(results)
     
    }

    // TO ASK how to improve?
    useEffect(() => {
        if(searchInput){
            Search()
        }
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