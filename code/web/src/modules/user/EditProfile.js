import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../../ui/button'
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey} from '../../ui/common/colors'
import { update } from './api/actions'




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
    
    const handleClick = () => {
        // console.log(props.user)
        const updatedUser = {
            // id: props.user.id,
            name,
            email,
            shippingAddress,
            description
        }
        props.update(updatedUser)
        clearInputs()
    }

    const clearInputs = () => {
        updateName('')
        updateEmail('')
        updateShippingAddress('')
        updateDescription('')
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
                    // placeholder={props.user.details.address}
                    placeholder="address"
                    onChange={e => updateShippingAddress(e.target.value)}
                />
                <input 
                    type="text"
                    name="description"
                    value={description}
                    // placeholder={props.user.details.description}
                    placeholder="description"
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
  
  export default connect(editProfileState, {update})(EditProfile)