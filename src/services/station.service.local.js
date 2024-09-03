import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import stationsAsJson from "../assets/data/station.json" assert { type: "json" }

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
    addSongToStation,
}

async function addUserToLikedByUsers(station, miniUser) {
    const stationToUpdate = await getById(station.id)
    const updatedStation = {
        ...stationToUpdate,
        likedByUsers: [...stationToUpdate.likedByUsers, miniUser],
    }
    return await save(updatedStation)
}

async function removeUserFromLikedByUsers(station, miniUser) {
    const stationToUpdate = await getById(station.id)
    console.log(stationToUpdate)
    const updatedStation = {
        ...stationToUpdate,
        likedByUsers: stationToUpdate.likedByUsers.filter(
            user => user.id !== miniUser.id
        ),
    }
    return await save(updatedStation)
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

async function save(stationToSave) {
    if (stationToSave.id) {
        return await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        return await storageService.post(STORAGE_KEY, stationToSave)
    }
}

async function addSongToStation(station, song) {
    try {
        let newSong = { ...song }
        if (_isIn(station, song)) {
            const newId = utilService.generateId(10)
            newSong = { ...song, id: newId }
        }
        let stationUpdate = {
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
        songs: station.songs.filter(song => song.id !== songId),
    }
    save(station)
}

// TODO : change to get user from store
async function createNewStation(user) {
    const emptyStation = _getEmptyStation(user)
    const savedStation = await save(emptyStation)
    return savedStation
}

function convertToMiniStation(station) {
    const { id, imgUrl, name } = station
    return { id, imgUrl, name, createdBy: station.createdBy }
}

function _isIn(station, song) {
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
