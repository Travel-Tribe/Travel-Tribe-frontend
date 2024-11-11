import {
  GoogleMap,
  Polyline,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import { useCallback, useState, useEffect, useRef } from "react";

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
  lat: 35.6762, // 도쿄 중심
  lng: 139.6503,
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  mapTypeId: "roadmap",
  gestureHandling: "cooperative",
  mapId: import.meta.env.VITE_GOOGLE_MAPS_ID_WITH_LABELOFF,
};

// 필요한 라이브러리만 로드
const libraries: Libraries = ["marker", "geometry"] as const;

// MarkerPool 클래스 정의
const MarkerPool = {
  pool: [] as google.maps.marker.AdvancedMarkerElement[],

  acquire(position: google.maps.LatLngLiteral, content: HTMLElement) {
    let marker: google.maps.marker.AdvancedMarkerElement;
    if (this.pool.length > 0) {
      marker = this.pool.pop()!;
      marker.position = position;
      marker.content = content;
    } else {
      marker = new google.maps.marker.AdvancedMarkerElement({
        position,
        content,
      });
    }
    return marker;
  },

  release(marker: google.maps.marker.AdvancedMarkerElement) {
    marker.map = null;
    this.pool.push(marker);
  },
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
    preventGoogleFontsLoading: true,
    libraries,
  });

  const pathCoordinates = visits.map(point => ({
    lat: point.latitude,
    lng: point.longitude,
  }));

  // 마커 업데이트 함수
  const updateMarkers = useCallback(() => {
    if (!map) return;

    // 기존 마커 해제
    markersRef.current.forEach(marker => {
      MarkerPool.release(marker);
    });
    markersRef.current = [];

    // 새 마커 생성
    visits.forEach((point, index) => {
      const content = createMarkerElement(point.orderNumber, () =>
        setSelectedIndex(index),
      );

      const marker = MarkerPool.acquire(
        { lat: point.latitude, lng: point.longitude },
        content,
      );

      marker.map = map;
      markersRef.current.push(marker);
    });
  }, [map, visits]);

  // 지도 로드 핸들러
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // 마커 업데이트 effect
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  // cleanup effect
  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => {
        MarkerPool.release(marker);
      });
    };
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
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onLoad={onMapLoad}
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
  );
};

export default DayMap;
