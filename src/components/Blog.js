import React, { useState } from "react"
const Blog = ({ blog }) => {

  const blogStyle = {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderTopStyle: "solid",
    borderColor: "black",
  }

  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const toggleDetails = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  return(
    <div style={blogStyle}>
      <div onClick={toggleDetails}>
        {blog.title} {blog.author} {showBlogDetails ? blog.url : null} {showBlogDetails? blog.likes !== undefined && blog.likes : null}
      </div>
    </div>
  )
}

export default Blog