import { merge } from 'ramda'
import { USER_LOGGED, USER_LOGOUT } from '../actions/user'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED:
      return merge(state, action.payload)
    case USER_LOGOUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
