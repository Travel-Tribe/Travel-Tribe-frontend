import { useTravelData } from "../../Hooks/useTravelData";
import React, { useState } from "react";

const SpecificLocationSearch: React.FC = () => {
  const { travelData, updateTravelData } = useTravelData();
  const [location, setLocation] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [options, setOptions] = useState<
    { name: string; address: string; lat: number; lng: number }[]
  >([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handlePlaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(e.target.value);
  };

  const getPlaceOptions = () => {
    const map = new window.google.maps.Map(document.createElement("div"));
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      query: `${location} ${placeName}`,
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
      } else {
        alert("Location not found.");
      }
    });
  };

  const handleOptionSelect = (lat: number, lng: number) => {
    setSelectedCoordinates({ lat, lng });
    updateTravelData("days", [
      {
        ...travelData.days[0],
        itineraryVisits: [
          {
            latitude: lat,
            longitude: lng,
            orderNumber: 1,
          },
        ],
      },
    ]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter location (e.g., 전남 목포)"
        value={location}
        onChange={handleLocationChange}
      />
      <input
        type="text"
        placeholder="Enter place name (e.g., 새마을 식당)"
        value={placeName}
        onChange={handlePlaceNameChange}
      />
      <button onClick={getPlaceOptions}>Search Places</button>

      {options.length > 0 && (
        <select
          onChange={e => {
            const selectedOption = options[e.target.selectedIndex - 1];
            handleOptionSelect(selectedOption.lat, selectedOption.lng);
          }}
        >
          <option>Select a place</option>
          {options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name} - {option.address}
            </option>
          ))}
        </select>
      )}

      {selectedCoordinates && (
        <div>
          <p>Latitude: {selectedCoordinates.lat}</p>
          <p>Longitude: {selectedCoordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default SpecificLocationSearch;
