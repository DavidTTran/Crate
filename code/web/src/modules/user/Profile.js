//Nick comments here

// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
// The helmet overrides the current title tag of a parent component to this one on the page.  (I think)
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
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>
    {/* Here is where we will add in the user interface, with more components possibly,
    to add:   Image, personal desc, edit email shipping address, product history, upcoming delivery dates and
    ability to adjust*/}
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
    {/* Example dummy component for uploading picture */}
    <Grid style={{textAlign: 'center'}}>
    <form>
    <input
    type="file"
    placeholder="upload file here" />
    <Button them="primary">Add Picture</Button>
    </form>
    </Grid>
  </div>
)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
// redux state.  Probably add more for updated user information
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
