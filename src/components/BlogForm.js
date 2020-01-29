import React from "react"

const BlogForm = ({ blogFormHandler, blogState, blogSetter }) => (
  <form onSubmit={blogFormHandler}>
    <div>
        title
      <input
        value={blogState}
        onChange={({ target }) => blogSetter(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm