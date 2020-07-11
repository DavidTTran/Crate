import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditProfile from './EditProfile';
import Profile from './Profile';
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, rootReducer, compose } from 'redux'
import { SET_USER } from './api/actions';

// const testWrapper = () => {
//     const store = createStore(rootReducer, compose())
//     const user = {
//         details: {name:"Jerry Garcia", email:"dave@crate.com", role:"USER"}
//     }
//     store.dispatch({ type: SET_USER, user})
//     const history = createMemoryHistory()
//     return { ...render(
//         <MemoryRouter history={history}>
//             <Provider store={store}>
//                 <EditProfile />
//             </Provider>
//         </MemoryRouter>
//     ), history, store}
// }



describe("Profile", () => {
    let user;
    let router;
    let store
    let logout
  
    beforeEach(() => {
      logout = jest.fn()
    //   user = () => {
    //     return {details: {name:"Jerry Garcia", email:"dave@crate.com", role:"USER"}}
    //   }
      user = () => {
        return {
            error: null,
            isLoading: false,
            isAuthenticated: true,
            details: {
                name: "Jerry Garcia", 
                email: "dave@crate.com", 
                role: "user",
                shippingAddress: 'no shipping address on file',
                description: 'no description on file',
                image: ''
            }
        }
      }
  
      const appReducer = combineReducers({
        user,
        // logout //not working so far
      })
  
      // Root Reducer
      const rootReducer = (state, action) => {
        if (action.type === 'RESET') {
          state = undefined
        }
  
        return appReducer(state, action)
      }
  
      // Load initial state from server side
    //   let initialState =  Object.assign(user(), logout)
    //   let initialState =  Object.assign(user(), logout)
    let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}
  
      store = createStore(rootReducer, initialState)
  
      router =
      <Provider store={store}>
        <BrowserRouter>
        {/* <MemoryRouter> */}
          <EditProfile/>
          {/* <Profile /> */}
        {/* </MemoryRouter> */}
        </BrowserRouter>
      </Provider>
    })
  
//   it('Edit My Profile header should display', () => {
//     const { getByText } = testWrapper()

//     expect(getByText('Edit My Profile')).toBeInTheDocument()
//   })
  it('Edit My Profile header should display', () => {
    const { getByText } = render(router)

    expect(getByText('Edit My Profile')).toBeInTheDocument()
  })
  
  
  it('the user should have an input to change their name', ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Name:')).toBeInTheDocument()
    expect(getByPlaceholderText('Jerry Garcia')).toBeInTheDocument()
  })

  it('the user should have an input to change their email', ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Email:')).toBeInTheDocument()
    expect(getByPlaceholderText('dave@crate.com')).toBeInTheDocument()
  })

  it('the user should have an input to change their address', async ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Shipping Address:')).toBeInTheDocument()
    // expect(getByPlaceholderText('no shipping address on file')).toBeInTheDocument()
  })

//   test each of the three with changing
    it('the name input should update after a user changes it', ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    fireEvent.change(getByPlaceholderText('Jerry Garcia'), {target: {value: 'Bob Weir'}})
    
    fireEvent.click(getByText('Save Changes'))
    
    waitFor(() => 
        expect(
            getByText('Edit Profile')).toBeInTheDocument()
        )

    fireEvent.click(getByText('Edit Profile'))

    expect(getByPlaceholderText('Bob Weir')).toBeInTheDocument()
  })
})