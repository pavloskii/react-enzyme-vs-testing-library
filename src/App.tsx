import React from "react";
import Counter from "./components/Counter";
import Input from "./components/Input";

function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="App">
      <h1>Enzyme vs React Testing Library</h1>
      <Counter min={0} max={10} />
      <Input
        placeholder="Random input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        alt="random input on the page"
        name="randomInput"
        label="The Random Input"
      />
    </div>
  );
}

export default App;
