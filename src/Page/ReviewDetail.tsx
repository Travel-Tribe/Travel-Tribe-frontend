import { useNavigate, useParams } from "react-router-dom";
import Person from "../assets/icons/person.svg";
import Calendar from "../assets/icons/Calendar.svg";
import MapPin from "../assets/icons/Map pin.svg";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import fetchCall from "../Utils/apiFetch";
import { useQuery, useQueryClient } from "react-query";
import { useCallback } from "react";

const ReviewDetail = (): JSX.Element => {
  const { reviewId, postId } = useParams<{
    reviewId: string;
    postId: string;
  }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviewData", postId],
    queryFn: async () => {
      const response = await fetchCall(
        `/api/v1/posts/${postId}/reviews/${reviewId}/view`,
        "get",
      );
      console.log("reviewData", response);
      return response.data.data;
    },
  });

  const deleteReview = useCallback(async () => {
    const response = await fetchCall(
      `/api/v1/posts/${postId}/reviews/${reviewId}`,
      "delete",
    );
    if (response.state === 200) {
      queryClient.invalidateQueries("reviewData");
      alert(`${data.title}이 삭제되었습니다.`);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("에러", error.response?.data?.errors[0]?.errorMessage);
    return <>{error.response?.data?.errors[0]?.errorMessage}</>;
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
          {data.files?.map((file: { fileAddress: string }) => (
            <img
              key={file.fileAddress}
              src={
                import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${file.fileAddress}`
              }
              alt=""
              className="w-[150px] h-[200px]"
            />
          ))}
        </div>
        <div className="mt-[10px]">작성일: {data.createDate}</div>
      </div>
      <div className="w-[100%] min-x-[600px] flex justify-between">
        {String(data.userId) === localStorage.getItem(STORAGE_KEYS.USER_ID) ? (
          <div>
            <button
              className="btn bg-custom-blue text-white"
              onClick={() =>
                navigate(`/recruitment/${postId}/review/edit/${reviewId}`)
              }
            >
              수정하기
            </button>
            <button
              className="btn bg-custom-red text-white"
              onClick={deleteReview}
            >
              삭제하기
            </button>
          </div>
        ) : (
          <div className="invisible ml-[10px]"></div>
        )}
        <button className="btn bg-custom-green text-white">목록으로</button>
      </div>
    </div>
  );
};

export default ReviewDetail;
