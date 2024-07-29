import { FullUser } from "@/models/User";
import { ChartOptions } from "chart.js";
import { getDataLabel } from "./utils";

export const getChartOptions = (
  scoreHistory: FullUser["scoreHistory"],
  isMobile: boolean
): ChartOptions<"line"> => ({
  responsive: true,
  aspectRatio: isMobile ? 1 : 2,
  layout: {
    padding: 30,
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
      title: {
        display: true,
        text: "Дата",
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "Сумма выигрыша",
      },
      border: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        lineWidth: (context) => {
          if (context.tick.value === 0) {
            return 3;
          }
          return 1;
        },
        color: (context) => {
          if (context.tick.value === 0) {
            return "black";
          }
          return "rgba(0, 0, 0, 0.1)";
        },
      },
    },
  },
});
