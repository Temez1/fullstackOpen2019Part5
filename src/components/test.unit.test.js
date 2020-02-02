import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import SimpleBlog from "./test"

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

test("like button gets pressed twice when you press it twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "mikki",
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog = {blog} onClick = {mockHandler} />
  )
  const button = getByText("like")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
