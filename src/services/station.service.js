// Pre-Ready stations
import moodsList from "../assets/data/Moods.json" assert { type: "json" }
import recommendedList from "../assets/data/Recommended.json" assert { type: "json" }
import israelList from "../assets/data/HotInIsrael.json" assert { type: "json" }
import eleconicList from "../assets/data/Electronic.json" assert { type: "json" }

import { utilService } from "./util.service.js"
import { httpService } from "./http.service.js"

export const stationService = {
    query,
    getById,
    save,
    removeById,
    createNewStation,
    getIndexStations,
    addUserToLikedByUsers,
    removeUserFromLikedByUsers,
    removeSongFromStation,
    convertToMiniStation,
    addSongToStation,
}

function getIndexStations() {
    const stationsObj = {
        moodsList,
        recommendedList,
        israelList,
        eleconicList,
    }
    return stationsObj
}

// CRUD

async function query(filterBy = {}) {
    const stations = await httpService.get("station", filterBy)
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
        return await httpService.put(
            `station/${stationToSave._id}`,
            stationToSave
        )
    } else {
        // returns a response item with insertedId
        return await httpService.post(`station`, stationToSave)
    }
}

async function removeById(stationId) {
    try {
        const response = await httpService.delete(
            `station/${stationId}`,
            stationId
        )
        return response
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

// User Likes Related Function
async function addUserToLikedByUsers(station, miniUser) {
    const stationToUpdate = await getById(station._id)
    const updatedStation = {
        ...stationToUpdate,
        likedByUsers: [...stationToUpdate.likedByUsers, miniUser],
    }
    await save(updatedStation)
    return updatedStation
}

async function removeUserFromLikedByUsers(station, miniUser) {
    const stationToUpdate = await getById(station._id)
    const updatedStation = {
        ...stationToUpdate,
        likedByUsers: stationToUpdate.likedByUsers.filter(
            user => user._id !== miniUser._id
        ),
    }
    return await save(updatedStation)
}

async function createNewStation(user) {
    const emptyStation = _getEmptyStation(user)
    const { insertedId } = await save(emptyStation)
    const stationWithId = { ...emptyStation, _id: insertedId }
    return stationWithId
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

function convertToMiniStation(station) {
    const { _id, imgUrl, name, createdBy } = station
    return { _id, imgUrl, name, createdBy }
}

// Songs Related Functions
async function addSongToStation(stationId, song) {
    try {
        let station = await getById(stationId)
        const newSong = {
            ...song,
            objectId: utilService.generateId(10),
            addedAt: Date.now(),
        }
        let updatedStation = { ...station, songs: [...station.songs, newSong] }
        await save(updatedStation)
        return updatedStation
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

async function removeSongFromStation(stationId, songId) {
    try {
        let station = await getById(stationId)
        const updatedStation = {
            ...station,
            songs: station.songs.filter(song => song.id !== songId),
        }
        await save(updatedStation)
        return updatedStation
    } catch (err) {
        console.log(err)
    }
}
