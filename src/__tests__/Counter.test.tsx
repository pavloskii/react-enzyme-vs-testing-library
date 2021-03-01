import React from "react";
import { mount } from "enzyme";

import Counter from "../components/Counter";

describe("CounterFC", () => {
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
