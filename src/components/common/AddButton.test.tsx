import { render } from "@testing-library/react"
import AddButton from "./AddButton"


describe('AddButton', () => { 
  test('should create add button' , () => {
    const component = render(<AddButton />)
    expect(component).toMatchSnapshot()
  })
  
  test('should first', () => { 
    
   })
 })