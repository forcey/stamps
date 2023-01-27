import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stamp } from '../algorithm/stamp';

function StampButtons({ stamps, onSelectionChanged }: {
  stamps: Stamp[], onSelectionChanged: (selected: Map<number, Stamp>) => void
}) {
  const [selected, setSelected] = useState(new Map());

  const isChecked = function (stamp: Stamp) {
    return selected.has(stamp.id);
  }
  const setChecked = function (stamp: Stamp, checked: boolean) {
    if (checked) {
      selected.set(stamp.id, stamp);
    } else {
      selected.delete(stamp.id);
    }
    const newSelected = new Map(selected);
    setSelected(newSelected);
    onSelectionChanged(newSelected);
  }

  const renderButton = function (stamp: Stamp) {
    return <ToggleButton
      className="mb-2"
      id={"toggle-" + stamp.id}
      key={stamp.id}
      type="checkbox"
      variant="outline-primary"
      checked={isChecked(stamp)}
      onChange={e => setChecked(stamp, e.currentTarget.checked)}
      style={{ marginRight: "1em" }}
      value={''}
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
