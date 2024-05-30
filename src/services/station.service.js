import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

const STORAGE_KEY = "stations"

export const stationService = {
  removeSongFromStation,
  query,
  getById,
  removeById,
  createNewStation,
  createStations,
}

async function removeSongFromStation(stationId, songId) {
  let station = await getById(stationId)
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
  const emptyStation = _getEmptyStation(user)
  return save(emptyStation)
}

function save(stationToSave) {
  if (stationToSave.id) {
    return storageService.put(STORAGE_KEY, stationToSave)
  } else {
    return storageService.post(STORAGE_KEY, stationToSave)
  }
}

function _getEmptyStation(user) {
  return {
    name: "New Playlist",
    albumCoverUrl: null,
    createdBy: user,
    likedByUsers: [],
    createdAt: Date.now(),
    songs: [],
  }
}

// Two regular Albums, one Single and one user generated Playlist (differs by CreatedBy)
function createStations() {
  // let stations = utilService.loadFromStorage(STORAGE_KEY)
  // if (!stations) {
    const stations = stationsAsJson
    utilService.saveToStorage(STORAGE_KEY, stations)
  // }
}


