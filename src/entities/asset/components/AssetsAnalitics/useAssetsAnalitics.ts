import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectedAssets } from "../../model";
import { ApexOptions } from "apexcharts";

export const useAssetsAnalitics = () => {
  const [chartSize, setChartSize] = useState(500);

  const data = useSelector(selectedAssets);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setChartSize(entry.contentRect.width);
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.map((item) => item.name),
    },
    yaxis: {
      title: { text: "Summ" },
      labels: {
        formatter: (value: number) => {
          if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
          if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
          return value.toFixed(0);
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val.toFixed(2)} ₽` },
    },
  };

  const chartSeries = [
    {
      name: "Price",
      data: data.map((item) => item.sum),
    },
  ];

  return {
    isData: !!data.length,
    chartRef,
    chartOptions,
    chartSeries,
    chartSize,
  };
};
