import React from 'react';
import CounterFC from "./components/CounterFC";

function App() {
  return (
    <div className="App">
      <h1>Enzyme vs React Testing Library</h1>
      <CounterFC min={0} max={10} />
    </div>
  );
}

export default App;
