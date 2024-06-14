import { utilService } from "./util.service.js"

import { httpService } from "./http.service.js";

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

async function removeById(stationId) {
  try {
    const response = await httpService.delete(`station/${stationId}`, stationId)
    return response
  } catch (err) {
    console.log(`error: ${err}`)
  }
}










async function addUserToLikedByUsers(station,miniUser){
  const stationToUpdate = await getById(station._id)
  const updatedStation = {...stationToUpdate, likedByUsers : [...stationToUpdate.likedByUsers, miniUser]}
  await save(updatedStation)
  return updatedStation
}



async function removeUserFromLikedByUsers(station,miniUser){
  const stationToUpdate = await getById(station._id)
  const updatedStation = {...stationToUpdate, likedByUsers : stationToUpdate.likedByUsers.filter((user) => user._id !== miniUser._id)}
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

async function createNewStation(user) {
  const emptyStation = _getEmptyStation(user)
  await save(emptyStation)
  return emptyStation
}

function convertToMiniStation(station){
  const { _id, imgUrl, name } = station
  return { _id, imgUrl, name, createdBy : station.createdBy}
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
// (() => {
//   let stations
//   stations = utilService.loadFromStorage(STORAGE_KEY)
//   if(!stations){
//     stations = stationsAsJson
//   }
//   utilService.saveToStorage(STORAGE_KEY, stations)
// })()


