import AdsManager from '../Pages/Ads/Manager'
import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyTeam from '../Pages/MyTeam'
import Onboarding from '../Pages/Onboarding'
import MyInfo from '../Pages/MyInfo'

const RootRoutes = [
  {
    component: Onboarding,
    path: '/user/onboarding',
    exact: true,
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: MyTeam,
    title: 'MINHA EQUIPE',
    path: '/logged/account-myteam',
    exact: true,
    goBack: true
  },
  {
    component: UpdateMyPassword,
    title: 'ALTERAR SENHA',
    path: '/logged/account-password',
    exact: true,
    goBack: true
  },
  {
    component: AdsManager,
    title: 'ANÚNCIOS',
    path: '/logged/ads/manager',
    exact: true,
    goBack: false
  },
]

export default RootRoutes
