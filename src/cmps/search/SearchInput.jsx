export function SearchInput({setSearchInput}){






    function handleSubmit(event){
        event.preventDefault()
        const searchInput = event.target.elements.searchInput.value
        setSearchInput((prevSeach) => searchInput)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input id="searchInput" name="searchInput" className="search-input" placeholder="What do you want to play?" ></input>
            </form>
        </>
    )
}