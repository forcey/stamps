import React, { useState } from 'react';
import { Stamp } from '../algorithm/stamp';
import { Checkbox, Wrap, WrapItem, Box } from '@chakra-ui/react'

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
    return <WrapItem>
      <Checkbox
        key={stamp.id}
        isChecked={isChecked(stamp)}
        onChange={e => setChecked(stamp, e.currentTarget.checked)}
      >
        {stamp.name}
      </Checkbox>
    </WrapItem>;
  }

  const stampButtons = stamps.map(renderButton);
  return (
    <Box marginTop={'1rem'} marginBottom={'1rem'}>
      <Wrap>
        {stampButtons}
      </Wrap>
    </Box>
  );
}

export default StampButtons;
