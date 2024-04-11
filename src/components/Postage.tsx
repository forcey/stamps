import {
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { calculatePrice, displayPrice, Product } from '../algorithm/stamp';

function Postage({ onSetPostage }: { onSetPostage: (p: number) => void }) {
    const [customValue, setCustomValue] = useState('');

    const addPriceButton = (product: Product, international = false, weight = 1) => {
        const value = calculatePrice(product, international, weight);
        const text = displayPrice(value);
        return <Button colorScheme='blue' onClick={e => onSetPostage(value)}>{text}</Button>
    }
    const onCalculate = function () {
        onSetPostage(parseInt(customValue));
    }

    const format = (val: string) => val ? val + `¢` : ""
    const parse = (val: string) => val.replace(/¢$/, '')

    // https://pe.usps.com/text/dmm300/Notice123.htm
    // To be updated 7/14/2024. https://about.usps.com/newsroom/national-releases/2024/0409-usps-recommends-new-prices-for-july-2024.htm
    return (
        <TableContainer maxWidth={800}>
            <Table variant='striped' size='sm'>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>1 oz</Th>
                        <Th>2 oz</Th>
                        <Th>3 oz</Th>
                        <Th>4 oz</Th>
                        <Th>International 1 oz</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Postcards</Td>
                        <Td>{addPriceButton("postcard")}</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>{addPriceButton("postcard", true)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Letters</Td>
                        <Td>{addPriceButton("letter", false, 1)}</Td>
                        <Td>{addPriceButton("letter", false, 2)}</Td>
                        <Td>{addPriceButton("letter", false, 3)}</Td>
                        <Td>{addPriceButton("letter", false, 4)} <br/> (up to 3.5 oz)</Td>
                        <Td>{addPriceButton("letter", true)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Large Envelopes</Td>
                        <Td>{addPriceButton("large_envelope", false, 1)}</Td>
                        <Td>{addPriceButton("large_envelope", false, 2)}</Td>
                        <Td>{addPriceButton("large_envelope", false, 3)}</Td>
                        <Td>{addPriceButton("large_envelope", false, 4)} <br/> (up to 3.5 oz)</Td>
                        <Td>{addPriceButton("large_envelope", true)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Custom</Td>
                        <Td colSpan={5}>
                            <NumberInput
                                onChange={(valueString) => setCustomValue(parse(valueString))}
                                value={format(customValue)}
                                min={1} max={1000}
                                style={{ width: "15rem", display: "inline-block", marginRight: "1rem" }}
                            >
                                <NumberInputField placeholder="enter postage in cents" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Button onClick={onCalculate}>Calculate</Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default Postage;