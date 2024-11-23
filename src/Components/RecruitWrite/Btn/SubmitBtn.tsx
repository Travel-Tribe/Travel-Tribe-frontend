import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { mappingCondition } from "../../../Utils/mappingCondition";

// interface PostResponse {
//   data: {
//     data: {
//       postId: number;
//       participationId: number;
//     };
//   };
// }

const SubmitBtn = React.memo(() => {
  const { id } = useParams();
  const postData = useRecruitPostStore(state => state.postData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      setIsLoading(true);
      let response;
      if (id) {
        response = await fetchCall(
          `/api/v1/posts/${id}`,
          "put",
          JSON.stringify({
            ...postData,
            limitSex: mappingCondition[postData.limitSex],
            limitSmoke: mappingCondition[postData.limitSmoke],
          }),
        );
      } else {
        response = await fetchCall(
          "/api/v1/posts",
          "post",
          JSON.stringify({
            ...postData,
            limitSex: mappingCondition[postData.limitSex],
            limitSmoke: mappingCondition[postData.limitSmoke],
          }),
        );
      }
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
      } else {
        throw new Error("게시글 등록에 실패했습니다.");
      }
    } catch {
      throw new Error("게시글 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn w-[130px] h-[35px] btn-success text-white"
      onClick={handlePost}
      disabled={isLoading}
    >
      {isLoading ? "처리 중..." : "등록하기"}
    </button>
  );
});

export default SubmitBtn;
