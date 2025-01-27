"use client";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
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
    const data: { name: string; time: Date; value: number }[] =
      prices?.reduce?.((a, c) => {
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
  }, [prices]);

  return (
    <div className="py-3">
      <ResponsiveContainer height={250}>
        <AreaChart data={chartData.data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7fd298" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7fd298" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis
            type="number"
            tick={{ fill: "#d1d2d2" }}
            orientation="right"
            axisLine={false}
            tickLine={false}
            includeHidden
          />
          <XAxis
            dataKey="time"
            tick={{ fill: "#d1d2d2" }}
            tickFormatter={(d) => {
              return new Date(d).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
            axisLine={false}
            // minTickGap={20}
            interval="equidistantPreserveStart"
            includeHidden
          />
          <Area
            type="linear"
            dataKey="value"
            stroke="#5fc77e"
            strokeWidth={2}
            fill="url(#colorValue)"
            isAnimationActive={false}
          />
          <CartesianGrid strokeDasharray="4 4" vertical={false} />
          <Tooltip
            cursor={{ stroke: "#5fc77e", strokeWidth: 1 }}
            labelStyle={{ color: "#fff" }}
            labelFormatter={(value) => [
              new Date(value).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              }),
            ]}
            formatter={(value) => [value]}
            contentStyle={{background: "#0a0b0b", border: "none", color: "#fff", borderRadius: "5px"}}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
