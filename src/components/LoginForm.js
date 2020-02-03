/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ loginHandler, usernameField, passwordField }) => {
  const { reset: resetName, ...restOfName } = usernameField
  const { reset: resetPassword, ...restOfPassword } = passwordField
  return(
    <form onSubmit={loginHandler}>
      <div>
        username
        <input {...restOfName} name="username"/>
      </div>
      <div>
        password
        <input {...restOfPassword} name="password"/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}


LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
}

export default LoginForm