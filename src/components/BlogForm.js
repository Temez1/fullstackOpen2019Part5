import React from 'react'

  const BlogForm = ({blogFormHandler, blogState, blogSetter}) => (
    <form onSubmit={blogFormHandler}>
      <input
        value={blogState}
        onChange={({target}) => blogSetter(target.value)}
      />
      <button type="submit">save</button>
    </form>  
  )

  export default BlogForm