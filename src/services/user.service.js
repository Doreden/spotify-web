import { storageService } from "./async-storage.service";
import { utilService } from "./util.service"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

import { httpService } from "./http.service";
import likedSongsAsJson from '../assets/data/likedsongs.json' assert {type: 'json'}

const STORAGE_KEY = "user"
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const UserService = {
    login,
    createMinimalUser,
    getLoggedInUser,
    addMiniStation,
    removeStationFromLikedByUser,
    isSongLiked,
    isStationLiked,
    addSongToLikedSongs,
    removeSongFromLikedSongs,
    getEmptyCredentials
}



async function login(credentials){

    const user = await httpService.post('auth/login', credentials)
    if(user){
        saveLocalUser(user)
    }
}

async function signup(credentials){
    const user = await httpService.post('auth/signup', credentials)
    if(user){
        saveLocalUser(user)
    }
}

function saveLocalUser(user){
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


async function removeStationFromLikedByUser(userId, stationId){
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



function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        imgUrl: '',
        }
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

