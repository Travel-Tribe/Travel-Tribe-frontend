import React, { useState, useMemo, useCallback, useEffect } from "react";
import { COUNTRY_DATA } from "../../../Constants/COUNTRY_DATA";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { mappingCountry } from "../../../Utils/mappingCountry";
import { mappingContinent } from "../../../Utils/mappingContinent";

const DestinationSelect = React.memo(() => {
  const { updateTravelData, postData } = useRecruitPostStore();
  const [continent, setContinent] = useState<string>("선택");
  const [country, setCountry] = useState<string>("선택");

  const availableCountries = useMemo(() => {
    if (continent !== "선택") return COUNTRY_DATA[continent];
  }, [continent]);

  useEffect(() => {
    if (postData.continent) setContinent(mappingContinent[postData.continent]);
    if (postData.travelCountry)
      setCountry(mappingCountry(postData.travelCountry, "en"));
  }, [postData.continent, postData.travelCountry]);

  const handleContinentChange = useCallback(
    (selectedContinent: string) => {
      setContinent(selectedContinent);
      updateTravelData("continent", mappingContinent[selectedContinent]);
    },
    [updateTravelData],
  );

  const handleCountryChange = useCallback(
    (selectedCountry: string) => {
      setCountry(selectedCountry);
      updateTravelData("travelCountry", mappingCountry(selectedCountry, "ko"));
    },
    [updateTravelData],
  );

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">여행지:</p>
      <select
        className="select select-sm focus:outline-custom-green w-[120px] text-[16px] border border-gray-300 mr-1 px-2"
        value={continent}
        onChange={e => handleContinentChange(e.target.value)}
      >
        <option value="선택">선택</option>
        {Object.keys(COUNTRY_DATA).map(continentOption => (
          <option key={continentOption} value={continentOption}>
            {continentOption}
          </option>
        ))}
      </select>

      <select
        className="select select-sm focus:outline-custom-green w-[120px] text-[16px] border border-gray-300 mr-1 px-2"
        value={country}
        onChange={e => handleCountryChange(e.target.value)}
      >
        <option value="선택">선택</option>
        {availableCountries?.map(countryOption => (
          <option key={countryOption} value={countryOption}>
            {countryOption}
          </option>
        ))}
      </select>
    </div>
  );
});

export default DestinationSelect;
