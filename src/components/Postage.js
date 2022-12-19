import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function Postage({ onSetPostage }) {
    const [customValue, setCustomValue] = useState(0);

    const button = (value, text) => <Button variant="primary" onClick={e => onSetPostage(value)}>{text}</Button>
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
                    <td>{button(44, "44¢")}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{button(140, "$1.40")}</td>
                </tr>
                <tr>
                    <td>Letters</td>
                    <td>{button(60, "60¢")}</td>
                    <td>{button(84, "84¢")}</td>
                    <td>{button(108, "$1.08")}</td>
                    <td>{button(132, "$1.32")} (up to 3.5 oz)</td>
                    <td>{button(140, "$1.40")}</td>
                </tr>
                <tr>
                    <td>Large Envelopes</td>
                    <td>{button(120, "$1.20")}</td>
                    <td>{button(144, "$1.44")}</td>
                    <td>{button(168, "$1.68")}</td>
                    <td>{button(192, "$1.92")}</td>
                    <td>{button(275, "$2.75")}</td>
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