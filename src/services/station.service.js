import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

const STORAGE_KEY = "stations"

export const stationService = {
  removeSongFromStation,
  query,
  getById,
  save,
  removeById,
  createNewStation,
  convertToMiniStation
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

async function query(filterBy = {}) {
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
async function createNewStation(user) {
  const emptyStation = _getEmptyStation(user)
  const savedStation = await save(emptyStation)
  return savedStation
}

function convertToMiniStation(station){
  const { id, albumCoverUrl, name } = station
  return { id, albumCoverUrl, name, createdBy : station.createdBy.fullname}
}

async function save(stationToSave) {
  if (stationToSave.id) {
    return await storageService.put(STORAGE_KEY, stationToSave)
  } else {
    return await storageService.post(STORAGE_KEY, stationToSave)
  }
}

function _getEmptyStation(user) {
  return {
    name: "New Playlist",
    imgUrl: "imgs/defaultStationImg.png",
    createdBy: user,
    likedByUsers: [],
    songs: [],
  }
}

// Load all stations to localStorage / create new from data file
// TODO - Move to query from db
(() => {
  let stations
  stations = utilService.loadFromStorage(STORAGE_KEY)
  if(!stations){
    stations = stationsAsJson
  }
  console.log(stations)
  utilService.saveToStorage(STORAGE_KEY, stations)
})()


