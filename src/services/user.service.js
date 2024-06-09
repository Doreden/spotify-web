import { storageService } from "./async-storage.service";
import { utilService } from "./util.service"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };
import likedSongsAsJson from '../assets/data/likedsongs.json' assert {type: 'json'}

const STORAGE_KEY = "user"

export const UserService = {
    login,
    createMinimalUser,
    getLoggedInUser,
    addMiniStation,
    removeStationFromLikedByUser,
    isSongLiked,
    isStationLiked,
    addSongToLikedSongs,
    removeSongFromLikedSongs
}

async function removeStationFromLikedByUser(userId, stationId){
    // TODO : Convert to use userId ? 
    const loggedInUser = getLoggedInUser()
    const updatedUser = {...loggedInUser, likedStations : loggedInUser.likedStations.filter((station) => station.id !== stationId)}
    await utilService.saveToStorage(STORAGE_KEY, updatedUser)
}

async function addMiniStation(miniStation){
    const loggedInUser = getLoggedInUser()
    const updatedUser = {...loggedInUser, likedStations : [...loggedInUser.likedStations, miniStation]}
    await utilService.saveToStorage(STORAGE_KEY, updatedUser)
}

async function addSongToLikedSongs(loggedInUser, song){
    // Change after adding user support
    const loggedInUserDev = getLoggedInUser()
    const updatedUser = {...loggedInUserDev, likedSongs : loggedInUser.likedSongs.filter(likedSong => likedSong.id !== song.id)}
    await utilService.saveToStorage(STORAGE_KEY, updatedUser)
}

async function removeSongFromLikedSongs(loggedInUser, song){
    // Change after adding user support
    const updatedUser = {...loggedInUser, likedSongs : [...loggedInUserDev.likedSongs, song]}
    await utilService.saveToStorage(STORAGE_KEY, updatedUser)
}

function getLoggedInUser(){
    try{
        const loggedInUser = utilService.loadFromStorage(STORAGE_KEY)
        return loggedInUser
    }catch(err){
        console.log('No logged in user')
    }
}

function login(){
    const loggedInUser = utilService.loadFromStorage(STORAGE_KEY)
    if(!loggedInUser){
        const defaultUser = createMinimalUser(_getDefaultUser())
        utilService.saveToStorage(STORAGE_KEY,defaultUser)
        return defaultUser
    }
    return loggedInUser
}

// TODO - Use When implementing creation of user
async function save(userToSave) {
    if (userToSave.id) {
        return await storageService.put(STORAGE_KEY, userToSave)
    } else {
        return await storageService.post(STORAGE_KEY, userToSave)
    }
}

function isSongLiked(loggedInUser, song){
    const isLiked = loggedInUser.likedSongs.find(likedSong => likedSong.id === song.id)
    if(isLiked){
        return true
    }
    return false
}

function isStationLiked(loggedInUser, station){
    const isLiked = station.likedByUsers.find(likedUser => likedUser.id === loggedInUser.id)
    if(isLiked){
        return true
    }else{
        return false
    }
}

function createMinimalUser(user){
    return {
        id: user.id,
        username: user.username,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations,
        likedSongs : user.likedSongs
    }
}

function _getDefaultUser(){
    return {
        id: "abcd12345", 
        username: "Puki Ben David",
        password: "123",
        email: "Puki@gmail.com",
        gender: "male",
        birthday: 1234567890,
        imgUrl: "http://some-photo/",
        likedSongs : [],
        likedStations : stationsAsJson.map((station) => ({id : station.id, name : station.name, imgUrl : station.imgUrl, createdBy : station.createdBy}))
      }
}
