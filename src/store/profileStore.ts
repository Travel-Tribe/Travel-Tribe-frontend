import { create } from "zustand";
import fetchCall from "../Utils/apiFetch";

interface UserProfile {
  ratingAvg: number | null;
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
  updateProfileField: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
  fetchProfileData: (userId: string) => Promise<void>; // 비동기로 프로필 데이터를 패치하는 함수 추가
  resetProfileData: () => void; // 초기 상태로 리셋하는 함수 추가
}

const initialProfileData: UserProfile = {
  introduction: "",
  nickname: "",
  mbti: "",
  smoking: "",
  gender: "",
  birth: "",
  ratingAvg: null,
  fileAddress: "",
  visitedCountries: [],
  langAbilities: [],
  phone: "",
};

export const useProfileStore = create<ProfileState>(set => ({
  profileData: initialProfileData,
  // 일부 속성만 업데이트
  setProfileData: data =>
    set(state => ({
      profileData: { ...state.profileData, ...data },
    })),
  // 특정 속성 하나만 업데이트 할 때 사용
  updateProfileField: (key, value) =>
    set(state => ({
      profileData: { ...state.profileData, [key]: value },
    })),

  fetchProfileData: async (userId: string) => {
    try {
      const profileResponse = await fetchCall<{ data: UserProfile }>(
        `/api/v1/users/${userId}/profile`,
        "get",
      );
      const userResponse = await fetchCall<{
        data: { data: { nickname: string } };
      }>(`/api/v1/users`, "get");

      set(state => ({
        profileData: {
          ...profileResponse.data,
          nickname: userResponse.data.data.nickname,
        },
      }));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  },

  // 프로필 데이터를 기본 상태로 리셋하는 함수
  resetProfileData: () =>
    set(() => ({
      profileData: {
        introduction: "",
        nickname: "",
        mbti: "",
        smoking: "",
        gender: "",
        birth: "",
        ratingAvg: null,
        fileAddress: "",
        visitedCountries: [],
        langAbilities: [],
        phone: "",
      },
    })),
}));
