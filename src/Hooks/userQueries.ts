import { useQuery, useMutation } from "react-query";
import {
  fetchUserProfile,
  fetchUserBasicInfo,
  fetchParticipantsProfiles,
} from "../apis/user";
import fetchCall from "../Utils/apiFetch";
import { useProfileStore } from "../store/profileStore";

// 사용자 프로필 조회
export const useUserProfile = (userId: string) => {
  return useQuery(["userProfile", userId], () => fetchUserProfile(userId), {
    enabled: !!userId, // userId가 있을 때만 실행
  });
};

// 사용자 기본 정보 조회
export const useUserBasicInfo = () => {
  const initializeBasicInfo = useProfileStore((state) => state.initializeBasicInfo);

  return useQuery("userBasicInfo", fetchUserBasicInfo, {
    onSuccess: (data) => {
      initializeBasicInfo(data);
    },
  });
};

// 여러 사용자 프로필 조회
export const useParticipantsProfiles = (userIds: string[]) => {
  return useQuery(
    ["participantsProfiles", userIds],
    () => fetchParticipantsProfiles(userIds),
    {
      enabled: userIds.length > 0, // userIds가 있을 때만 실행
    },
  );
};

// 사용자 프로필 업데이트
export const useUpdateUserProfile = () => {
  return useMutation((updatedData: any) =>
    fetchCall(`/api/v1/users/profile`, "patch", updatedData),
  );
};
