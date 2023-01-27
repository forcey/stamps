import React, { useState } from 'react';
import { Stamp } from '../algorithm/stamp';
import { Checkbox } from '@chakra-ui/react'

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
    return <Checkbox
      key={stamp.id}
      isChecked={isChecked(stamp)}
      onChange={e => setChecked(stamp, e.currentTarget.checked)}
    >
      {stamp.name}
    </Checkbox>;
  }

  const stampButtons = stamps.map(renderButton);
  return (
    <div>{stampButtons}</div>
  );
}

export default StampButtons;
