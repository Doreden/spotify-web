import { utilService } from "./util.service"
import searchAsJson from '../assets/data/search.json' assert { type: 'json' };

const STORAGE_KEY = "search"

export const youtubeService = {
    getSongBySearch
}

async function getSongBySearch(searchInput) {
    let results
    const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY
    if(searchInput === 'try'){
      results = await JSON.parse(utilService.loadFromStorage(STORAGE_KEY))
    }else{
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchInput}&part=snippet&type=video`
        )
        results = await response.json()
    }
    let resultsIdString = ''
    results.items.forEach(item => (resultsIdString += item.id.videoId + ','))
    let songLengths = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${resultsIdString}&key=${API_KEY}`
    )
    songLengths = await songLengths.json()
    console.log(songLengths)
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

// Creates the "Linkin Park" top 5 results to call when searching "try"
(() => {
    utilService.saveToStorage(STORAGE_KEY, JSON.stringify(searchAsJson))
  })();