import React, { useState } from 'react';
import { Stamp } from '../algorithm/stamp';
import { Checkbox, Wrap, WrapItem, Box } from '@chakra-ui/react'

function StampButtons({ stamps, onSelectionChanged, initialSelection }: {
  stamps: Stamp[], 
  onSelectionChanged: (selected: Map<string, Stamp>) => void,
  initialSelection: Map<string, Stamp>
}) {
  const [selected, setSelected] = useState(initialSelection);

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
        <WrapItem>
          <Checkbox
            isChecked={selected.size === stamps.length}
            onChange={e => {
              const newSelected = new Map();
              if (e.currentTarget.checked) {
                stamps.forEach(s => newSelected.set(s.id, s));
              }
              setSelected(newSelected);
              onSelectionChanged(newSelected);
            }}
          >
            Select All
          </Checkbox>
        </WrapItem>
        {stampButtons}
      </Wrap>
    </Box>
  );
}

export default StampButtons;
