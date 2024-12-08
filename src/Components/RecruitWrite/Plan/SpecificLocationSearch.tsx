import React, { useState, useCallback } from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { useGoogleMaps } from "../../../Hooks/useGoogleMaps";

interface SpecificLocationSearchProps {
  placeName: string;
  dayIndex: number;
  destIndex: number;
  onPlaceSelected: (
    dayIndex: number,
    destIndex: number,
    field: "latitude" | "longitude",
    value: number,
  ) => void;
  onInputChanged: (
    dayIndex: number,
    destIndex: number,
    field: "title" | "description",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const SpecificLocationSearch = React.memo(
  ({
    placeName,
    dayIndex,
    destIndex,
    onPlaceSelected,
    onInputChanged,
  }: SpecificLocationSearchProps): JSX.Element => {
    const { postData } = useRecruitPostStore();
    const [options, setOptions] = useState<
      {
        name: string | undefined;
        address: string;
        lat: number | undefined;
        lng: number | undefined;
      }[]
    >([]);

    const { isLoaded, loadError } = useGoogleMaps();

    const getCoordinatesFromLocation = useCallback(async () => {
      if (!isLoaded) return null;

      return new Promise<{ lat: number; lng: number } | null>(resolve => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: `${postData.travelCountry} ${postData.region}` },
          (results, status) => {
            if (status === "OK" && results?.[0].geometry.location) {
              resolve({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              resolve(null);
            }
          },
        );
      });
    }, [isLoaded, postData]);

    const getPlaceOptions = useCallback(async () => {
      if (!isLoaded || !placeName) return;

      const centerCoordinates = await getCoordinatesFromLocation();
      if (!centerCoordinates) return;

      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: centerCoordinates,
        radius: 5000,
        keyword: placeName,
        query: `${placeName}`,
        fields: ["name", "formatted_address", "geometry"],
      };

      service.textSearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          const placeOptions = results.map(place => ({
            name: place.name,
            address: place.formatted_address || "Address not available",
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          }));
          setOptions(placeOptions);
        }
      });
    }, [isLoaded, placeName, getCoordinatesFromLocation]);

    const handleSearch = useCallback(() => {
      getPlaceOptions();
    }, [getPlaceOptions]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleBlur = () => {
      handleSearch();
    };

    const handleOptionSelect = (selectedIndex: number) => {
      const selectedOption = options[selectedIndex];
      if (selectedOption.lat !== undefined)
        onPlaceSelected(dayIndex, destIndex, "latitude", selectedOption.lat);
      if (selectedOption.lng !== undefined)
        onPlaceSelected(dayIndex, destIndex, "longitude", selectedOption.lng);

      setOptions([]);
    };

    if (loadError) {
      return <div>에러</div>;
    }
    return (
      <div className="w-[400px]">
        <input
          className="w-full h-[24px] text-[12px] px-2 truncate border border-gray-300"
          type="text"
          placeholder="여행지를 입력해주세요."
          value={placeName}
          onChange={e => onInputChanged(dayIndex, destIndex, "title", e)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />

        {options.length > 0 && (
          <select
            className="w-[300px] truncate text-[12px]"
            onChange={e => handleOptionSelect(e.target.selectedIndex - 1)}
          >
            <option>Select a place</option>
            {options.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name} - {option.address}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  },
);
export default SpecificLocationSearch;
