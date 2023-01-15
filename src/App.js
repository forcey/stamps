import './App.css';
import StampButtons from './components/StampButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import calculate from './algorithm/calculate';
import { Stamp } from './algorithm/stamp';
import React, { useState } from 'react';
import Postage from './components/Postage';

function App() {
  const stamps = ([1, 3, 5, 10, 33, 65, 86].map(v => Stamp.fixed(v)).concat(
    [Stamp.forever(), Stamp.globalForever()])).sort((a, b) => a.value - b.value);
  const [selected, setSelected] = useState(new Map());
  const [solution, setSolution] = useState(null);

  const getSolutions = function (postage) {
    const solution = calculate(Array.from(selected.values()), postage);
    setSolution(solution);
  }

  const solutionRow = (solution) ?
    solution.paths.map((path, i) => (<Row key={"solution_" + i}>{path.map(x => x.name).join(', ')}</Row>)) :
    <Row>No solution</Row>;

  return (
    <div className="App">
      <Container fluid="md">
        <Row>
          <Col><StampButtons stamps={stamps} onSelectionChanged={setSelected} /></Col>
        </Row>
        <Row>
          <Col><Postage onSetPostage={p => getSolutions(p)} /></Col>
        </Row>
        {solutionRow}
      </Container>
    </div>
  );
}

export default App;
