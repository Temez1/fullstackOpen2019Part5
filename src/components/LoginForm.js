import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ loginHandler, usernameState, usernameSetter, passwordState, passwordSetter }) => (
  <form onSubmit={loginHandler}>
    <div>
      username
      <input
        type="text"
        value={usernameState}
        name="Username"
        onChange={({ target }) => usernameSetter(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={passwordState}
        name="Password"
        onChange={({ target }) => passwordSetter(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  usernameSetter: PropTypes.func.isRequired,
  passwordSetter: PropTypes.func.isRequired,
  usernameState: PropTypes.string.isRequired,
  passwordState: PropTypes.string.isRequired
}

export default LoginForm