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
import { AppCard } from "@/_components/AppCard";

export function ChartCard({ chart }: { chart: any }) {
  const chartData = useMemo(() => {
    if (!chart) {
      return null;
    }
    let low = 0;
    let high = 0;
    const data: { name: string; time: Date; value: number }[] =
      chart.prices.reduce((a, c) => {
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
      }, []);
    return {
      data,
      low,
      high,
    };
  }, [chart]);

  const combinedPrices =
    !chart?.error && chart?.prices
      ? chart.prices
          // .slice(chart.prices.length - 2, chart.prices.length - 1)
          .reduce((a, b) => {
            return a + b[1];
          }, 0)
      : 1;
  const avgPrice = !chart?.error ? combinedPrices / chart?.prices?.length : 0;

  return (
    <AppCard
      Header="Market Data"
      Content={
        chart ? (
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
                stroke="#0BA3FD"
                strokeWidth={1}
                dot={false}
                name="Price"
              />
              <Tooltip cursor={{ stroke: "#0BA3FD", strokeWidth: 1 }} />
              <ReferenceLine
                y={avgPrice}
                stroke="#cccccc"
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : undefined
      }
    />
  );
}
