import { fireEvent, render, screen } from "@testing-library/react";
import AddButton from "./AddButton";
import * as AppDispatch from "../../redux/store";

jest.mock("../../redux/store");
const mockedDispatch = jest.spyOn(AppDispatch, "useAppDispatch");

describe("AddButton", () => {
  
  test("should create add button", () => {
    const component = render(<AddButton />);
    expect(component).toMatchSnapshot();
  });

  test("should render button", () => {
    render(<AddButton />);
    const element = screen.getByRole("button");
    expect(element).toBeEnabled;
    expect(element).toHaveTextContent("+");
  });

  test("should button been hide after click", () => {
    render(<AddButton />);
    const element = screen.getByRole("button");
    fireEvent.click(element);
    expect(element).not.toBeInTheDocument();
  });

  test("should input show after click", () => {
    render(<AddButton />);
    const element = screen.getByRole("button");
    fireEvent.click(element);
    expect(screen.queryByRole("textbox")).toBeInTheDocument();
  });

  test("should input accept changes after press enter key", () => {
    const dispatch = jest.fn();
    const fn = jest.fn();

    mockedDispatch.mockReturnValue(dispatch);

    render(<AddButton action={fn} callback={fn} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).not.toBeInTheDocument();
    expect(dispatch).toBeCalledTimes(1);
  });

  test("should input close after press esc key", () => {
    const fn = jest.fn();

    render(<AddButton action={fn} callback={fn} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Esc" });

    expect(input).not.toBeInTheDocument();
  });
});
