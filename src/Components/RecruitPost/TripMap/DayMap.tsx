import { GoogleMap, Polyline, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { useGoogleMaps } from "../../../Hooks/useGoogleMaps";

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
  height: "300px",
};

const defaultCenter = {
  lat: 37.5665, // 서울 중심
  lng: 126.978,
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  mapTypeId: "roadmap",
  gestureHandling: "cooperative",
  mapId: import.meta.env.VITE_GOOGLE_MAPS_ID_WITH_LABELOFF,
};

// 마커 콘텐츠 생성 함수
const createMarkerElement = (orderNumber: number, onClick: () => void) => {
  const div = document.createElement("div");
  div.className =
    "w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer";
  div.style.border = "2px solid white";
  div.innerHTML = `<span class="text-white text-sm font-bold">${orderNumber}</span>`;
  div.addEventListener("click", onClick);
  return div;
};

const DayMap = ({ visits, dayDetails }: DayMapProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const { isLoaded, loadError } = useGoogleMaps();

  const pathCoordinates = visits.map(point => ({
    lat: point.latitude,
    lng: point.longitude,
  }));

  console.log("방문:", visits);

  // 마커 생성 및 관리
  useEffect(() => {
    if (!map || !visits.length) return;

    // 기존 마커 해제
    markersRef.current.forEach(marker => {
      marker.map = null;
    });
    markersRef.current = [];

    // 새 마커 생성
    visits.forEach((point, index) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: point.latitude, lng: point.longitude },
        content: createMarkerElement(point.orderNumber, () =>
          setSelectedIndex(index),
        ),
        map: map,
      });

      markersRef.current.push(marker);
    });

    const bounds = new window.google.maps.LatLngBounds();
    visits.forEach(point => {
      bounds.extend({ lat: point.latitude, lng: point.longitude });
    });
    map.fitBounds(bounds);

    // cleanup
    return () => {
      markersRef.current.forEach(marker => {
        marker.map = null;
      });
    };
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

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={setMap}
        options={mapOptions}
      >
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
          <InfoWindow
            position={{
              lat: visits[selectedIndex].latitude,
              lng: visits[selectedIndex].longitude,
            }}
            onCloseClick={() => setSelectedIndex(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -35),
              disableAutoPan: true,
              maxWidth: 200,
            }}
          >
            <div className="p-2">
              <h3 className="font-bold text-sm mb-1">
                {dayDetails[selectedIndex].title}
              </h3>
              <p className="text-xs text-gray-600">
                {dayDetails[selectedIndex].description}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default DayMap;
