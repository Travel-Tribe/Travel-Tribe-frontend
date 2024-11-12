import {create} from 'zustand';

interface UserProfile {
  introduction: string;
  nickname: string;
  mbti: string;
  smoking: string;
  gender: string;
  birth: string;
  fileAddress: string;
  visitedCountries: string[];
  langAbilities: string[];
  phone: string;
}

// 스토어에 저장되는 상태와 함수 정의
interface ProfileState {
  profileData: UserProfile;
  setProfileData: (data: Partial<UserProfile>) => void; // 일부 프로필 속성만 업데이트 할 수 있음
  updateProfileField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    introduction: "",
    nickname: "",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    fileAddress: "",
    langAbilities: [],
    visitedCountries: [],
    phone: "",
  },
  // 일부 속성만 업데이트
  setProfileData: (data) =>
    set((state) => ({
      profileData: { ...state.profileData, ...data },
    })),
    // 특정 속성 하나만 업데이트 할 때 사용
  updateProfileField: (key, value) =>
    set((state) => ({
      profileData: { ...state.profileData, [key]: value },
    })),
}));
