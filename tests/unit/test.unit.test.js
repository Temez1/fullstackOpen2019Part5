import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import SimpleBlog from "../../src/components/test"

afterEach(cleanup)

test("renders title, author and likes", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "mikki",
    likes: 5
  }

  const component = render(
    <SimpleBlog blog = {blog} />
  )

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  )
  expect(component.container).toHaveTextContent("mikki")
  expect(component.container).toHaveTextContent("5")
})