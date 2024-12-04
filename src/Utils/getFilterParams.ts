import { mappingContinent } from "./mappingContinent";
import { mappingCountry } from "./mappingCountry";

export const getFilterParams = (
  search: string | undefined,
  city: string | undefined,
  selectedContinent: string | undefined,
  selectedCountry: string | undefined,
  mbti?: string | undefined,
) => {
  const filters: Record<string, string> = {
    title: search || "",
    content: city || "",
    continent:
      selectedContinent && selectedContinent !== "선택"
        ? mappingContinent[selectedContinent]
        : "",
    country:
      selectedCountry !== "선택" && selectedContinent !== "기타"
        ? mappingCountry(selectedCountry, "ko")
        : "",
    mbti: mbti !== "선택" ? mbti : "",
  };

  // 빈 값 필터 제거
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return Object.fromEntries(params);
  // return "&" + params.toString();
};
