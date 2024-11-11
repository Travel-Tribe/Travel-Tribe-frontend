import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";
import { useTravelData } from "../../Hooks/useTravelData";

const Btns = React.memo((): JSX.Element => {
  const navigate = useNavigate();
  const { travelData } = useTravelData();

  const onClickPostData = useCallback(async () => {
    try {
      console.log(travelData);
      const data = await fetchCall("/api/v1/posts", "post", travelData);
      if (data.status === 201) {
        navigate("/recruitment");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, []);

  return (
    <div
      className="
				fixed bottom-0 left-0 w-[50%] min-w-[540px] h-[80px] 
				shadow-[0_4px_18px_rgba(0,0,0,0.25)] bg-white
				flex items-center justify-between"
    >
      <div className="invisible ml-[10px]">
        <button className="btn w-[130px] h-[35px] bg-custom-pink text-white mr-[30px]">
          글 삭제하기
        </button>
      </div>
      <div className="mr-[10px]">
        <Link
          to={"/recruitment"}
          className="btn w-[130px] h-[35px] bg-custom-pink text-white mr-[30px]"
        >
          취소하기
        </Link>
        <button
          className="btn w-[130px] h-[35px] bg-custom-green text-white"
          onClick={onClickPostData}
        >
          등록하기
        </button>
      </div>
    </div>
  );
});

export default Btns;
