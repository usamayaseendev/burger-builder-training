import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const NotFound = props => {
  useEffect(() => {
    props.setActiveItem('')
  }, [])
  return (
    <div
      style={{
        height: '100vh',
        borderWidth: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>404 Error</h1>
      <h6>Page Not Found</h6>
    </div>
  )
}

NotFound.propTypes = {
  setActiveItem: PropTypes.func
}

export default NotFound
