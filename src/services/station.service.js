import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

import { httpService } from "./http.service.js";

const STORAGE_KEY = "stations"

export const stationService = {
  addUserToLikedByUsers,
  removeUserFromLikedByUsers,
  removeSongFromStation,
  query,
  getById,
  save,
  removeById,
  createNewStation,
  convertToMiniStation,
  addSongToStation
}

async function query(filterBy = {}) {
  const stations = await httpService.get('station', filterBy)
  return stations
}

async function getById(stationId) {
  try {
    const station = await httpService.get(`station/${stationId}`)
    console.log(station)
    return station
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

async function save(stationToSave) {
  if (stationToSave._id) {
    return await httpService.put(`station/${stationToSave._id}`, stationToSave)
  } else {
    return await httpService.post(`station`, stationToSave)
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










async function addUserToLikedByUsers(station,miniUser){
  const stationToUpdate = await getById(station.id)
  const updatedStation = {...stationToUpdate, likedByUsers : [...stationToUpdate.likedByUsers, miniUser]}
  return await save(updatedStation)
}

async function removeUserFromLikedByUsers(station,miniUser){
  const stationToUpdate = await getById(station.id)
  console.log(stationToUpdate)
  const updatedStation = {...stationToUpdate, likedByUsers : stationToUpdate.likedByUsers.filter((user) => user.id !== miniUser.id)}
  return await save(updatedStation)
}










async function addSongToStation(station,song){
  try {
    let newSong = {...song}
    if(_isIn(station,song)){
      const newId = utilService.generateId(10)
      newSong = {...song, id:newId}
    }
    let stationUpdate  = {
    ...station,
    songs: [...station.songs, newSong],
  }
  save(stationUpdate)
  } catch (err) {
    console.log(`error: ${err}`)
  }
}

async function removeSongFromStation(stationId, songId) {
  let station = await getById(stationId)
  station = {
    ...station,
    songs: station.songs.filter((song) => song.id !== songId),
  }
  save(station)
}

// TODO : change to get user from store
async function createNewStation(user) {
  const emptyStation = _getEmptyStation(user)
  const savedStation = await save(emptyStation)
  return savedStation
}

function convertToMiniStation(station){
  const { id, imgUrl, name } = station
  return { id, imgUrl, name, createdBy : station.createdBy}
}



function _isIn(station,song){
  return station.songs.some(stationSong => stationSong.id === song.id)
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
  utilService.saveToStorage(STORAGE_KEY, stations)
})()


