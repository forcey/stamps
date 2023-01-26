import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StampButtons({ stamps, onSelectionChanged }) {
  const [selected, setSelected] = useState(new Map());

  const isChecked = function (stamp) {
    return selected.has(stamp.id);
  }
  const setChecked = function (stamp, checked) {
    if (checked) {
      selected.set(stamp.id, stamp);
    } else {
      selected.delete(stamp.id);
    }
    const newSelected = new Map(selected);
    setSelected(newSelected);
    onSelectionChanged(newSelected);
  }

  const renderButton = function (stamp) {
    return <ToggleButton
      className="mb-2"
      id={"toggle-" + stamp.id}
      key={stamp.id}
      type="checkbox"
      variant="outline-primary"
      checked={isChecked(stamp)}
      onChange={e => setChecked(stamp, e.currentTarget.checked)}
      style={{ marginRight: "1em" }}
    >
      {stamp.name}
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
