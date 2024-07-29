import { FullUser } from "@/models/User";
import { ChartOptions } from "chart.js";
import { getDataLabel } from "./utils";

export const getChartOptions = (
  scoreHistory: FullUser["scoreHistory"],
  isMobile: boolean
): ChartOptions<"bar"> => ({
  responsive: true,
  aspectRatio: isMobile ? 1 : 2,
  layout: {
    padding: {
      top: 30,
      bottom: 30,
      left: 10,
      right: 10,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => getDataLabel(tooltipItem, scoreHistory),
      },
    },
    zoom: {
      zoom: {
        mode: "x",
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        scaleMode: "x",
      },
      pan: {
        enabled: true,
        mode: "x",
        scaleMode: "x",
      },
    },
    datalabels: {
      display: true,
      align: (ctx) =>
        Number(ctx.dataset.data[ctx.dataIndex]) >= 0 ? "end" : "start",
      anchor: (ctx) =>
        Number(ctx.dataset.data[ctx.dataIndex]) >= 0 ? "end" : "start",
      font: {
        weight: "bold",
        size: 14,
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      title: {
        display: false,
      },
      border: {
        display: false,
      },
      grid: {
        color: (context) => {
          if (context.tick.value === 0) {
            return "black";
          }
          return "transparent";
        },
      },
      ticks: {
        display: false,
      },
    },
  },
});
