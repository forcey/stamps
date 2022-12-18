import './App.css';
import StampButtons from './components/StampButtons';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
  const stamps = [1, 3, 5, 10, 33, "forever", 65, 86, "global forever"];

  const onSelectionChanged = function (selected) {
    console.log("Selected: " + Array.from(selected).join(", "));
  }

  return (
    <div className="App">
      <Container fluid="md">
        <Row>
          <Col><StampButtons stamps={stamps} onSelectionChanged={onSelectionChanged} /></Col>
        </Row>
        <Row>
          <Col sm>
            <Form.Label htmlFor="target">Need</Form.Label>
            <Form.Control id="target" type="number" placeholder="100" htmlSize="10" />
          </Col>
          <Col sm>
            <Button>Calculate</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
