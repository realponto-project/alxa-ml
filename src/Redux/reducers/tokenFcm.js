import { SET_TOKEN_FCM } from '../actions/tokenFcm'

const tokenFcmReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN_FCM:
      return action.payload
    default:
      return state
  }
}

export default tokenFcmReducer
