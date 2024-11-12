import { useState, useEffect } from "react";

interface CountryCenter {
  lat: number;
  lng: number;
}

export const useCountryCenter = (country: string, isLoaded: boolean) => {
  const [center, setCenter] = useState<CountryCenter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !country) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ address: country })
      .then(response => {
        if (response.results && response.results[0]) {
          const location = response.results[0].geometry.location;
          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          setError(`Failed to find location for ${country}`);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [country, isLoaded]);

  return { center, error, isLoading };
};
