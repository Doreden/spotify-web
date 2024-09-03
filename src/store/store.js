import { legacy_createStore as createStore, combineReducers } from "redux"
import { stationReducer } from "./reducers/station.reducer"
import { userReducer } from "./reducers/user.reducer"
import { playerReducer } from "./reducers/player.reducer"

const rootReducer = combineReducers({
    stationModule: stationReducer,
    userModule: userReducer,
    playerModule: playerReducer,
})

export const store = createStore(rootReducer)
