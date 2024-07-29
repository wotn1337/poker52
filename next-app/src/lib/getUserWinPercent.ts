import { ScoreHistoryItem } from "@/models/User";

export const getUserWinPercent = (scoreHistory?: ScoreHistoryItem[]) => {
  if (!scoreHistory) {
    return 0;
  }

  const result =
    (scoreHistory.filter((item) => item.changeScoreValue >= 0).length /
      scoreHistory.length) *
    100;

  return Math.round(result);
};
