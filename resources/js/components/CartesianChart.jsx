
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function CartesianChart({ data, XLabel, YLabel, YTickFormatter, lineLabel }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleDotClick = (data, index) => {
        setActiveIndex(index);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`X: ${label}`}</p>
                    <p className="value">
                        Y: <NumericFormat value={payload[0].value} decimalScale={0} displayType='text' thousandSeparator prefix={'$ '} />
                    </p>
                </div>
            );
        }

        return null;
    };
    ;
    return (
        <>

            <ResponsiveContainer width="100%" height={500}>
                <LineChart margin={
                    {
                        left: 10,
                        right: 10
                    }
                } data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis name={XLabel} dataKey="X" />
                    <YAxis name={YLabel} dataKey="Y" tickFormatter={YTickFormatter} />
                    <Tooltip active={activeIndex !== null} content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="Y" name={lineLabel} stroke="#8884d8"
                        dot={{ r: 6 }}
                        onClick={handleDotClick}
                        onMouseEnter={(data, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}