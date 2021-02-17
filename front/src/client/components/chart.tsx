// @ts-ignore
import * as React from "react"
// @ts-ignore
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface propsI  {
    data: Array<any>
}

export default function Chart(props: propsI) {
    const {data} = props;

    return (
        <LineChart width={450} height={300} data={data}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis
                // @ts-ignore
                dataKey={"name"}
            />
            <YAxis />
        </LineChart>
    )
}