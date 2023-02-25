import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChangeTaskForm from "./ChangeTaskForm";
import * as reduxHooks from "../../../redux/store";
import * as actions from "../../../redux/projectsSlice";
import userEvent from "@testing-library/user-event";

jest.mock("../../../redux/store");

const mockedDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

const props = {
  id: 1,
  status: "Queue",
  text: "1",
  description: "",
  priority: "low",
  subTasks: [],
};

describe("ChangeTaskFrom", () => {
  test("should create ChangeTaskForm with taskData", () => {
    const component = render(<ChangeTaskForm taskData={props} />);
    expect(component).toMatchSnapshot();
  });

  test("should dispatch after submit form", async () => {
    const dispatch = jest.fn();

    mockedDispatch.mockReturnValue(dispatch);

    render(<ChangeTaskForm taskData={props} />);

    const button = screen.getByRole("button", { name: /accept/i });

    fireEvent.submit(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test("should call dispatch with correct data", async () => {
    const dispatch = jest.fn();
    const text = "Text";
    const priority = "middle";
    const description = "Description";
    const subTasks: never[] = [];

    mockedDispatch.mockReturnValue(dispatch);

    render(<ChangeTaskForm taskData={props} />);

    const button = screen.getByRole("button", { name: /accept/i });

    fireEvent.input(screen.getByTestId("text"), {
      target: { value: text },
    });
    userEvent.selectOptions(screen.getByTestId("priority"), "middle");
    fireEvent.input(screen.getByTestId("description"), {
      target: { value: description },
    });

    fireEvent.submit(button);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "projects/changeTask",
        payload: {
          taskId: props.id,
          section: props.status,
          newText: text,
          newDescription: description,
          newPriority: priority,
          newSubTasks: subTasks,
        },
      });
    });
  });

  test("should add subtask after click button", async () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    render(<ChangeTaskForm taskData={props} />);
    const button = screen.getByRole("button", { name: /\+/ });
    fireEvent.click(button);
    const input = screen.getByTestId("addButtonInput");
    userEvent.type(input, "something");
    userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(screen.getAllByTestId("subtask")).toHaveLength(1);
    });
  });
});
