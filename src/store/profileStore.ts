import { create } from "zustand";
import { UserProfileType } from "../type/types";

interface LocalProfileState {
  profileData: Partial<UserProfileType>; // 클라이언트에서 필요한 부분만 관리
  nickname: string;
  phone: string;
  age: number | null;
  setProfileData: (data: Partial<UserProfileType>) => void; // 클라이언트 데이터 업데이트
  updateProfileField: <K extends keyof UserProfileType>(
    key: K,
    value: UserProfileType[K],
  ) => void; // 특정 필드 업데이트
  setNickname: (nickname: string) => void; // 닉네임 관리
  setPhone: (phone: string) => void; // 전화번호 관리
  setAge: (birth: string) => void; // 생년월일로 나이 계산 후 저장
  resetProfileData: () => void; // 초기 상태로 리셋
  initializeBasicInfo: (data: { nickname: string; phone: string }) => void; // 기본 정보 초기화
}

export const useProfileStore = create<LocalProfileState>(set => ({
  profileData: {}, // 초기 상태
  nickname: "",
  phone: "",
  age: null,

  setProfileData: data =>
    set(state => ({
      profileData: { ...state.profileData, ...data },
    })),

  updateProfileField: (key, value) =>
    set(state => {
      const updatedData = { ...state.profileData, [key]: value };
      const age = key === "birth" ? calculateAge(value as string) : state.age;
      return { profileData: updatedData, age };
    }),

  setNickname: nickname => set({ nickname }),

  setPhone: phone => set({ phone }),

  setAge: birth =>
    set(() => ({
      age: birth ? calculateAge(birth) : null,
    })),

  initializeBasicInfo: ({ nickname, phone }) =>
    set(() => ({
      nickname,
      phone,
    })),

  resetProfileData: () =>
    set(() => ({
      profileData: {},
      nickname: "",
      phone: "",
      age: null,
    })),
}));

// 유틸리티 함수: 생년월일로 나이 계산
const calculateAge = (birthDateString: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
};
