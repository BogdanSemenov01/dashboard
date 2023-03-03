import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("App component", () => {
  it("should render correct title", () => {
    render(<App />)
    let title = screen.getByText(/Projects/i)
    expect(title).toBeInTheDocument()
  })

  it("should render app component", () => {
    const component = render(<App />)
    expect(component).toMatchSnapshot()
  })
})
