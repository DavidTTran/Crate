import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditProfile from './EditProfile';
import Profile from './Profile';
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { SET_USER } from './api/actions';

describe("Profile", () => {
    let user;
    let router;
    let store
  
    beforeEach(() => {
      
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
      })
  
      // Root Reducer
      const rootReducer = (state, action) => {
        if (action.type === 'RESET') {
          state = undefined
        }
  
        return appReducer(state, action)
      }
  
    let initialState
        if (typeof window !== 'undefined') {
            initialState = window.__INITIAL_STATE__
            delete window.__INITIAL_STATE__
        }   
  
    //   store = createStore(rootReducer, initialState)
      store = createStore(rootReducer, applyMiddleware(thunk))
    
      const mockUpdateProfile = jest.fn()
    
      router =
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <MemoryRouter>
          <EditProfile updateProfile={mockUpdateProfile}/>
          <Profile />
        </MemoryRouter>
        {/* </BrowserRouter> */}
      </Provider>
    })

  it('Edit My Profile header should display', () => {
    const { getByText } = render(router)

    expect(getByText('Edit My Profile')).toBeInTheDocument()
  })
  
  
  it('the user should have an input to change their name', ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Update Name:')).toBeInTheDocument()
    expect(getByPlaceholderText('Jerry Garcia')).toBeInTheDocument()
  })

  it('the user should have an input to change their email', ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Update Email:')).toBeInTheDocument()
    expect(getByPlaceholderText('dave@crate.com')).toBeInTheDocument()
  })

  it('the user should have an input to change their address', async ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Update Shipping Address:')).toBeInTheDocument()
 
  })

  it('the user should have an input to change their description', async ()=>{
    const { getByText, getByPlaceholderText } = render(router)

    expect(getByText('Update Description:')).toBeInTheDocument()
  
  })

//   test each of the three with changing
    it('the name input should update after a user changes it', ()=>{
    const { getByDisplayValue, getByPlaceholderText } = render(router)

    fireEvent.change(getByPlaceholderText('Jerry Garcia'), {target: {value: 'Bob Weir'}})

    expect(getByDisplayValue('Bob Weir')).toBeInTheDocument()
  })

  it('the name input should update after a user changes it', ()=>{
    const { getByDisplayValue, getByPlaceholderText } = render(router)

    fireEvent.change(getByPlaceholderText('dave@crate.com'), {target: {value: 'bob@bob.com'}})

    expect(getByDisplayValue('bob@bob.com')).toBeInTheDocument()

  })

  it('the name input should update after a user changes it', ()=>{
    const { getByDisplayValue, getByPlaceholderText } = render(router)

     fireEvent.change(getByPlaceholderText('no shipping address on file'), {target: {value: '123 Easy Street'}})

    expect(getByDisplayValue('123 Easy Street')).toBeInTheDocument()

  })


  it('should update the description when a user updates it', () => {
      const { getByText, getByPlaceholderText } = render(router)

      fireEvent.change(getByPlaceholderText('no description on file'), {target: {value: 'Ill meet you at the jubilee'}})

      expect(getByText('Ill meet you at the jubilee'))
  })

  xit('should call updateProfile when a user clicks Save Changes', () => {      
      const { getByText, getByPlaceholderText } = render(router)
    
      fireEvent.change(getByPlaceholderText('no description on file'), {target: {value: 'Ill meet you at the jubilee'}})

      fireEvent.click(getByText('Save Changes'))

      expect(updateProfile).toHaveBeenCalled()
      
  })



})