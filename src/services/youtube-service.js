import { utilService } from "./util.service"

export const youtubeService = {
    getSongBySearch
}

async function getSongBySearch(searchInput) {
    if(searchInput === 'try'){
      const results = await JSON.parse(localStorage.getItem("search"))
      return results
    }
    const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY
  
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchInput}&part=snippet&type=video`
    )
    let results = await response.json()
    results = _formatResults(results)
    return results
}

  function _formatResults(searchResults) {
    const formattedResults = searchResults.items.map((item) => {
        const { title, artist } = utilService.formatVideoTitle(item.snippet.title)
        return {
            id: item.id.videoId,
            title,
            artist,
            imgURL: item.snippet.thumbnails.default.url
        }
    })
    return formattedResults
}