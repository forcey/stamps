import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function getId(stamp) {
  return stamp.name.replace(' ', '-') + stamp.value;
}
function StampButtons({ stamps, onSelectionChanged }) {
  const [selected, setSelected] = useState(new Map());

  const isChecked = function (stamp) {
    return selected.has(getId(stamp));
  }
  const setChecked = function (stamp, checked) {
    const id = getId(stamp);
    if (checked) {
      selected.set(id, stamp);
    } else {
      selected.delete(id);
    }
    const newSelected = new Map(selected);
    setSelected(newSelected);
    onSelectionChanged(newSelected);
  }

  const renderButton = function (stamp) {
    const id = getId(stamp);
    return <ToggleButton
      className="mb-2"
      id={"toggle-" + id}
      key={id}
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
