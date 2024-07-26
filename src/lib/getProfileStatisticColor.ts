export const getProfileStatisticColor = (value: number, reverse = false) => {
  const positiveColor = !reverse ? "#52c41a" : "#cf1322";
  const negativeColor = !reverse ? "#cf1322" : "#52c41a";
  if (value > 0) {
    return positiveColor;
  }

  if (value < 0) {
    return negativeColor;
  }

  return "black";
};
