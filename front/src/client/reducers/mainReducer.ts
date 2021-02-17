import { SOCKET_POP } from '../actions/socket'
import { USER_POP } from "../actions/user";

interface Action {
  type: string;
  value: any;
}

const mainReducer = (state = {} , action: Action) => {
  switch(action.type){
    case SOCKET_POP:
      return {...state,
        socket: action.value
      }
    case USER_POP:
      return {...state,
        user: action.value
      }
    default:
      return state
  }
}

export default mainReducer
