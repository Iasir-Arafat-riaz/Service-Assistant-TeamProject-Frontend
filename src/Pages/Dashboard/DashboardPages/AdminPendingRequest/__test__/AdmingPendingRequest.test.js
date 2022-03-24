import { render, screen } from "@testing-library/react";
import AdminPendingRequest from "../AdminPendingRequest";

test("Testing admin pending request page", async () => {
  render(<AdminPendingRequest />);
  // const pendingServiceElement = await screen.findByTestId("pending-service-0");
  const pendingServiceElement = await screen.findByText(
    "There is no pending services at this moment."
  );
  expect(pendingServiceElement).toBeInTheDocument();
});
