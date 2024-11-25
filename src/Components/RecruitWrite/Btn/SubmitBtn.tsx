import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { mappingCondition } from "../../../Utils/mappingCondition";
import { mappingCountry } from "../../../Utils/mappingCountry";
import { mappingContinent } from "../../../Utils/mappingContinent";
import { useQueryClient } from "react-query";

const SubmitBtn = React.memo(() => {
  const { id: postId } = useParams();
  const postData = useRecruitPostStore(state => state.postData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      setIsLoading(true);
      const response = await fetchCall(
        "/api/v1/posts",
        "post",
        JSON.stringify({
          ...postData,
          limitSex: mappingCondition[postData.limitSex],
          limitSmoke: mappingCondition[postData.limitSmoke],
          travelCountry: mappingCountry(postData.travelCountry, "ko"),
          continent: mappingContinent[postData.continent],
        }),
      );
      console.log("등록하기 클릭 응답: ", response);
      console.log("결제정보 응답: ", response.data.data);

      if (
        response.status === 201 &&
        response.data.data.postId &&
        response.data.data.participationId
      ) {
        // 결제 페이지로 이동
        navigate(
          `/recruitment/${response.data.data.postId}/pay/${response.data.data.participationId}`,
        );
      }
    } catch (error) {
      alert(error.response?.data?.errors[0]?.errorMessage);
      throw new Error("게시글 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handelEditPost = async () => {
    try {
      setIsLoading(true);
      await fetchCall(
        `/api/v1/posts/${postId}`,
        "put",
        JSON.stringify({
          ...postData,
          limitSex: mappingCondition[postData.limitSex],
          limitSmoke: mappingCondition[postData.limitSmoke],
        }),
      );

      alert("글을 수정했습니다.");
      queryClient.invalidateQueries(["travelPlan", postId]);
      navigate(`/recruitment`);
    } catch (error) {
      alert(error.response?.data?.errors[0]?.errorMessage);
      throw new Error(error.response?.data?.errors[0]?.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn w-[130px] h-[35px] btn-success text-white"
      onClick={postId ? handelEditPost : handlePost}
      disabled={isLoading}
    >
      {isLoading ? "처리 중..." : postId ? "수정하기" : "등록하기"}
    </button>
  );
});

export default SubmitBtn;
