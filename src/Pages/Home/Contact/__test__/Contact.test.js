import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

test("Testing Contact Pgae", async () => {
  render(<Contact />);
  const LoginHeadingEle = screen.getByText("servicea2zweb@gmail.com");
  expect(LoginHeadingEle).toBeInTheDocument();
});
