import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { act as _act } from "react-dom/test-utils";
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

  it("allows customization of the initial count", () => {
    let result: { count: number; increment: () => void; decrement: () => void };
    const HookWrapper: React.FC = () => {
      result = useCounter({ initialCount: 3 });
      return null;
    };
    mount(<HookWrapper />);

    expect(result.count).toBe(3);
  });

  it("allows customization of the step", () => {
    let result: { count: number; increment: () => void; decrement: () => void };
    const HookWrapper: React.FC = () => {
      result = useCounter({ step: 2 });
      return null;
    };
    mount(<HookWrapper />);

    expect(result.count).toBe(0);

    _act(() => result.increment());
    expect(result.count).toBe(2);

    _act(() => result.decrement());
    expect(result.count).toBe(0);
  });

  it("the step can be changed", () => {
    let result: { count: number; increment: () => void; decrement: () => void };
    const HookWrapper: React.FC<{ step: number }> = ({ step }) => {
      result = useCounter({ step });
      return null;
    };
    const wrapper = mount(<HookWrapper step={3} />);

    expect(result.count).toBe(0);

    _act(() => result.increment());
    expect(result.count).toBe(3);

    wrapper.setProps({ step: 2 });

    _act(() => result.decrement());
    expect(result.count).toBe(1);
  });
});

//Try to copy the react testing library renderHook function but for Enzyme
function renderHookEnzyme<THookProps, THookReturn>(
  hook: (props: THookProps) => THookReturn,
  options: {
    initialProps?: THookProps;
  } = {}
) {
  const result: { current: THookReturn } = { current: null };

  const HookWrapper: React.FC<THookProps> = (wrapperProps: THookProps) => {
    result.current = hook({ ...wrapperProps });
    return null;
  };

  const wrapper = mount(
    <HookWrapper {...(options.initialProps ?? ({} as THookProps))} />
  );

  const rerender = (newProps: THookProps) => {
    wrapper.setProps(newProps);
  }; 

  return { result, rerender };
}

describe("renderHookEnzyme for testing hooks in Enzyme", () => {
  it("allows customization of the step", () => {
    const { result, rerender } = renderHookEnzyme(useCounter, {
      initialProps: { step: 3 }
    });

    expect(result.current.count).toBe(0);

    _act(() => result.current.increment());
    expect(result.current.count).toBe(3);

    rerender({ step: 2 });

    _act(() => result.current.decrement());
    expect(result.current.count).toBe(1);
  });
});
