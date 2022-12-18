import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StampButtons({stamps, onSelectionChanged}) {
  const [selected, setSelected] = useState(new Set());

  const isChecked = function (stamp) {
    return selected.has(stamp);
  }
  const setChecked = function (stamp, checked) {
    if (checked) {
      selected.add(stamp);
    } else {
      selected.delete(stamp);
    }
    const newSelected = new Set(selected);
    setSelected(newSelected);
    onSelectionChanged(newSelected);
  }

  const renderButton = function(value) {
    return <ToggleButton
      className="mb-2"
      id={"toggle-" + value}
      key={value}
      type="checkbox"
      variant="outline-primary"
      checked={isChecked(value)}
      onChange={e => setChecked(value, e.currentTarget.checked)}
      style={{ marginRight: "1em" }}
    >
      {value}
    </ToggleButton>;
  }

  const stampButtons = stamps.map(renderButton);
  return (
    <Container fluid>
      <Row>
        <Col>{stampButtons}</Col>
      </Row>
    </Container>
  );
}

export default StampButtons;
