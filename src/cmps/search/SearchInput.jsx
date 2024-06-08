import { ReactSVG } from "react-svg"
import Search from "../../assets/imgs/search.svg"

export function SearchInput({ setSearchInput }) {

    function handleSubmit(event) {
        event.preventDefault()
        const searchInput = event.target.elements.searchInput.value
        setSearchInput((prevSearch) => searchInput)
    }

    return (
        <div className="search-header">
            <div className="search-input-container">
                <div className="search-svg-container">
                    <ReactSVG src={Search} />
                </div>
                <form onSubmit={handleSubmit}>
                    <input id="searchInput" name="searchInput" className="search-input" placeholder="What do you want to play?" >
                    </input>
                </form>
            </div>
        </div>
    )
}