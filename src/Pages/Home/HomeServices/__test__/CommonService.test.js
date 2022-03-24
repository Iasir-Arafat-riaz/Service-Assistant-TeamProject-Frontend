import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../redux/Store/store";
import CommonService from "../CommonService";

const Wrapper = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CommonService
          service={{
            Category: "sagar",
            Img: "https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/276261588_10160089725566291_6050113923392234442_n.jpg?stp=dst-jpg_p180x540&_nc_cat=110&ccb=1-5&_nc_sid=9267fe&_nc_ohc=NTSgcyBHnV4AX8Jv6hn&_nc_ht=scontent.fdac135-1.fna&oh=00_AT9CHjuZBn0yIecv2PN9qIaxPbqBAwHx4m1eY2gl8yCTAg&oe=6241DD9A",
            Id: "asdfsdaf5",
          }}
          single={5}
        />
      </BrowserRouter>
    </Provider>
  );
};

test("Testing All Services", async () => {
  render(<Wrapper />);
  const ServiceHeadingElements = screen.getByText("sagar");
  expect(ServiceHeadingElements).toBeInTheDocument();
});
