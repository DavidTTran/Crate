// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => (
  <div>
    {/* SEO */}
    {/* not sure exactly what helmet does...i found it on NPM and it says "This reusable React component will manage all of your changes to the document head. Helmet takes plain HTML tags and outputs plain HTML tags. The notes say it has something to do with SEO? Maybe it combines things for the title to make it more search friendly?*/}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    {/* this is the horizontal My profile banner */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

  {/* this section shows the user's name, their email and has buttons for subscriptions and logout. I am thinking this is probably the best section to add the image, personal description and shipping address. Then maybe another component will be available to edit all of those? Maybe add a button that will take us to an update/edit user info component */}
    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// these are prop types saying that the user needs to be an object and logout is a function
// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// redux access to the state for user
// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

// export and connect the component to redux
export default connect(profileState, { logout })(Profile)
