import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { act as _act } from 'react-dom/test-utils';
import { useCounter } from "../hooks/useCounter";
import { mount } from "enzyme";

//React Testing Library
describe("useCounter (RTL)", () => {
  it("exposes the count and increment/decrement functions", () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it("allows customization of the initial count", () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialCount: 3 }
    });

    expect(result.current.count).toBe(3);
  });

  it("allows customization of the step", () => {
    const { result } = renderHook(useCounter, { initialProps: { step: 2 } });

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(2);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it("the step can be changed", () => {
    const { result, rerender } = renderHook(useCounter, {
      initialProps: { step: 3 }
    });

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(3);

    rerender({ step: 2 });

    act(() => result.current.decrement());
    expect(result.current.count).toBe(1);
  });
});

//Enzyme
describe("useCounter (Enzyme)", () => {
  it("exposes the count and increment/decrement functions", () => {
    let result: { count: number; increment: () => void; decrement: () => void };
    const HookWrapper: React.FC = () => {
      result = useCounter();
      return null;
    };
    mount(<HookWrapper />);

    expect(result.count).toBe(0);

    _act(() => result.increment());
    expect(result.count).toBe(1);

    _act(() => result.decrement());
    expect(result.count).toBe(0);
  });
});
