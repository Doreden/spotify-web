// import { ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/station.reducer";
import { store } from "../store";
import { stationService } from "../../services/station.service";
import { UserService } from "../../services/user.service";
import { SET_USER, ADD_STATION, LOAD_STATIONS, REMOVE_STATION, REMOVE_FROM_LIKED_SONGS, LIKE_SONG, UPDATE_STATIONS } from "../reducers/user.reducer"
// TOASK : This is only used for rendering user liked playlists. Discuss does it need to be in store?

export async function login(cretentials = {}){
    try{
        const loggedInUser = UserService.login()
        store.dispatch({type:SET_USER, user : loggedInUser})

    }catch(err){
        console.log('No logged in user')
    }
}

export async function updateStation(likedStations, updatedStation){
  const { id, name, imgUrl } = updatedStation
  const stationToUpdate = await stationService.getById(id)
  console.log(stationToUpdate)
  const stationAfterUpdate = {...stationToUpdate, name, imgUrl}
  console.log("4")
  const savedStation = await stationService.save(stationAfterUpdate)
  console.log("5")
  const miniSavedStation = stationService.convertToMiniStation(savedStation)
  console.log("6")
  const stationIdx = likedStations.findIndex(miniStation => miniStation.id === miniSavedStation.id)

  if(stationIdx !== -1){
      likedStations[stationIdx] = miniSavedStation
      store.dispatch({type:UPDATE_STATIONS, updatedStations : likedStations})
      console.log(likedStations)
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
    const userState = store.dispatch({type:REMOVE_STATION, stationId})
    console.log(userState)
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
    const { id, username, imgUrl } = loggedInUser
    const formattedUser = { id, username, imgUrl }
    // Creates new station in database
    const newStation = await stationService.createNewStation(formattedUser)
    const miniNewStation = stationService.convertToMiniStation(newStation)
    console.log(miniNewStation)
    
    // Add new station to user in database
    UserService.addMiniStation(miniNewStation)
    // Add new station in store to re-render
    store.dispatch({type: ADD_STATION, miniNewStation })
  } catch (err) {
      console.log(err)
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

export async function removeStation(stationId){
  try{
    stationService.removeById(stationId)
    store.dispatch({type: REMOVE_STATION, stationId})
    // TODO check if works:
  }catch(error){
    console.log(error)
    console.log('Could not remove Station')
  }
}