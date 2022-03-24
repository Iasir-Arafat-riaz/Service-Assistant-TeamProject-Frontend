import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../redux/Store/store";
import RecentlyViews from "../RecentlyViews";

const Wrapper = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RecentlyViews
        //   Category="sagar"
        //   Id="asdfdasf44"
        //   Img="https://external.fdac135-1.fna.fbcdn.net/safe_image.php?d=AQGTQa8iry0qOXsb&w=500&h=261&url=https%3A%2F%2Fkhela71.com%2Fwp-content%2Fuploads%2F2021%2F01%2Fandy-bichel-and-michael-bevan-khela71-2.jpg&cfs=1&ext=jpg&_nc_oe=6fcbf&_nc_sid=06c271&ccb=3-5&_nc_hash=AQGLMB0KptVe9SyM"
        />
      </BrowserRouter>
    </Provider>
  );
};

test("Testing Recently View Card", () => {
  render(<Wrapper />);
  const ServiceHeadingElements = screen.getByText("Recently View");
  expect(ServiceHeadingElements).toBeInTheDocument();
});
