import {
    Table, Button,
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
    // To be updated 1/22/2023. https://about.usps.com/newsroom/national-releases/2022/1007-usps-announces-new-prices-for-2023.htm
    return (
        <Table variant='striped'>
            <thead>
                <tr>
                    <th></th>
                    <th>1 oz</th>
                    <th>2 oz</th>
                    <th>3 oz</th>
                    <th>4 oz</th>
                    <th>International 1 oz</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Postcards</td>
                    <td>{addPriceButton("postcard")}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{addPriceButton("postcard", true)}</td>
                </tr>
                <tr>
                    <td>Letters</td>
                    <td>{addPriceButton("letter", false, 1)}</td>
                    <td>{addPriceButton("letter", false, 2)}</td>
                    <td>{addPriceButton("letter", false, 3)}</td>
                    <td>{addPriceButton("letter", false, 4)} (up to 3.5 oz)</td>
                    <td>{addPriceButton("letter", true)}</td>
                </tr>
                <tr>
                    <td>Large Envelopes</td>
                    <td>{addPriceButton("large_envelope", false, 1)}</td>
                    <td>{addPriceButton("large_envelope", false, 2)}</td>
                    <td>{addPriceButton("large_envelope", false, 3)}</td>
                    <td>{addPriceButton("large_envelope", false, 4)} (up to 3.5 oz)</td>
                    <td>{addPriceButton("large_envelope", true)}</td>
                </tr>
                <tr>
                    <td>Custom</td>
                    <td colSpan={5}>
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
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Postage;