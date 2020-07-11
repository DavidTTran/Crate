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
import { upload, messageShow, messageHide } from './api/actions'




// class EditProfile extends React.Component {
const EditProfile = (props) => {
    const fileInput = React.createRef()

    const [ name, updateName ] = useState('')
    const [ email, updateEmail ] = useState('')
    const [ shippingAddress, updateShippingAddress ] = useState('')
    const [ description, updateDescription ] = useState('')
    const [ imagePath, updateImagePath ] = useState('')

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
            return props.user.details.shippingAddress
        }
        const updatedDescription = () => {
            if (description !== '') {
                return description
            }
            return props.user.details.description
        }
        const updatedImage = () => {
            if (imagePath !== '') {
                return imagePath
            }
            return props.user.details.image
        }

        return {
            name: updatedName,
            email: updatedEmail,
            shippingAddress: updatedShippingAddress(),
            description: updatedDescription(),
            image: updatedImage()
        }
    }

    const clearInputs = () => {
        updateName()
        updateEmail()
        updateShippingAddress()
        updateDescription()
    }

    const onUpload = (event) => {
        let data = new FormData()
        data.append('file', event.target.files[0])
        // Upload image
        props.upload(data)
          .then(response => {
            if (response.status === 200) {
                console.log(response.data)
                //below puts it into component state
              updateImagePath(response.data.file)
            } else {
              this.props.messageShow('Please try again.')
            }
          })
          .catch(error => {
            console.error(error)
          })
      }


    return (
        <div>
            <Grid style={{ backgroundColor: grey }}>
            <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                <H3 font="secondary">Edit My Profile</H3>
            </GridCell>
            </Grid>

            <Grid alignCenter={true}>
                <GridCell style={{margin: '5% 0 0 15%', width: '50%'}}>
                    <label htmlFor="name"  style={{ margin: '5%', textAlign: 'center' }}>Update Name:</label>
                    <Input style={{ margin: '1% 0 10% 0', textAlign: 'center' }}
                            type="text"
                            name="name"
                            value={name}
                            placeholder={props.user.details.name}
                            onChange={e => updateName(e.target.value)}
                        />


                    <label htmlFor="email"  style={{ margin: '5%', textAlign: 'center' }}>Update Email:</label>
                    <Input style={{ margin: '1% 0 10% 0', textAlign: 'center' }}
                        type="text"
                        name="email"
                        value={email}
                        placeholder={props.user.details.email}
                        onChange={e => updateEmail(e.target.value)}
                    />

                    <label htmlFor="shipping-address"  style={{ marginTop: '5%', textAlign: 'center' }}>Update Shipping Address:</label>
                    <Input style={{ margin: '1% 0 10% 0', textAlign: 'center' }}
                        type="text"
                        name="shipping-address"
                        value={shippingAddress}
                        placeholder={props.user.details.shippingAddress !== '' ? props.user.details.shippingAddress : 'enter address'}
                        onChange={e => updateShippingAddress(e.target.value)}
                    />
                </GridCell>

                <GridCell style={{width: '50%'}}> 
                    <label htmlFor="description">Update Description:</label>
                    <Textarea
                        // type="text"
                        rows="4"
                        cols="50"
                        name="description"
                        value={description}
                        placeholder={props.user.details.description !== '' ? props.user.details.description : 'enter a description'}

                        onChange={e => updateDescription(e.target.value)}
                    />
                {/* Upload File */}
                <section style={{ margin: '5%', display: 'block' }}>
                    <label htmlFor="profile-picture" style={{margin: '0 5%'}}>Update Profile Picture:</label>
                    <input
                      type="file"
                      name="profile-picture"
                      onChange={e => onUpload(e)}
                    />
                  </section>
                </GridCell>

                <GridCell style={{ margin: '0 5%'}} >
                    <Link to={userRoutes.profile.path}>
                      <Button theme="primary" onClick={handleClick} style={{display: 'block', marginBottom: '5%'}}>Save Changes</Button>
                    </Link>
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
    updateProfile: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired,
  }

  // Component State
  function editProfileState(state) {
    return {
      user: state.user,
    }
  }

  export default connect(editProfileState, {updateProfile, upload})(EditProfile)
