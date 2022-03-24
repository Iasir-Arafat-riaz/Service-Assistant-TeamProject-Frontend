import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../../redux/Store/store";
import AddServiceRequest from "../AddServiceRequest";

const MockAddServiceRequest = () => {
  return (
    <Provider store={store}>
      <AddServiceRequest />
    </Provider>
  );
};

test("Testing Add Service Request Page", async () => {
  render(<MockAddServiceRequest />);
  const AddServiceTitleHeadingElement = screen.getByTestId("service-Title");
  expect(AddServiceTitleHeadingElement).toBeInTheDocument();
});
