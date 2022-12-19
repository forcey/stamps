import './App.css';
import StampButtons from './components/StampButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import calculate from './algorithm/calculate';
import React, { useState } from 'react';
import Postage from './components/Postage';

function App() {
  const stamps = [1, 3, 5, 10, 33, "forever", 65, 86, "global forever"];
  const [selected, setSelected] = useState(new Set());
  const [solution, setSolution] = useState(null);

  const onSelectionChanged = function (selected) {
    setSelected(selected);
  }

  const getSolutions = function (postage) {
    const values = Array.from(selected).map(function (value) {
      if (value === "forever") {
        return 60;
      } else if (value === "global forever") {
        return 140;
      } else {
        return value;
      }
    });
    const solution = calculate(values, postage);
    setSolution(solution);
  }

  const solutionRow = (solution) ?
    solution.paths.map((path, i) => (<Row key={"solution_" + i}>{path.join(', ')}</Row>)) :
    <Row>No solution</Row>;

  return (
    <div className="App">
      <Container fluid="md">
        <Row>
          <Col><StampButtons stamps={stamps} onSelectionChanged={onSelectionChanged} /></Col>
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
