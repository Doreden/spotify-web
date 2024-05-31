// import { ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/station.reducer";
import { store } from "../store";
import { stationService } from "../../services/station.service";
import { UserService } from "../../services/user.service";
import { SET_USER, ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/user.reducer"
// TOASK : This is only used for rendering user liked playlists. Discuss does it need to be in store?

export async function login(cretentials = {}){
    try{
        const loggedInUser = UserService.login()
        console.log(loggedInUser)
        store.dispatch({type:SET_USER, user : loggedInUser})

    }catch(err){
        console.log('No logged in user')
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

export async function addStation() {
  try {

    const newStation = await stationService.createNewStation()
    store.dispatch({type: ADD_STATION, newStation })
  } catch (error) {
    console.log(error)
    console.log('Could Not add Station')
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