import { useLoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places", "marker", "geometry"] as const;

export const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "",
    preventGoogleFontsLoading: true,
    libraries,
  });
};
