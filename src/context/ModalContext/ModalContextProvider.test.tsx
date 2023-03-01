import { render, screen } from "@testing-library/react";
import ModalProvider from "./ModalContextProvider";

describe ('Modal Context Provider', () => {
  it('should render modal context provider component', () => {
    const component = render(<ModalProvider />)
    expect(component).toMatchSnapshot()
  });
  it ('should hide modal by default', () => {
    render(<ModalProvider />)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  });
});