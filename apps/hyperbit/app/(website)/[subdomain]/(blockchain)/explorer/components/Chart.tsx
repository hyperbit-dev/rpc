"use client";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Chart({
  prices,
  avgPrice,
}: {
  prices: any[];
  avgPrice: number;
}) {
  const chartData = useMemo(() => {
    let low = 0;
    let high = 0;
    const data: { name: string; time: Date; value: number }[] = prices.reduce(
      (a, c) => {
        if (c[1] > high) {
          high = c[1];
        }
        if (c[1] < low || c[1] >= high) {
          low = c[1];
        }

        return [
          ...a,
          {
            name: new Date(c[0]).toLocaleTimeString(),
            time: new Date(c[0]),
            value: c[1],
          },
        ];
      },
      []
    );
    return {
      data,
      low,
      high,
    };
  }, [prices]);

  return (
    <div className="py-3">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData.data}>
          <YAxis
            type="number"
            domain={["dataMin", "dataMax"]}
            allowDecimals
            hide
          />
          <XAxis dataKey="time" hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke="gray"
            strokeWidth={1}
            dot={false}
            name="Price"
          />
          <Tooltip cursor={{ stroke: "#5fc77e", strokeWidth: 1 }} />
          <ReferenceLine
            y={avgPrice}
            stroke="#cccccc"
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
