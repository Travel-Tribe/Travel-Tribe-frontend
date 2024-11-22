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
  fileAddressPreview: string;
}

interface SimplifiedUserProfile {
  nickname: string;
  fileAddress: string;
}

// 스토어에 저장되는 상태와 함수 정의
interface ProfileState {
  profileData: UserProfile;
  userProfiles: { [key: string]: UserProfile | SimplifiedUserProfile }; // 추가: 여러 사용자 프로필 저장
  age: number | null;
  setProfileData: (data: Partial<UserProfile>) => void; // 일부 프로필 속성만 업데이트 할 수 있음
  updateProfileField: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
  fetchProfileData: (userId: string) => Promise<void>; // 비동기로 프로필 데이터를 패치하는 함수 추가
  fetchParticipantsProfiles: (userIds: string[]) => Promise<void>; // 추가: 특정 사용자 프로필 불러오기
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
  fileAddressPreview: "",
};

export const useProfileStore = create<ProfileState>(set => ({
  profileData: initialProfileData,
  userProfiles: {},
  age: null,
  // 일부 속성만 업데이트
  setProfileData: data =>
    set(state => {
      const updatedData = { ...state.profileData, ...data };
      const age = updatedData.birth ? calculateAge(updatedData.birth) : null;

      console.log("Profile Data Updated:", updatedData); // 로그 추가
      return { profileData: updatedData, age };
    }),
  // 특정 속성 하나만 업데이트 할 때 사용
  updateProfileField: (key, value) =>
    set(state => {
      const updatedData = { ...state.profileData, [key]: value };
      const age =
        key === "birth" ? calculateAge(value as string) : state.profileData.age;
      console.log(age);
      console.log("Profile Field Updated:", key, value, updatedData); // 로그 추가
      return { profileData: updatedData, age };
    }),

  fetchProfileData: async (userId: string) => {
    try {
      const profileResponse = await fetchCall<{ data: UserProfile }>(
        `/api/v1/users/${userId}/profile`,
        "get",
      );

      const userResponse = await fetchCall<{
        data: { data: { nickname: string } };
      }>(`/api/v1/users`, "get");
      console.log(userResponse);
      const {
        id,
        userId: _,
        ...filteredProfileData
      } = profileResponse.data.data;

      const age = filteredProfileData.birth
        ? calculateAge(filteredProfileData.birth)
        : null;
      console.log(age);
      set(state => ({
        profileData: {
          // 서버 연동 시 .data 추가
          ...filteredProfileData,
          nickname: userResponse.data.data.nickname,
        },
        age,
      }));
    } catch (error) {
      console.error("Error fetching profile data:", error);

      set(() => ({ profileData: initialProfileData, age: null }));
    }
  },

  // 프로필 데이터를 기본 상태로 리셋하는 함수
  // 새로운 함수: 특정 사용자 ID 목록에 대해 프로필 정보 가져오기
  fetchParticipantsProfiles: async (userIds: string[]) => {
    const profiles = await Promise.all(
      userIds.map(async userId => {
        try {
          const profile = await fetchCall<{ data: { fileAddress: string } }>(
            `/api/v1/users/profile`,
            "get",
          );
          const userData = await fetchCall<{
            data: { data: { nickname: string } };
          }>(`/api/v1/users/${userId}`, "get");

          return {
            userId,
            profile: {
              nickname: userData.data.data.nickname,
              fileAddress: profile.data.fileAddress,
            },
          };
        } catch {
          return {
            userId,
            profile: { nickname: "Unknown", fileAddress: "" },
          };
        }
      }),
    );
    console.log(profiles);
    const profileMap = profiles.reduce(
      (acc, { userId, profile }) => {
        acc[userId] = profile;
        return acc;
      },
      {} as { [key: string]: SimplifiedUserProfile },
    );

    set(state => ({
      userProfiles: {
        ...state.userProfiles,
        ...profileMap,
      } as { [key: string]: SimplifiedUserProfile | UserProfile },
    }));
  },

  // 프로필 데이터를 기본 상태로 리셋하는 함수
  resetProfileData: () =>
    set(() => {
      console.log("Resetting Profile Data to Initial State"); // 로그 추가
      return { profileData: initialProfileData, age: null };
    }),
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
