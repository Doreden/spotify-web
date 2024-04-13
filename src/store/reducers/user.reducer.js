import { UserService } from "../../services/user.service"
const initialState = { user: {} }


const LOAD_USER = 'LOAD_USER'

export function userReducer(state = initialState, cmd){
    switch(cmd.type){
        case LOAD_USER:
            return {...state, user: UserService.createMinimalUser(cmd.user)}
        default:
            return state
    }
}
