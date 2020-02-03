import React, { useState, useEffect } from "react"

import blogService from "./services/blogs"
import loginService from "./services/login"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

import useField from "./hooks/index"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogTitle = useField("text")
  const username = useField("text")
  const password = useField("password")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState("default")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newNotification = (message, style, timeoutInMilliseconds=5000) => {
    setNotificationStyle(style)
    setNotificationMessage(message)
    setMessageTimeout(setNotificationMessage, timeoutInMilliseconds)
  }

  const setMessageTimeout = (messageHandler, timeoutInMilliseconds=5000) => {
    setTimeout( () => {
      messageHandler(null)
    }, timeoutInMilliseconds)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username:username.value, password:password.value })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      newNotification("Logged in !", "success")
    } catch (exception) {
      newNotification("wrong credentials", "fail")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    newNotification("Logged out!", "success")
  }

  const addBlog = (event) => {
    event.preventDefault()
    const noteObject = {
      title: blogTitle.value,
      author: "test",
      url: "test.fi",
    }

    blogService
      .create(noteObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        blogTitle.reset()
      })
    newNotification("Added new blog!", "success")
  }

  return (
    <div>
      <h1>Blogs</h1>

      {notificationMessage !== null && <Notification messageState={notificationMessage} styleState={notificationStyle} />}

      <h2>Login</h2>

      { user === null
        ? <Togglable buttonLabel="login">
          <LoginForm
            loginHandler={handleLogin}
            usernameField={username}
            passwordField={password}
          />
        </Togglable>
        : <div>
          <p> {user.name} logged in</p>
          <Togglable buttonLabel="New blog">
            <BlogForm
              blogFormHandler={addBlog}
              blogTitleField={blogTitle}
            />
          </Togglable>
          <button onClick={handleLogout}>logout</button>
        </div>
      }
      {blogs.map(blog => <Blog blog = { blog } key={blog.id}/>)}
    </div>
  )
}

export default App
