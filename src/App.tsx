import { useState } from 'react'
import StampButtons from './components/StampButtons';
import Postage from './components/Postage';
import calculate, { Solution } from './algorithm/calculate';
import { Stamp } from './algorithm/stamp';

import './App.css';

function App() {
  const stamps = ([1, 3, 5, 10, 29, 32, 33, 65, 86].map(v => Stamp.fixed(v)).concat(
    [Stamp.forever(), Stamp.globalForever()])).sort((a, b) => a.value - b.value);
  
  // Initialize selected state with all stamps except 65¢
  const initialSelected = new Map();
  stamps.forEach(stamp => {
    if (stamp.value !== 65) {
      initialSelected.set(stamp.id, stamp);
    }
  });
  
  const [selected, setSelected] = useState(initialSelected);
  const [solution, setSolution] = useState<Solution | null>(null);

  const getSolutions = function (postage: number) {
    const solution = calculate(Array.from(selected.values()), postage);
    setSolution(solution);
  }

  const solutionRow = (solution) ?
    solution.paths.map((path, i) => (<div key={"solution_" + i}>{path.map(x => x.name).join(', ')}</div>)) :
    <div>No solution</div>;

  return (
    <div className="App">
      <div>
        <StampButtons stamps={stamps} onSelectionChanged={setSelected} initialSelection={initialSelected} />
      </div>
      <div>
        <Postage onSetPostage={(p: number) => getSolutions(p)} />
      </div>
      {solutionRow}
    </div>
  );
}

export default App
