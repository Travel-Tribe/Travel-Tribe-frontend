import {
  GoogleMap,
  Polyline,
  useLoadScript,
  Libraries,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useMemo, useState, useEffect } from "react";

interface ItineraryVisit {
  latitude: number;
  longitude: number;
  orderNumber: number;
}

interface DayMapProps {
  visits: ItineraryVisit[];
  dayDetails: Array<{
    title: string;
    description: string;
  }>;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
};

const defaultCenter = {
  lat: 35.6762, // 도쿄 중심
  lng: 139.6503,
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const DayMap = ({ visits, dayDetails }: DayMapProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // 필요한 라이브러리만 로드
  const libraries: Libraries = useMemo(() => ["marker", "geometry"], []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
    preventGoogleFontsLoading: true,
    libraries,
  });

  const pathCoordinates = visits.map(point => ({
    lat: point.latitude,
    lng: point.longitude,
  }));

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // 지도 로드 후 방문 지점들이 모두 보이도록 bounds 설정
  useEffect(() => {
    if (map && visits.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      visits.forEach(point => {
        bounds.extend({ lat: point.latitude, lng: point.longitude });
      });
      map.fitBounds(bounds);
    }
  }, [map, visits]);

  // 로딩 및 에러 상태 처리
  if (loadError || !isLoaded || !visits.length) {
    return (
      <div className="card bg-base-100 shadow-xl w-full h-60 flex items-center justify-center">
        <div className="text-base-content/60">
          {loadError
            ? "지도를 불러오는데 실패했습니다"
            : !isLoaded
              ? "지도를 불러오는 중..."
              : "방문 장소가 없습니다"}
        </div>
      </div>
    );
  }

  if (!visits || visits.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl w-full h-60 flex items-center justify-center">
        <div className="text-base-content/60">방문 장소가 없습니다</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="card bg-base-100 shadow-xl w-full h-60 flex items-center justify-center">
        <div className="text-base-content/60">지도를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-0 overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={13}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          {/* 방문 지점 마커 */}
          {visits.map((point, index) => (
            <Marker
              key={`marker-${index}`}
              position={{ lat: point.latitude, lng: point.longitude }}
              onClick={() => setSelectedIndex(index)}
              label={{
                text: point.orderNumber.toString(),
                color: "#ffffff",
                className: "marker-label",
              }}
            />
          ))}

          {/* 방문 지점을 잇는 선 */}
          {visits.length > 1 && (
            <Polyline
              path={pathCoordinates}
              options={{
                strokeColor: "#570DF8",
                strokeOpacity: 0.8,
                strokeWeight: 3,
              }}
            />
          )}

          {/* 선택된 장소 정보 표시 */}
          {selectedIndex !== null && (
            <div className="absolute bottom-4 left-4 card bg-base-100 shadow-xl">
              <div className="card-body p-4">
                <h3 className="card-title text-sm">
                  {dayDetails[selectedIndex]?.title}
                </h3>
                <p className="text-xs">
                  {dayDetails[selectedIndex]?.description}
                </p>
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => setSelectedIndex(null)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default DayMap;
