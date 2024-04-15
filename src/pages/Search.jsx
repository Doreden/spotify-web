import { useEffect, useState } from "react";
import { SearchInput } from "../cmps/search/SearchInput";

export function Search(){
    
    const [searchInput, setSearchInput] = useState(null)
    
    useEffect(() => {
        console.log(searchInput)
    },[searchInput])

    return (
        <>
            <section className="search page">
                <SearchInput setSearchInput={setSearchInput}/>
            </section>
        </>
    )
}