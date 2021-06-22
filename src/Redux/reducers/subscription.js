import { SET_SUBSCRIPTION, UNSET_SUBSCRIPTION } from '../actions/subscription'

const initialState = {
  activated: true,
  amount: 0,
  installment: 1,
  authorization_code: null,
  autoRenew: false,
  companyId: null,
  paymentMethod: 'free',
  planId: null,
  status: 'free',
  tid: null,
}

const SubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION:

      state = action.payload ? action.payload : state
      return state
    case UNSET_SUBSCRIPTION:
      return initialState
    default:
      return state
  }
}

export default SubscriptionReducer
