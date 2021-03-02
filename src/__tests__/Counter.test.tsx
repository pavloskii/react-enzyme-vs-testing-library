import React from "react";
import { mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";

import Counter from "../components/Counter";

//Enzyme
describe("Counter Enzyme", () => {
  it("does not show range reached alert on initial load", () => {
    const wrapper = mount(<Counter />);

    const alert = wrapper.find(".RangeCounter__alert");
    expect(alert).toHaveLength(0);
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    const wrapper = mount(<Counter min={0} max={1} />);

    const incrementButton = wrapper.find("button").last();
    incrementButton.simulate("click");

    const alert = wrapper.find(".RangeCounter__alert");
    expect(alert.text()).toEqual("Range limit reached!");
  });

  describe("when incrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      const wrapper = mount(<Counter min={2} />);

      const incrementButton = wrapper.find("button").last();
      incrementButton.simulate("click");

      const counterValue = wrapper.find("[data-testid='counter-value']");
      expect(counterValue.text()).toEqual("3");
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update the counter value", () => {
      const wrapper = mount(<Counter min={0} max={0} />);

      const incrementButton = wrapper.find("button").last();
      incrementButton.simulate("click");

      const counterValue = wrapper.find("[data-testid='counter-value']");
      expect(counterValue.text()).toEqual("0");
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates the counter value", () => {
      const wrapper = mount(<Counter />);

      const incrementButton = wrapper.find("button").last();
      const decrementButton = wrapper.find("button").first();
      incrementButton.simulate("click");
      decrementButton.simulate("click");

      const counterValue = wrapper.find("[data-testid='counter-value']");
      expect(counterValue.text()).toEqual("0");
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update the counter value", () => {
      const wrapper = mount(<Counter />);

      const decrementButton = wrapper.find("button").first();
      decrementButton.simulate("click");

      const counterValue = wrapper.find("[data-testid='counter-value']");
      expect(counterValue.text()).toEqual("0");
    });
  });
});

//React Testing Library

describe("Counter", () => {
  it("does not show range reached alert on initial load", () => {
    const { queryByText } = render(<Counter />);
    expect(queryByText("Range limit reached!")).toBeNull();
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    const wrapper = render(<Counter min={0} max={1} />);

    const incrementButton = wrapper.getByText("+");
    fireEvent.click(incrementButton);

    expect(wrapper.getByText("Range limit reached!")).toBeVisible();
  });

  describe("when incrementing counter is allowed", () => {
    it("updates the counter value", () => {
      const { getByTestId, getByText } = render(<Counter min={2} />);

      const incrementButton = getByText("+");
      fireEvent.click(incrementButton);

      expect(getByTestId("counter-value").innerHTML).toEqual("3");
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update the counter value", () => {
      //My prefered way, using the Testing Playground extension
      render(<Counter min={0} max={0} />);

      const incrementButton = screen.getByRole("button", {
        name: /\+/i
      });
      fireEvent.click(incrementButton);

      //by using the data-testid="counter-value" property
      const counterValue = screen.getByTestId("counter-value");

      expect(counterValue.innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates the counter value", () => {
      const { getByTestId, getByText } = render(<Counter />);

      const incrementButton = getByText("+");
      const decrementButton = getByText("-");
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);

      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      const { getByTestId, getByText } = render(<Counter />);

      const incrementButton = getByText("-");
      fireEvent.click(incrementButton);

      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });
});

//Direct Comparison 
describe("Direct comparison", () => {
  //React Testing Library
  it("updates the counter value (RTL)", () => {
    const wrapper = render(<Counter />);

    const incrementButton = wrapper.getByRole("button", { name: /\+/i });
    const decrementButton = wrapper.getByText("-");
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    //You can use screen for the same methods (can put the rendering in beforeEach)
    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue.innerHTML).toEqual("0");
  });

  //Enzyme
  it("updates the counter value (Enzyme)", () => {
    const wrapper = mount(<Counter />);

    //Hard to select by how user sees the page (button with text)
    //We need to use css selectors (by button tag) and filters
    //(which can change and break tests = implementation details)
    const incrementButton = wrapper.find("button").last();
    const decrementButton = wrapper.find("button").first();
    incrementButton.simulate("click");
    decrementButton.simulate("click");

    const counterValue = wrapper.find("[data-testid='counter-value']");
    expect(counterValue.text()).toEqual("0");
  });
});
