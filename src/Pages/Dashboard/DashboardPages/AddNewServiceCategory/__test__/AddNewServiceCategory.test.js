import { render, screen } from "@testing-library/react";
import AddNewServiceCategory from "../AddNewServiceCategory";

test("Add Service Category Page", async () => {
  render(<AddNewServiceCategory />);
  const CategoryHeadingElement = screen.getByText("Add Service Category");
  expect(CategoryHeadingElement).toBeInTheDocument();
});
