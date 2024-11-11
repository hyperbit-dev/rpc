import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useMemo, useRef } from "react";

type LightweightChartProps = {
  marketChart: {
    prices: [number, number][];
    ohlc: [number, number, number, number, number][];
  };
};

export function LightweightChart({
  marketChart: { prices, ohlc },
}: LightweightChartProps) {
  const backgroundColor = "white";
  const lineColor = "#2962FF";
  const textColor = "black";
  const areaTopColor = "#2962FF";
  const areaBottomColor = "rgba(41, 98, 255, 0.28)";

  const chartContainerRef = useRef();

  const data = useMemo(() => {
    const data_prices = prices.map(([time, value]) => {
      const date = new Date(time);
      return {
        time: date.toISOString().split("T")[0],
        value,
      };
    });
    const data_ohlc = ohlc.map(([time, open, high, low, close]) => {
      return {
        time,
        open,
        high,
        low,
        close,
      };
    });
    return {
      prices: data_prices,
      ohlc: data_ohlc,
    };
  }, [prices, ohlc]);

  useEffect(() => {
    // @ts-ignore
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      // @ts-ignore
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const handleResize = () => {
      // @ts-ignore
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      priceFormat: {
        type: "price",
        precision: 8,
        minMove: 0.00000001,
      },
    });

    // @ts-ignore
    candlestickSeries.setData(data.ohlc);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    [],
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);
  // @ts-ignore
  return <div ref={chartContainerRef} />;
}
