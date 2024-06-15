import { storageService } from "./async-storage.service";
import { utilService } from "./util.service"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

import { httpService } from "./http.service";
import likedSongsAsJson from '../assets/data/likedsongs.json' assert {type: 'json'}

const STORAGE_KEY = "user"
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const UserService = {
    login,
    signup,
    logout,
    createMinimalUser,
    getLoggedInUser,
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
        return user
    }
}

async function signup(credentials){
    const user = await httpService.post('auth/signup', credentials)
    if(user){
        saveLocalUser(user)
        return user
    }
}

async function logout(){
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

}

function saveLocalUser(user){
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function addSongToLikedSongs(loggedInUser, song){
    const songWithDate = {...song, addedAt: Date.now()}
    const updatedUser = {...loggedInUser, likedSongs : [...loggedInUser.likedSongs, songWithDate]}
    saveLocalUser(updatedUser)
    await save(updatedUser)
}

async function removeSongFromLikedSongs(loggedInUser, song){
    const updatedUser = {...loggedInUser, likedSongs : loggedInUser.likedSongs.filter(likedSong => likedSong.id !== song.id)}
    saveLocalUser(updatedUser)
    await save(updatedUser)}


function getLoggedInUser(){
    try{
        const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
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
    if (userToSave._id) {
        // return await storageService.put(STORAGE_KEY, userToSave)
        return await httpService.put(`user/${userToSave._id}`, userToSave)
    } else {
        return await httpService.port('user', userToSave)
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
    if(!loggedInUser) return false
    const isLiked = station.likedByUsers.find(likedUser => likedUser._id === loggedInUser._id)
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

