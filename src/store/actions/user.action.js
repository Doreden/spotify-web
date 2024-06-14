// import { ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/station.reducer";
import { store } from "../store";
import { stationService } from "../../services/station.service";
import { UserService } from "../../services/user.service";
import { SET_USER, ADD_STATION, LOAD_STATIONS, REMOVE_STATION, REMOVE_FROM_LIKED_SONGS, LIKE_SONG, UPDATE_STATIONS } from "../reducers/user.reducer"
// TOASK : This is only used for rendering user liked playlists. Discuss does it need to be in store?

export async function login(cretentials = {}){
    try{
        const userInSessionStorage = UserService.getLoggedInUser()
        if(userInSessionStorage){
          store.dispatch({type:SET_USER, user : userInSessionStorage})
          return userInSessionStorage
        }else{
          const loggedInUser = await UserService.login(cretentials)
          if(loggedInUser){
            store.dispatch({type:SET_USER, user : loggedInUser})
            return loggedInUser
          }
        }
    }catch(err){
        console.log('No logged in user')
    }
}

export async function signup(credentials = {}){
  const newUser = await UserService.signup(credentials)
  console.log(newUser)
  store.dispatch({type:SET_USER, user : newUser})
}

export async function logout(){
  await UserService.logout()
  store.dispatch({type:SET_USER, user: null})
}

export async function loadUserStations(loggedInUser){
  const userStations = await stationService.query({ txt: '', userId: loggedInUser._id })
  store.dispatch({type:LOAD_STATIONS, newStations : userStations})
}

export async function updateStation(likedStations, updatedStation){
  const { _id, name, imgUrl } = updatedStation
  const stationToUpdate = await stationService.getById(_id)
  const stationAfterUpdate = {...stationToUpdate, name, imgUrl}
  await stationService.save(stationAfterUpdate)
  const miniSavedStation = stationService.convertToMiniStation(stationAfterUpdate)

  const stationIdx = likedStations.findIndex(miniStation => miniStation._id === miniSavedStation._id)

  if(stationIdx !== -1){
      likedStations[stationIdx] = miniSavedStation
      store.dispatch({type:UPDATE_STATIONS, updatedStations : likedStations})
  }else{
      console.log('Error Saving Station')
  }
}

export async function deleteStation(userId,stationId){
  try {
    // Delete station from db
    await stationService.removeById(stationId)
    // Delete station from user likesStations
    await UserService.removeStationFromLikedByUser(userId,stationId)
    // Delete station from store
    store.dispatch({type:REMOVE_STATION, stationId})
    
  } catch (err) {
    console.log(err)
  }
}

export async function toggleLikedSong(loggedInUser,song){
    const isSongLiked = UserService.isSongLiked(loggedInUser,song)
    if(isSongLiked){
      store.dispatch({type:REMOVE_FROM_LIKED_SONGS, song})
      UserService.removeSongFromLikedSongs(loggedInUser,song)
    }else{
      store.dispatch({type:LIKE_SONG, song})
      UserService.addSongToLikedSongs(loggedInUser,song)
    }
}

export async function createNewStationByUser(loggedInUser){
  try {
    const { _id, username, imgUrl } = loggedInUser
    const formattedUser = { _id, username, imgUrl }
    // Creates new station in database
    const newStation = await stationService.createNewStation(formattedUser)

    const miniNewStation = stationService.convertToMiniStation(newStation)
    
    store.dispatch({type: ADD_STATION, miniNewStation })
  } catch (err) {
      console.log(err)
  }
}

export async function toggleLikedStation(loggedInUser,station){
  try{
    const isStationLiked = UserService.isStationLiked(loggedInUser,station)
    if(isStationLiked){
      await removeStationFromLiked(loggedInUser,station)
    } else{
      await addStationToLiked(loggedInUser,station)
    }
  }catch(err){
    console.log(err)
    }
}


export async function addStationToLiked(loggedInUser, station){
  try{
    const updatedStation = await stationService.addUserToLikedByUsers(station,loggedInUser)
    const miniNewStation = stationService.convertToMiniStation(updatedStation)
    store.dispatch({type: ADD_STATION, miniNewStation })
  }catch(err){
    console.log(err)
  }
}

export async function removeStationFromLiked(loggedInUser, station){
  try{
    await stationService.removeUserFromLikedByUsers(station,loggedInUser)
    // await UserService.removeStationFromLikedByUser(loggedInUser._id , station._id)
    store.dispatch({type: REMOVE_STATION, stationId : station._id})

  }catch(error){
    console.log(error)
    console.log('Could not remove Station')
  }
}


export async function loadUserMiniStations() {
  try {
   const loggedInUser = UserService.getLoggedInUser()
    
    store.dispatch({ type: LOAD_STATIONS, newStations : loggedInUser.likedStations });
  } catch (error) {
    console.log("Could not load stations");
    throw error
  }
}
