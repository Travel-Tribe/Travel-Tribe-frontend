/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_GOOGLE_MAPS_ID_WITH_LABELOFF: string;
  // 다른 환경 변수들도 여기에 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
