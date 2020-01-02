import React from 'react';
import sortBy from 'lodash/sortBy';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
} from 'recharts';

export default function renderRevenueChart(data) {

  return (
    <div>
      <ComposedChart
        width={200}
        paddingBottom="20px"
        height={100}
        data={sortBy(data, 'time')}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="time" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="revenue" stroke="#000000" yAxisId={0} />
      </ComposedChart>
    </div>
  );
}