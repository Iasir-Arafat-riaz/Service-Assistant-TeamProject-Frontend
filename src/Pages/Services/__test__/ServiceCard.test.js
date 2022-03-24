import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceCard from "../ServiceCard";

const ServiceCardWrapper = () => {
  return (
    <BrowserRouter>
      <ServiceCard
        Name="Sagar"
        Id="215s"
        Img="https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/276100468_1022196251713356_5917923655577680010_n.jpg?stp=dst-jpg_p180x540&_nc_cat=108&ccb=1-5&_nc_sid=a26aad&_nc_ohc=cSfC_1ci5tEAX9-iJzw&_nc_ht=scontent.fdac135-1.fna&oh=00_AT9NWJriLn885ogzwTZUXtWSfpgQX47H1VhC1vo77ICJHA&oe=624188A0"
      ></ServiceCard>
    </BrowserRouter>
  );
};

test("Testing Service Card Component Passing With Props", () => {
  render(<ServiceCardWrapper />);
  const ServiceHeadingEle = screen.getByText("Sagar");
  expect(ServiceHeadingEle).toBeInTheDocument();
});
