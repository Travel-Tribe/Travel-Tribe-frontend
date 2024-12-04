import fetchCall from "../Utils/apiFetch";
import { UserProfileType } from "../type/types";

// 단일 사용자 프로필 가져오기
export const fetchUserProfile = async (userId: string) => {
  const response = await fetchCall<{ data: UserProfileType }>(
    `/api/v1/users/${userId}/profile`,
    "get",
  );
  return response.data; // 필요한 데이터만 반환
};

// 사용자 기본 정보 가져오기 (닉네임, 전화번호)
export const fetchUserBasicInfo = async () => {
  const response = await fetchCall<{
    data: { data: { nickname: string; phone: string } };
  }>(`/api/v1/users`, "get");
  return response.data.data; // nickname과 phone만 반환
};

// 여러 사용자 프로필 가져오기
export const fetchParticipantsProfiles = async (userIds: string[]) => {
  const profiles = await Promise.all(
    userIds.map(async userId => {
      try {
        const response = await fetchCall<{
          data: { data: { nickname: string; fileAddress: string } };
        }>(`/api/v1/users/${userId}`, "get");
        return {
          userId,
          profile: response.data.data,
        };
      } catch {
        return {
          userId,
          profile: { nickname: "Unknown", fileAddress: "" },
        };
      }
    }),
  );

  // ID를 키로 갖는 객체로 반환
  return profiles.reduce(
    (acc, { userId, profile }) => {
      acc[userId] = profile;
      return acc;
    },
    {} as { [key: string]: { nickname: string; fileAddress: string } },
  );
};
