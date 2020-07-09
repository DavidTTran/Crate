import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../../ui/button'
import { Grid, GridCell } from '../../ui/grid'
import { Input, Textarea } from '../../ui/input'
import { H3 } from '../../ui/typography'
import { grey} from '../../ui/common/colors'
import { updateProfile } from './api/actions'
import userRoutes from '../../setup/routes/user'



// class EditProfile extends React.Component {
const EditProfile = (props) => {
    console.log(props.user)
    const fileInput = React.createRef()

    const [ name, updateName ] = useState('')
    const [ email, updateEmail ] = useState('')
    const [ shippingAddress, updateShippingAddress ] = useState('')
    const [ description, updateDescription ] = useState('')
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
        await props.updateProfile(updatedUser)
        .then(data => console.log(data))
        .catch(err => console.error(err))
        clearInputs()
    }

    // need better error handling
    const createUpdatedUser = () => {
        console.log(props.user)
        const updatedName = name !== '' ? name : props.user.details.name
        const updatedEmail = email !== '' ? email : props.user.details.email
        const updatedShippingAddress = () => {
            if (shippingAddress !== '') {
                return shippingAddress
            }
            if (props.user.details.shippingAddress === undefined) {
                return 'no shipping address on file'
            }
            return props.user.details.shippingAddress
        }
        const updatedDescription = () => {
            if (description !== '') {
                return description
            }
            if (props.user.details.description === undefined) {
                return 'no description on file'
            }
            return props.user.details.description
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

            <Grid alignCenter={true}>
                <GridCell>
                    <label for="name"  style={{ padding: '2em', margin: '5%', textAlign: 'center' }}>Name:</label>
                    <Input style={{ padding: '2em', marginTop: '5%', textAlign: 'center' }}
                            type="text"
                            name="name"
                            value={name}
                            placeholder={props.user.details.name}
                            onChange={e => updateName(e.target.value)}
                        />
                    
                    
                    <label for="email"  style={{ padding: '2em', margin: '5%', textAlign: 'center' }}>Email:</label>
                    <Input 
                        type="text"
                        name="email"
                        value={email}
                        placeholder={props.user.details.email}
                        onChange={e => updateEmail(e.target.value)}
                    />
                    
                    <label for="shipping-address"  style={{ padding: '2em', marginTop: '5%', textAlign: 'center' }}>Shipping Address:</label>
                    <Input
                        type="text"
                        name="shipping-address"
                        value={shippingAddress}
                        placeholder={props.user.details.shippingAddress !== '' ? props.user.details.shippingAddress : 'enter address'}
                        onChange={e => updateShippingAddress(e.target.value)}
                    />
                </GridCell>

                <GridCell>
                    <label for="description">Decsription:</label>
                    <Textarea 
                        // type="text"
                        rows="4"
                        cols="50"
                        name="description"
                        value={description}
                        placeholder={props.user.details.description !== '' ? props.user.details.description : 'enter a description'}
                        
                        onChange={e => updateDescription(e.target.value)}
                    />
                </GridCell>

                {/* Upload File */}
                {/* <div style={{ marginTop: '1em' }}>
                    <input
                      type="file"
                      onChange={this.onUpload}
                      required={this.state.product.id === 0}
                    />
                  </div> */}

                  {/* Uploaded image */}
                  {/* {renderIf(this.state.product.image !== '', () => (
                    <img src={routeImage + this.state.product.image} alt="Product Image"
                         style={{ width: 200, marginTop: '1em' }}/>
                  {/* ))} */}


                <GridCell>
                    <Button theme="primary" onClick={handleClick}>Save Changes</Button>
                    <Link to={userRoutes.profile.path}>
                        <Button onClick={clearInputs}theme="secondary">Abort</Button>
                    </Link>
                </GridCell>
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