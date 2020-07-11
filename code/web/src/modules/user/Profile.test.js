import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'



describe("Profile", () => {
  let user;
  let router;
  let store
  let logout

  beforeEach(() => {
    logout = jest.fn()
    user = () => {
      return {details: {name:"Jerry Garcia", email:"dave@crate.com", role:"USER"}}
    }

    const appReducer = combineReducers({
      user,
      logout //not working so far
    })

    // Root Reducer
    const rootReducer = (state, action) => {
      if (action.type === 'RESET') {
        state = undefined
      }

      return appReducer(state, action)
    }

    // Load initial state from server side
    let initialState =  Object.assign(user(), logout)

    store = createStore(rootReducer, initialState)

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


it('should log the user out', ()=>{
  const { getByText, debug } = render(router)
  // mockLogout = jest.fn()
  fireEvent.click(getByText("Logout"))
  expect(logout).toHaveBeenCalled()

})



})
