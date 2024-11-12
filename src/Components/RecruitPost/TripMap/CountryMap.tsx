import { GoogleMap } from "@react-google-maps/api";
import { useCountryCenter } from "../../../Hooks/useCountyCenter";
import { useGoogleMaps } from "../../../Hooks/useGoogleMaps";

interface CountryMapProps {
  country: string;
}

const defaultContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  mapTypeId: "roadmap",
  gestureHandling: "cooperative",
  mapId: import.meta.env.VITE_GOOGLE_MAPS_ID_WITH_LABELOFF,
};

const CountryMap = ({ country }: CountryMapProps) => {
  const { isLoaded, loadError } = useGoogleMaps();

  const { center, error, isLoading } = useCountryCenter(country, isLoaded);

  if (loadError || error) {
    return (
      <div className="w-full h-full bg-base-100 flex items-center justify-center">
        <div className="text-base-content/60 text-sm">
          지도를 불러오는데 실패했습니다
        </div>
      </div>
    );
  }

  if (!isLoaded || isLoading || !center) {
    return (
      <div className="w-full h-full bg-base-100 flex items-center justify-center">
        <div className="text-base-content/60 text-sm">
          지도를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={defaultContainerStyle}
      center={center}
      zoom={5}
      options={mapOptions}
    />
  );
};

export default CountryMap;
