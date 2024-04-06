import { LOAD_STATIONS } from "../reducers/station.reducer";
import { store } from "../store";
import { stationService } from "../../services/station.service";


export async function loadStations() {
    try {
      const newStations = await stationService.query();
      store.dispatch({ type: LOAD_STATIONS, newStations });
    } catch (error) {
      console.log("Could not load stations");
      throw error
    }
  }

//   export async function addStation() {
//     try {
//         const 
//     }
//   }