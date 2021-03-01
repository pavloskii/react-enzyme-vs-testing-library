import React from 'react';
import Counter from "./components/Counter";

function App() {
  return (
    <div className="App">
      <h1>Enzyme vs React Testing Library</h1>
      <Counter min={0} max={10} />
    </div>
  );
}

export default App;
