import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { mappingCondition } from "../../../Utils/mappingCondition";

const SubmitBtn = React.memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postData = useRecruitPostStore(state => state.postData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePost = async () => {
    try {
      setIsLoading(true);
      let data;
      if (id) {
        data = await fetchCall(
          `/api/v1/posts/${id}`,
          "put",
          JSON.stringify({
            ...postData,
            limitSex: mappingCondition[postData.limitSex],
            limitSmoke: mappingCondition[postData.limitSmoke],
          }),
        );
      } else {
        data = await fetchCall(
          "/api/v1/posts",
          "post",
          JSON.stringify({
            ...postData,
            limitSex: mappingCondition[postData.limitSex],
            limitSmoke: mappingCondition[postData.limitSmoke],
          }),
        );
      }
      console.log("등록하기 클릭 응답: ", data);
      // if (data.status === 201) {
      //   navigate("/recruitment");
      // } else {
      //   throw new Error("게시글 등록에 실패했습니다.");
      // }
    } catch {
      throw new Error("게시글 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn w-[130px] h-[35px] bg-custom-green text-white"
      onClick={handlePost}
      disabled={isLoading}
    >
      {isLoading ? "처리 중..." : "등록하기"}
    </button>
  );
});

export default SubmitBtn;
