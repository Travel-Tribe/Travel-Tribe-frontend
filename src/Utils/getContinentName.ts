// 초기 매핑 정의
const continentToEnglish = {
  아프리카: "AFRICA",
  아시아: "ASIA",
  유럽: "EUROPE",
  오세아니아: "AUSTRALIA",
  북아메리카: "NORTH_AMERICA",
  남아메리카: "SOUTH_AMERICA",
} as const;

const englishToContinent = Object.fromEntries(
  Object.entries(continentToEnglish).map(([key, value]) => [value, key]),
);

export const getContinentName = (key: string): string | undefined => {
  return (
    continentToEnglish[key as keyof typeof continentToEnglish] ||
    englishToContinent[key]
  );
};