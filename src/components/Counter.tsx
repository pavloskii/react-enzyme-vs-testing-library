import React from "react";

interface CounterProps {
  min?: number;
  max?: number;
}

const Counter = ({ min = 0, max = 10 }: CounterProps) => {
  const [counter, setCounter] = React.useState(min);
  const [hasEdited, setHasEdited] = React.useState(false);

  React.useEffect(() => {
    if (counter !== min && !hasEdited) {
      setHasEdited(true);
    }
  }, [counter, hasEdited, min]);

  return (
    <div className="RangeCounter">
      <span className="RangeCounter__title">Counter (Function Comp)</span>
      <div className="RangeCounter__controls">
        <button
          disabled={counter <= min}
          onClick={() => setCounter(counter - 1)}
        >
          -
        </button>
        <span data-testid="counter-value">{counter}</span>
        <button
          disabled={counter >= max}
          onClick={() => setCounter(counter + 1)}
        >
          +
        </button>
      </div>
      {(counter >= max || counter <= min) && hasEdited && (
        <span className="RangeCounter__alert">Range limit reached!</span>
      )}
    </div>
  );
};

export default Counter;
