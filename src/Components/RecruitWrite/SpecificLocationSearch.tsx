import { useTravelData } from "../../Hooks/useTravelData";
import React, { useState, useCallback, useMemo } from "react";
import { useLoadScript, Libraries } from "@react-google-maps/api";

interface SpecificLocationSearchProps {
  placeName: string;
  dayIndex: number;
  destIndex: number;
  onPlaceSelected: (
    dayIndex: number,
    destIndex: number,
    field: string,
    value: any,
  ) => void;
}

const SpecificLocationSearch: React.FC<SpecificLocationSearchProps> =
  React.memo(
    ({ placeName, dayIndex, destIndex, onPlaceSelected }): JSX.Element => {
      const { travelData } = useTravelData();
      const [options, setOptions] = useState<
        { name: string; address: string; lat: number; lng: number }[]
      >([]);
      const [selectedCoordinates, setSelectedCoordinates] = useState<{
        lat: number;
        lng: number;
      } | null>(null);

      const libraries: Libraries = useMemo(() => ["places", "geometry"], []);

      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
        libraries,
      });

      const getCoordinatesFromLocation = useCallback(async () => {
        if (!isLoaded) return null;

        return new Promise<{ lat: number; lng: number } | null>(resolve => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { address: `${travelData.travelCountry} ${travelData.region}` },
            (results, status) => {
              if (status === "OK" && results[0].geometry.location) {
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
      }, [isLoaded, travelData]);

      const getPlaceOptions = useCallback(async () => {
        if (!isLoaded || !placeName) return;

        const centerCoordinates = await getCoordinatesFromLocation();
        console.log(centerCoordinates);
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
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
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
        setSelectedCoordinates({
          lat: selectedOption.lat,
          lng: selectedOption.lng,
        });
        onPlaceSelected(dayIndex, destIndex, null, {
          orderNumber: destIndex + 1,
          lat: selectedOption.lat,
          lng: selectedOption.lng,
        });

        setOptions([]);
      };

      if (loadError) {
        return <div>Failed to load the map</div>;
      }
      return (
        <div className="w-[200px]">
          <input
            className="h-[18px] text-[12px] truncate border border-gray-300"
            type="text"
            placeholder="여행지를 입력해주세요."
            value={placeName}
            onChange={e =>
              onPlaceSelected(dayIndex, destIndex, "title", e.target.value)
            }
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />

          {options.length > 0 && (
            <select
              className="w-[200px] truncate text-[12px]"
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
