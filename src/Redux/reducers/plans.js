import { SET_PLANS, CLEAN_PLANS } from '../actions/plans'

const initialState = {}

const plansReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PLANS:
      return [...state, ...action.payload]
    case CLEAN_PLANS:
      return initialState
    default:
      return state
  }
}

export default plansReducer
