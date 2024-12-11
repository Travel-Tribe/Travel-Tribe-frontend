import { getContinentName } from "./getContinentName";
import { mappingCountry } from "./mappingCountry";

export const getFilterParams = (
  search: string | undefined,
  city: string | undefined,
  selectedContinent: string | undefined,
  selectedCountry: string | undefined,
  mbti?: string | undefined,
) => {
  const filters: {
    title: string;
    content: string;
    continent: string | undefined;
    country: string | undefined;
    mbti: string | undefined;
  } = {
    title: search || "",
    content: city || "",
    continent:
      selectedContinent && selectedContinent !== "선택"
        ? getContinentName(selectedContinent)
        : "",
    country:
      selectedCountry !== "선택" && selectedContinent !== "기타"
        ? mappingCountry(selectedCountry, "ko")
        : "",
    mbti: mbti !== "선택" ? mbti : "",
  };

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return Object.fromEntries(params);
};
