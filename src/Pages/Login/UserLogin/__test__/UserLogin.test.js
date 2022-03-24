import { render, screen } from "@testing-library/react";
import UserLogin from "../UserLogin";

describe("Testing login page", () => {
  test("Testing User Login Pgae", () => {
    render(<UserLogin />);
    const LoginHeadingEle = screen.getByText("Please Login");
    expect(LoginHeadingEle).toBeInTheDocument();
  });

  test("Testing User Input Element", () => {
    render(<UserLogin />);
    const EmailInput = screen.getByPlaceholderText("Enter Your Email");
    expect(EmailInput).toBeInTheDocument();
  });
});
