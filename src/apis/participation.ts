import {
  ApiResponse,
  AuthorProfileType,
  ParticipationType,
} from "../type/types";
import fetchCall from "./fetchCall";

// 참여자수 가져오기
export const getParticipations = async (
  postId: string,
): Promise<ParticipationType[]> => {
  if (!postId) {
    throw new Error("포스트 ID가 없습니다.");
  }

  const response = await fetchCall<ApiResponse<ParticipationType[]>>(
    `/api/v1/posts/${postId}/participations`,
    "get",
  );

  if (!response.data.data) {
    throw new Error("사용자 데이터를 받아올 수 없습니다.");
  }

  return response.data.data;
};

// 작성자 프로필 가져오기
export const getUserProfile = async (
  userId: string,
): Promise<AuthorProfileType> => {
  if (!userId) {
    throw new Error("호스트 ID가 없습니다.");
  }

  const response = await fetchCall<ApiResponse<AuthorProfileType>>(
    `/api/v1/users/${userId}`,
    "get",
  );

  if (!response.data.data) {
    throw new Error("사용자 데이터를 받아올 수 없습니다.");
  }

  return response.data.data;
};
