import { httpService } from "./http.service";

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

async function save(userToSave) {
    if (userToSave._id) {
        return await httpService.put(`user/${userToSave._id}`, userToSave)
    } else {
        return await httpService.port('user', userToSave)
    }
}

function saveLocalUser(user){
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function addSongToLikedSongs(loggedInUser, song){
    const songWithDate = {...song, addedAt: Date.now()}
    const updatedUser = {...loggedInUser, likedSongs : [...loggedInUser.likedSongs, songWithDate]}
    // Updates user in sessionStorage
    saveLocalUser(updatedUser)
    // Updates user in database
    await save(updatedUser)
}

async function removeSongFromLikedSongs(loggedInUser, song){
    const updatedUser = {...loggedInUser, likedSongs : loggedInUser.likedSongs.filter(likedSong => likedSong.id !== song.id)}
    // Updates user in sessionStorage
    saveLocalUser(updatedUser)
    // Updates user in database
    await save(updatedUser)
}

function getLoggedInUser(){
    try{
        const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
        return loggedInUser
    }catch(err){
        console.log('No logged in user')
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


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        imgUrl: '',
    }
}
