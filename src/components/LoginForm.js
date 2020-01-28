import React from 'react'

const LoginForm = ({loginHandler, usernameState, usernameSetter, passwordState, passwordSetter}) => (
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

export default LoginForm