import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { calculatePrice, displayPrice } from '../algorithm/stamp';

function Postage({ onSetPostage }) {
    const [customValue, setCustomValue] = useState(0);

    const addPriceButton = (product, international=false, weight=1) => {
        const value = calculatePrice(product, international, weight);
        const text = displayPrice(value);
        return <Button variant="primary" onClick={e => onSetPostage(value)}>{text}</Button>
    }
    const onCalculate = function () {
        onSetPostage(parseInt(customValue));
    }

    // https://pe.usps.com/text/dmm300/Notice123.htm
    // To be updated 1/22/2023. https://about.usps.com/newsroom/national-releases/2022/1007-usps-announces-new-prices-for-2023.htm
    return (
        <Table striped bordered hover>
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
                        <Form.Control id="target" type="number"
                            placeholder="enter postage in cents" htmlSize="10"
                            onChange={e => setCustomValue(e.target.value)}
                            style={{ width: "20em", display: "inline-block", marginRight: "1em" }}
                            min={1} max={1000}
                        />
                        <Button onClick={onCalculate}>Calculate</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Postage;