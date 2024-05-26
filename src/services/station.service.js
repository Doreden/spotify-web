import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };


const STORAGE_KEY = "stations"

console.log(import.meta.env.VITE_API_KEY)

export const stationService = {
  removeSongFromStation,
  query,
  getById,
  removeById,
  createNewStation,
  createStations,
  getSongBySearch,
}

async function removeSongFromStation(stationId, songId) {
  let station = await getById(stationId)
  console.log(station)
  station = {
    ...station,
    songs: station.songs.filter((song) => song.id !== songId),
  }
  console.log(station)
  save(station)
}

async function query() {
  let stations = await storageService.query(STORAGE_KEY)
  return stations
}

async function getById(id) {
  try {
    var station = await storageService.get(STORAGE_KEY, id)
    return station
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

async function removeById(id) {
  try {
    var idx = await storageService.remove(STORAGE_KEY, id)
    return idx
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

// TODO : change to get user from store
async function createNewStation(user = {}) {
  const emptyStation = _makeEmptyStation(user)
  return save(emptyStation)
}

function save(stationToSave) {
  if (stationToSave.id) {
    return storageService.put(STORAGE_KEY, stationToSave)
  } else {
    return storageService.post(STORAGE_KEY, stationToSave)
  }
}

function _makeEmptyStation(user) {
  return {
    name: "New Playlist",
    albumCoverUrl: null,
    createdBy: user,
    likedByUsers: [],
    createdAt: Date.now(),
    songs: [],
  }
}

async function getSongBySearch(searchInput) {
  const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchInput}&part=snippet&type=video`
  )
  const results = await response.json()
  // localStorage.setItem("search", JSON.stringify(results))
  console.log(results.items)
  
  return results.items

}

// Two regular Albums, one Single and one user generated Playlist (differs by CreatedBy)
function createStations() {
  let stations = utilService.loadFromStorage(STORAGE_KEY)
  if (!stations) {
    stations = stationsAsJson
    utilService.saveToStorage(STORAGE_KEY, stations)
  }
}
