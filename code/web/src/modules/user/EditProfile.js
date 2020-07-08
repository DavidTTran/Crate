import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../../ui/button'
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey} from '../../ui/common/colors'
import { updateProfile } from './api/actions'
import user from '../../setup/routes/user'



// class EditProfile extends React.Component {
const EditProfile = (props) => {

    const fileInput = React.createRef()

    const [ name, updateName ] = useState()
    const [ email, updateEmail ] = useState()
    const [ shippingAddress, updateShippingAddress ] = useState(
    )
    const [ description, updateDescription ] = useState()
    // const [ image, updateImage ] = useState()

    // handle picture upload
    // const handleSubmit = e => {
    //     e.preventDefault()
    //     const pic = fileInput.current.files[0]
    //     // console.log(image)
    //     updateImage(pic)
    // }
    
    const handleClick = async () => {
        console.log(name)
        const updatedUser = createUpdatedUser()
        // const updatedUser = {
        //     name,
        //     email,
        //     shippingAddress,
        //     description
        // }

        await props.updateProfile(updatedUser)
        .then(data => console.log(data))
        .catch(err => console.error(err))
        clearInputs()
    }

    // need better error handling
    const createUpdatedUser = () => {
        console.log(props.user)
        const updatedName = name !== undefined ? name : props.user.details.name
        const updatedEmail = email !== undefined ? email : props.user.details.email
        // const updatedShippingAddress = shippingAddress !== undefined ? shippingAddress : props.user.shippingAddress
        // const updatedDescription = description !== undefined ? description : props.user.description
        const updatedShippingAddress = () => {
            if (shippingAddress !== undefined) {
                return shippingAddress
            }
            if (props.user.shippingAddress === undefined) {
                return 'no shipping address on file'
            }
            return props.user.shippingAddress
        }
        const updatedDescription = () => {
            if (description !== undefined) {
                return description
            }
            if (props.user.description === undefined) {
                return 'no description on file'
            }
            return props.user.description
        }
        
        return {
            name: updatedName,
            email: updatedEmail,
            shippingAddress: updatedShippingAddress(),
            description: updatedDescription()
        }
    }

    const clearInputs = () => {
        updateName()
        updateEmail()
        updateShippingAddress()
        updateDescription()
    }

    return (
        <div>
            <Grid style={{ backgroundColor: grey }}>
            <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                <H3 font="secondary">Edit My Profile</H3>
            </GridCell>
            </Grid>

            <Grid>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    placeholder={props.user.details.name}
                    onChange={e => updateName(e.target.value)}
                />
                <input 
                    type="text"
                    name="email"
                    value={email}
                    placeholder={props.user.details.email}
                    onChange={e => updateEmail(e.target.value)}
                />
                <input 
                    type="text"
                    name="shipping-address"
                    value={shippingAddress}
                    placeholder={props.user.details.shippingAddress ? props.user.details.shippingAddress : 'enter address'}
                    onChange={e => updateShippingAddress(e.target.value)}
                />
                <input 
                    type="text"
                    name="description"
                    value={description}
                    placeholder={props.user.details.description ? props.user.details.description : 'enter a description'}
                    
                    onChange={e => updateDescription(e.target.value)}
                />

                {/* <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        Upload file:
                        <input type="file" ref={fileInput} accept=".jpg, .jpeg, .png"/>
                    </label>
                    <button type="submit">Submit</button>
                </form> */}

                <Button theme="primary" onClick={handleClick}>Save Changes</Button>
                <Button theme="secondary">Abort</Button>
            </Grid>
        </div>
    )
}


// proptypes
EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
  }
  
  // Component State
  function editProfileState(state) {
    return {
      user: state.user,
    }
  }
  
  export default connect(editProfileState, {updateProfile})(EditProfile)