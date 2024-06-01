import { storageService } from "./async-storage.service";
import { utilService } from "./util.service"
import stationsAsJson from '../assets/data/station.json' assert { type: 'json' };

const STORAGE_KEY = "user"

export const UserService = {
    login,
    createMinimalUser,
    getLoggedInUser,
    addMiniStation,
    removeStationFromLikedByUser
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


function createMinimalUser(user){
    return {
        id: user.id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        likedStations: user.likedStations
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
        likedStations : stationsAsJson.map((station) => ({id : station.id, name : station.name, imgUrl : station.imgUrl, createdBy : station.createdBy.username}))
      }
}
