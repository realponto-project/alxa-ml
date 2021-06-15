import { combineReducers } from 'redux'

import userReducer from './user'
import companyReducer from './company'
import statusReducer from './status'
import customerSearchReducer from './customerSearch'
import productSearchReducer from './productSearch'
import statusSearchReducer from './statusSearch'
import orderSearchReducer from './orderSearch'
import formPdvReducer from './formPdv'
import SubscriptionReducer from './subscription'
import MyTeamReducer from './myTeam'
import PlansReducer from './plans'
import TokenFcmReducer from './tokenFcm'

const appReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  status: statusReducer,
  customerSearch: customerSearchReducer,
  productSearch: productSearchReducer,
  formPdv: formPdvReducer,
  statusSearch: statusSearchReducer,
  orderSearch: orderSearchReducer,
  subscription: SubscriptionReducer,
  myTeamSearch: MyTeamReducer,
  plans: PlansReducer,
  tokenFcm: TokenFcmReducer
})


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
