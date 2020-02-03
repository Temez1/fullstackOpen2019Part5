import React from "react"

const BlogForm = ({ blogFormHandler, blogTitleField }) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...rest } = blogTitleField
  return(
    <form onSubmit={blogFormHandler}>
      <div>
          title
        <input {...rest} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}


export default BlogForm
