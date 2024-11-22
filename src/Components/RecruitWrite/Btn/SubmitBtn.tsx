import React, { useState } from "react";
import { useParams } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { mappingCondition } from "../../../Utils/mappingCondition";
import PaymentBtn from "./PaymentBtn";

const SubmitBtn = React.memo(() => {
  const { id } = useParams();
  const postData = useRecruitPostStore(state => state.postData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPaymentBtn, setShowPaymentBtn] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    postId: number;
    participationId: number;
  } | null>(null);

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
      setPaymentInfo(data.data.data);
      setShowPaymentBtn(true);

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

  return showPaymentBtn && paymentInfo ? (
    <PaymentBtn
      postId={paymentInfo.postId}
      participationId={paymentInfo.participationId}
    />
  ) : (
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
