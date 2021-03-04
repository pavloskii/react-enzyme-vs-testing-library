import React from "react";
import { mount } from "enzyme";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

//Enzyme
describe("App input (enzyme)", () => {
  it("does not show range reached alert on initial load", () => {
    const wrapper = mount(<App />);

    const input = wrapper.find("input")
    
    input.simulate("change", { target: { value: "test value" } });
    // input.instance().value = "foo"

    expect(input.instance()).toHaveValue("test value");
  });
});

//React Testing Library
describe("App input (RTL)", () => {
  it("does not show range reached alert on initial load", () => {
    render(<App />);

    // const input = screen.getByPlaceholderText(/random input/i);
    const input = screen.getByRole("textbox", {
      name: /the random input/i,
    });

    userEvent.type(input, "test value");

    expect(input).toHaveValue("test value");
  });
});
