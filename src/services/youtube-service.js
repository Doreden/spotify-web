import { utilService } from "./util.service"
import searchAsJson from '../assets/data/search.json' assert { type: 'json' };

const STORAGE_KEY = "search"
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY

export const youtubeService = {
    getSongBySearch
}

async function getSongBySearch(searchInput) {
    let results
    // TODO REMOVE - FOR Development
    if(searchInput === 'try'){
      results = await JSON.parse(utilService.loadFromStorage(STORAGE_KEY))
    }else{      
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchInput}&part=snippet&type=video`
        )
        results = await response.json()
    }
    const songsLength = await _getSongsLength(results)
    results = results.items.map((item,idx) => ({...item, duration : songsLength[idx]}))
    results = _formatResults(results)
    return results
}

async function _getSongsLength(results){
	const idsAsString = _createIdsAsString(results)
	let songsLength = await fetch(
		`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${idsAsString}&key=${API_KEY}`
	)
	songsLength = await songsLength.json()
	songsLength = songsLength.items.map((song) => (song.contentDetails.duration))
	return songsLength
}

function _createIdsAsString(results){
    let resultsIdString = ''
    results.items.forEach(item => (resultsIdString += item.id.videoId + ','))
    return resultsIdString
}


  function _formatResults(searchResults) {
    const formattedResults = searchResults.map((item) => {
        const { title, artist } = utilService.formatVideoTitle(item.snippet.title)

        return {
            id: item.id.videoId,
            title,
            artist,
            imgURL: item.snippet.thumbnails.default.url,
            lengthInSeconds: utilService.convertYoutubeDurationToSeconds(item.duration)
        }
    })
    return formattedResults
}

// TODO - For Development
(() => {
    utilService.saveToStorage(STORAGE_KEY, JSON.stringify(searchAsJson))
  })();