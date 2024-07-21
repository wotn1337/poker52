import { FullUser } from "@/models/User";
import { ChartOptions } from "chart.js";
import { getDataLabel } from "./utils";

export const getChartOptions = (
  scoreHistory: FullUser["scoreHistory"],
  isMobile: boolean
): ChartOptions<"line"> => ({
  responsive: true,
  aspectRatio: isMobile ? 1 : 2,
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
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Даты игр",
      },
    },
    y: {
      title: {
        display: true,
        text: "Сумма выигрыша",
      },
      grid: {
        lineWidth: 3,
        color: (context) => {
          if (context.tick.value === 0) {
            return "black";
          }
          return "rgba(0, 0, 0, 0.1)";
        },
      },
      ticks: {
        callback: (value) => {
          if (value === 0) {
            return "0";
          }
          return value;
        },
        font: (context) => {
          if (context.tick?.value === 0) {
            return {
              weight: "bold",
            };
          }
        },
      },
    },
  },
});
