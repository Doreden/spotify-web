import { useEffect, useState } from "react";
import { SearchInput } from "../cmps/search/SearchInput";
import { SearchResults } from "../cmps/search/SearchResults";
import { Browse } from "../cmps/search/Browse";


export function Search(){
    
    const [searchInput, setSearchInput] = useState(null)
    
    useEffect(() => {
        console.log(searchInput)
    },[searchInput])

    return (
        <>
            <section className="search page">
                <SearchInput setSearchInput={setSearchInput}/>
                {searchInput? <SearchResults searchInput={searchInput}/> : <Browse/>}
            </section>
        </>
    )
}