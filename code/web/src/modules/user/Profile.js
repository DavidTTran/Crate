// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { routeImage, routes } from '../../setup/routes'

// UI Imports
import ImageTile from '../../ui/image/Tile'
import { level1 } from '../../ui/common/shadows'
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component

const Profile = (props) => {
  const imageRoute = "http://localhost:8000/images/uploads/"
  const profilePicRoute = props.user.details.image
  
  return (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>
    
    <H4 style={{ margin: '1% 0 2%', textAlign: 'center' }} >{props.user.details.name}</H4> 

    <section style={{display : 'inline-block', width : '30%'}}>
      <ImageTile width={300} height={300} shadow={level1} style={{margin: '0 20% 0 70%'}}image={imageRoute + profilePicRoute} />
    </section>

    <section style={{display : 'inline-block', width: '40%'}}>


      <GridCell style={{ textAlign: 'center', margin: '0 0 5% 50%', fontSize: '1em',  }}>
        <h2 style={{fontSize: '1.4em', margin: '0', padding: '0'}}>My Info</h2>
        <h3 style={{margin: '5% 0 2% 0'}}>Email</h3>
        <p>{props.user.details.email}</p>
        <h3 style={{margin: '5% 0 2% 0'}}>Shipping Address:</h3>
        <p>{props.user.details.shippingAddress}</p>
        <h3 style={{margin: '5% 0 2% 0'}}>Description:</h3>
        <p>{props.user.details.description}</p>
      </GridCell>
      </section>
      <GridCell style={{textAlign: 'center', marginTop: '2%'}}>
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Link to={userRoutes.editProfile.path}>
          <Button theme="secondary" style={{ marginLeft: '1%'}}>Edit Profile</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
  </div>
)
  }

// Component Properties.
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}


// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
