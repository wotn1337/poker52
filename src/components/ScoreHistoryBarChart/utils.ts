import { FullUser } from "@/models/User";
import { TooltipItem } from "chart.js";

export const getDataLabel = (
  tooltipItem: TooltipItem<"bar">,
  scoreHistory: FullUser["scoreHistory"]
) => {
  let index = tooltipItem.dataIndex;
  const changeScoreValue = scoreHistory[index]?.changeScoreValue;
  const totalScoreAfterValue = scoreHistory[index]?.totalScoreAfterValue;
  const changeScoreLabel =
    changeScoreValue && changeScoreValue >= 0 ? "Выигрыш" : "Проигрыш";
  const totalScoreLabel =
    totalScoreAfterValue && totalScoreAfterValue > 0 ? "выигрыш" : "проигрыш";
  return `${changeScoreLabel}: ${changeScoreValue} | Общий ${totalScoreLabel}: ${totalScoreAfterValue}`;
};
