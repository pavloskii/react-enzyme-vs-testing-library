import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";

import CounterFC from "../components/CounterFC";

describe("RangeCounterB", () => {
  afterEach(cleanup);

  it("does not show range reached alert on initial load", () => {
    const { queryByText } = render(<CounterFC />);
    expect(queryByText("Range limit reached!")).toBeNull();
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    const { getByText } = render(<CounterFC min={0} max={1} />);

    const incrementButton = getByText("+");
    fireEvent.click(incrementButton);

    expect(getByText("Range limit reached!")).toBeVisible();
  });

  describe("when incrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      const { getByTestId, getByText } = render(<CounterFC min={2} />);

      const incrementButton = getByText("+");
      fireEvent.click(incrementButton);

      expect(getByTestId("counter-value").innerHTML).toEqual("3");
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      //My prefered way, using the Testing Playground extension
      render(<CounterFC min={0} max={0} />);

      const incrementButton = screen.getByRole("button", {
        name: /\+/i
      });
      fireEvent.click(incrementButton);

      //by using the data-testid="counter-value" property
      const counterValue = screen.getByTestId('counter-value');

      expect(counterValue.innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      const { getByTestId, getByText } = render(<CounterFC />);

      const incrementButton = getByText("+");
      const decrementButton = getByText("-");
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);

      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      const { getByTestId, getByText } = render(<CounterFC />);

      const incrementButton = getByText("-");
      fireEvent.click(incrementButton);
      
      expect(getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });
});
