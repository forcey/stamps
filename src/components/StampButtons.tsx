import React, { useState, useEffect } from 'react';
import { Stamp } from '../algorithm/stamp';
import { Checkbox, Wrap, WrapItem, Box } from '@chakra-ui/react';

interface StampButtonsProps {
  stamps: Stamp[];
  onSelectionChanged: (selected: Map<string, Stamp>) => void;
  initialSelection: Map<string, Stamp>;
}

const StampButtons: React.FC<StampButtonsProps> = ({
  stamps,
  onSelectionChanged,
  initialSelection,
}) => {
  const [selected, setSelected] = useState<Map<string, Stamp>>(initialSelection);

  useEffect(() => {
    setSelected(new Map(initialSelection));
  }, [initialSelection, stamps]);

  const isChecked = (stamp: Stamp): boolean => selected.has(stamp.id);

  const setChecked = (stamp: Stamp, checked: boolean): void => {
    if (checked) {
      selected.set(stamp.id, stamp);
    } else {
      selected.delete(stamp.id);
    }
    const newSelected = new Map(selected);
    setSelected(newSelected);
    onSelectionChanged(newSelected);
  }

  const renderButton = (stamp: Stamp) => (
    <WrapItem key={stamp.id}>
      <Checkbox
        isChecked={isChecked(stamp)}
        onChange={(e) => setChecked(stamp, e.currentTarget.checked)}
      >
        {stamp.name}
      </Checkbox>
    </WrapItem>
  );

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
};

export default StampButtons;
