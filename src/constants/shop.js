export const DEFAULT_IMAGE = "/images/testingImg.jpg";


export const priceForIndex = (i, total, min = 2000, max = 10000) => {
  const range = max - min;
  const ratio = total > 1 ? i / (total - 1) : 0;
  const raw = min + ratio * range;
  return Math.round(raw / 50) * 50;
};
