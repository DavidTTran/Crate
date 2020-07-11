import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
// import * as actions from './api/actions.js'
// import * as types from './api/state.js'
// import rootReducer from '../../setup/store'


describe("Profile", () => {
  let user;
  let router;
  let store
  let logout
  let dispatch

  beforeEach(() => {
    // logout = () =>{ jest.fn() }
    user = () => {
      return {details: {name:"Jerry Garcia", email:"dave@crate.com", role:"USER"}}
    }

    const appReducer = combineReducers({
      user,
      // logout
    })

    // Root Reducer
    const rootReducer = (state, action) => {
      if (action.type === 'RESET') {
        state = undefined
      }
      return appReducer(state, action)
    }
    // Load initial state from server side
    let initialState =  Object.assign(user())

    store = createStore(rootReducer, initialState)
    // store.dispatch = jest.fn()

    router =
    <Provider store={store}>
      <BrowserRouter>
        <Profile/>
      </BrowserRouter>
    </Provider>

  })

it('should render the user name on page load', () => {

  const { getByText } = render(router)
  expect(getByText("Jerry Garcia")).toBeInTheDocument()
})


// it('should log the user out', ()=>{
//   const { getByText, debug } = render(router)
//   // mockLogout = jest.fn()
//   fireEvent.click(getByText("Logout"))
//   expect(logout).toHaveBeenCalled()
//
// })


it.skip('should log the user out', () => {
  const expectedAction = {
    dispatch: types.LOGOUT,
    }
  expect(actions.logout()).toEqual(expectedAction)
})

// export function logout() {
//   return dispatch => {
//     logoutUnsetUserLocalStorageAndCookie()
//
//     dispatch({
//       type: LOGOUT
//     })
//   }
// }



})
