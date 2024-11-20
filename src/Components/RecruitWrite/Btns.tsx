import React from "react";
import { Link, useParams } from "react-router-dom";

import { useRecruitPostStore } from "../../store/recruitPostStore";

import PostBtn from "./PostBtn";

const Btns = React.memo((): JSX.Element => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const { postData, clearTravelData } = useRecruitPostStore();

  // const onClickPostData = async () => {
  //   try {
  //     let data;
  //     if (id) {
  //       data = await fetchCall(
  //         `/api/v1/posts/${id}`,
  //         "put",
  //         JSON.stringify(postData),
  //       );
  //     } else {
  //       data = await fetchCall(
  //         "/api/v1/posts",
  //         "post",
  //         JSON.stringify(postData),
  //       );
  //     }

  //     if (data.status === 201) {
  //       navigate("/recruitment");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching profile data:", error);
  //   }
  // };

  return (
    <div
      className="
        fixed bottom-0 left-0 w-[50%] min-w-[600px] max-w-[50%] h-[80px] 
        shadow-[0_4px_18px_rgba(0,0,0,0.25)] bg-white
        flex items-center justify-between"
    >
      <div className="invisible ml-[10px]"></div>
      <div className="mr-[10px]">
        <button
          className="btn w-[130px] h-[35px] bg-custom-blue text-white mr-[30px]"
          onClick={clearTravelData}
        >
          글 초기화
        </button>
        <Link
          to={"/recruitment"}
          className="btn w-[130px] h-[35px] bg-custom-pink text-white mr-[30px]"
          onClick={clearTravelData}
        >
          취소하기
        </Link>
        {/* <button
          className="btn w-[130px] h-[35px] bg-custom-green text-white"
          onClick={onClickPostData}
        >
          등록하기
        </button> */}
        <PostBtn id={Number(id)} postData={postData} />
      </div>
    </div>
  );
});

export default Btns;
