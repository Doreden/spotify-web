import { storageService } from "./async-storage.service";
import { utilService } from "./util.service"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

const STORAGE_KEY = "user"

export const UserService = {
    login,
    createMinimalUser,
    getLoggedInUser
}

async function getLoggedInUser(){
    try{
        const loggedInUser = utilService.loadFromStorage(STORAGE_KEY)
        return loggedInUser
    }catch(err){
        console.log('No logged in user')
    }
}

function login(){
    const defaultUser = _getDefaultUser()
    utilService.saveToStorage(STORAGE_KEY,defaultUser)
    return defaultUser
}


function createMinimalUser(user){
    return {
        id: user.id,
        fullname: user.fullname,
        imgUrl: user.imgUrl
    }
}

function _getDefaultUser(){
    return {
        id: "abcd1234",
        fullname: "Puki Ben David",
        username: "puki",
        password: "123",
        email: "Puki@gmail.com",
        gender: "male",
        birthday: 1234567890,
        imgUrl: "http://some-photo/",
        likedStations : stationsAsJson.map((station) => ({id : station.id, name : station.name, albumCoverUrl : station.albumCoverUrl, createdBy : station.createdBy.username}))
      }
}
