// App Imports
import Login from '../../modules/user/Login'
import Test from '../../modules/user/Test'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'

// User routes
export default {

  login: {
    path: '/user/login',
    component: Login
  },
  /*Nick added test component in*/
  test: {
    path: '/user/test',
    component: Test
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }

}
