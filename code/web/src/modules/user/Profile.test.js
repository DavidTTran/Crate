
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Profile from './Profile';
import { Provider } from 'react-redux'
import { createStore, combineReducers, rootReducer, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { SET_USER } from './api/actions';


describe("Profile", () => {
  let user;
  let router;
  let store
  let mockLogout


  beforeEach(() => {
    mockLogout = jest.fn()
    user = () => {
      return {
        error: null,
        isLoading: false,
        isAuthenticated: true,
        details: {
            name:"Jerry Garcia",
            email:"dave@crate.com",
            role:"USER",
            shippingAddress: 'no shipping address on file',
            description: 'no description on file',
            image: ''
          }
        }
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
    // let initialState =  Object.assign(user())
    let initialState
        if (typeof window !== 'undefined') {
            initialState = window.__INITIAL_STATE__
            delete window.__INITIAL_STATE__
        }

    // store = createStore(rootReducer, initialState)
    store = createStore(rootReducer, applyMiddleware(thunk))
    // store.dispatch = jest.fn()

    router =
    <Provider store={store}>
        {/* <BrowserRouter> */}
        <MemoryRouter>
        <Profile/>
        </MemoryRouter>
        {/* </BrowserRouter> */}
    </Provider>

  })

it('should render the user name on page load', () => {

  const { getByText } = render(router)
  expect(getByText("Jerry Garcia")).toBeInTheDocument()
})

it('should render a logout button to log the user out', () => {

  const { getByText } = render(router)
  expect(getByText("Logout")).toBeInTheDocument()
})

// this one doesn't work
it('should log the user out', () => {

  const { getByText } = render(router)
  const button = getByText("Logout")
  fireEvent.click(button)
  expect(getByText("Login to your account")).toBeInTheDocument()
  // expect(mockLogout).toHaveBeenCalled();
})




})
