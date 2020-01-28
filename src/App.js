import React, { useState, useEffect } from 'react'

import blogService from "./services/blogs"
import loginService from "./services/login"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState("default")
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
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
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      newNotification("wrong credentials", "fail")
    }
  }
  const addBlog = (event) => {
    event.preventDefault()
    const noteObject = {
      title: newBlog,
      author: "test",
      url: "test.fi",
    }

    blogService
      .create(noteObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog("")
      })
  }

  console.log(blogs)
  
  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notificationMessage} styleState={notificationStyle} />

      <h2>Login</h2>

      { user === null
        ? <LoginForm
          loginHandler={handleLogin}
          usernameState={username}
          usernameSetter={setUsername}
          passwordState={password}
          passwordSetter={setPassword}
        />
        : <div>
            <p> {user.name} loggin in</p>
            <BlogForm
              blogFormHandler={addBlog}
              blogState={newBlog}
              blogSetter={setNewBlog}
            />
          </div>
      }

    </div>
  )
}

export default App
