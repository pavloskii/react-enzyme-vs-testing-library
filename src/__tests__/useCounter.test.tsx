import React from "react";
import { act as _act } from "react-dom/test-utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { mount } from "enzyme";
import { useCounter } from "../hooks/useCounter";

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
const setup = (counterProps?: Parameters<typeof useCounter>[0]) => {
  let result: {
    target: { count: number; increment: () => void; decrement: () => void };
  } = { target: null! };

  const HookWrapper: React.FC = () => {
    result.target = useCounter(counterProps);
    return null;
  };
  const wrapper = mount(<HookWrapper />);

  return { result: result, wrapper };
};

describe("useCounter (Enzyme)", () => {
  it("exposes the count and increment/decrement functions", () => {
    const { result } = setup();

    expect(result.target.count).toBe(0);

    _act(() => result.target.increment());
    expect(result.target.count).toBe(1);

    _act(() => result.target.decrement());
    expect(result.target.count).toBe(0);
  });

  it("allows customization of the initial count", () => {
    const { result } = setup({ initialCount: 3 });

    expect(result.target.count).toBe(3);
  });

  it("allows customization of the step", () => {
    const { result } = setup({ step: 2 });

    expect(result.target.count).toBe(0);

    _act(() => result.target.increment());
    expect(result.target.count).toBe(2);

    _act(() => result.target.decrement());
    expect(result.target.count).toBe(0);
  });

  it("the step can be changed", () => {
    let result!: {
      count: number;
      increment: () => void;
      decrement: () => void;
    };
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
  const result: { current: THookReturn } = { current: null! };

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
