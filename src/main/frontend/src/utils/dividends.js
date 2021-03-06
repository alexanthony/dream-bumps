// @flow
import { round } from "./maths";
const getStartPrice = position => 300 - 66 * Math.log(position);

// This is 3x more generous than fantasy bumps was
// Maybe 0.2?
const getBaseRowOverDividend = position => 0.1 * getStartPrice(position);

const isPositionSandwichBoat = (position, numberOfCrews, crewsPerDivision) => {
  if (position === numberOfCrews) {
    return false;
  }
  return position % crewsPerDivision === 1;
};

const _calculateRowOverDividend = (position, day) => {
  if (position === 1 && day >= 3) {
    return 3 * getBaseRowOverDividend(1);
  }
  return getBaseRowOverDividend(position);
};

export const calculateRowOverDividendForPosition = (
  position: number,
  day: number
): string => round(_calculateRowOverDividend(position, day), 2).toFixed(2);

const _calculateBumpDividend = (
  position,
  numberOfCrews,
  crewsPerDivision,
  day
) => {
  if (position === 2 && day >= 3) {
    return 3 * getBaseRowOverDividend(position) + 2 * getBaseRowOverDividend(1);
  }
  if (isPositionSandwichBoat(position, numberOfCrews, crewsPerDivision)) {
    return 4 * getBaseRowOverDividend(position);
  }
  return 3 * getBaseRowOverDividend(position);
};

export const calculateBumpDividend = (
  position: number,
  numberOfCrews: number,
  crewsPerDivision: number,
  day: number
): string =>
  round(
    _calculateBumpDividend(position, numberOfCrews, crewsPerDivision, day),
    2
  ).toFixed(2);
