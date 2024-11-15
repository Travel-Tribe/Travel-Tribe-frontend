import { useParams } from "react-router-dom";
import Person from "../assets/icons/person.svg";
import Calendar from "../assets/icons/Calendar.svg";
import MapPin from "../assets/icons/Map pin.svg";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import fetchCall from "../Utils/apiFetch";
import { useQuery } from "react-query";

const ReviewDetail = (): JSX.Element => {
  const { reviewId, postId } = useParams<{
    reviewId: string;
    postId: string;
  }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviewData", postId],
    queryFn: async () => {
      const response = await fetchCall(
        `/api/v1/posts/${postId}/reviews/${reviewId}/view`,
        "get",
      );
      console.log("reviewData", response);
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("에러", error);
    return <>에러 입니다.</>;
  }

  return (
    <div className="w-[1300px] mx-auto">
      <div className="w-[100%] min-x-[600px] mb-[10px]">
        <p className="text-[18px] font-bold mb-[5px]">{data.title}</p>
        <div className="w-[100%] min-x-[600px] flex items-center">
          <>
            <img
              src={Person}
              alt="사람 아이콘"
              className="w-[16px] h-[16px] mr-[5px]"
            />
            {data.nickname}
          </>
          <>
            <img
              src={Calendar}
              alt="사람 아이콘"
              className="w-[16px] h-[16px] ml-[10px] mr-[5px]"
            />
            {data.travelStartDate} ~ {data.travelEndDate}
          </>
          <>
            <img
              src={MapPin}
              alt="사람 아이콘"
              className="w-[16px] h-[16px] ml-[10px] mr-[5px]"
            />
            {data.region}
          </>
        </div>
      </div>
      <div className="w-[100%] min-x-[600px] mb-[10px] px-[15px] py-[20px] border bg-white radius-10px">
        <div className="mb-[20px] whitespace-pre-line">{data.contents}</div>
        <div className="flex gap-[10px] items-center overScroll-x-scroll">
          {data.files.map(file => (
            <img
              key={file.fileAddress}
              src={file.fileAddress}
              alt=""
              className="w-[150px] h-[200px]"
            />
          ))}
        </div>
        <div className="mt-[10px]">작성일: {data.createDate}</div>
      </div>
      <div className="w-[100%] min-x-[600px] flex justify-between">
        {reviewId === localStorage.getItem(STORAGE_KEYS.USER_ID) ? (
          <button className="btn bg-custom-red text-white">수정하기</button>
        ) : (
          <div className="invisible ml-[10px]"></div>
        )}
        <button className="btn bg-custom-green text-white">목록으로</button>
      </div>
    </div>
  );
};

export default ReviewDetail;
