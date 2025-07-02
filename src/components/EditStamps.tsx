import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

interface EditStampsProps {
  stampValues: number[];
  onUpdate: (values: number[]) => void;
}

const EditStamps: React.FC<EditStampsProps> = ({ stampValues, onUpdate }) => {
  const [valueText, setValueText] = useState(stampValues.join(', '));

  const parseValues = (text: string): number[] => {
    return Array.from(new Set(text.split(/[,\s]+/)
      .map(v => parseInt(v))
      .filter(v => !isNaN(v) && v > 0)))
      .sort((a, b) => a - b);
  };

  return (
    <Box marginTop={'1rem'} marginBottom={'1rem'}>
      <Input
        value={valueText}
        onChange={e => setValueText(e.currentTarget.value)}
        placeholder="Enter stamp values separated by commas"
        width="20rem"
        marginRight="0.5rem"
      />
      <Button onClick={() => onUpdate(parseValues(valueText))}>Save</Button>
    </Box>
  );
};

export default EditStamps;
