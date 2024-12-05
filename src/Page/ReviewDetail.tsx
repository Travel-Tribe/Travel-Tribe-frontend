import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegUser, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePinDrop } from "react-icons/md";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import fetchCall from "../Utils/apiFetch";
import { useQuery, useQueryClient } from "react-query";

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

  const deleteReview = async () => {
    const response = await fetchCall(
      `/api/v1/posts/${postId}/reviews/${reviewId}`,
      "delete",
    );

    if (response.data.result === "SUCCESS") {
      queryClient.invalidateQueries("reviewData");
      alert(`${data.title}이 삭제되었습니다.`);
      navigate("/review");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("에러", error.response?.data?.errors[0]?.errorMessage);
    return <>{error.response?.data?.errors[0]?.errorMessage}</>;
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mb-[10px]">
        <p className="text-lg font-bold mb-[5px]">{data.title}</p>
        <div className="flex items-center">
          <>
            <FaRegUser className="w-[16px] h-[16px] mr-[5px]" />
            {data.nickname}
          </>
          <>
            <FaRegCalendarAlt className="w-[16px] h-[16px] ml-[10px] mr-[5px]" />
            {data.travelStartDate} ~ {data.travelEndDate}
          </>
          <>
            <MdOutlinePinDrop className="w-[16px] h-[16px] ml-[10px] mr-[5px]" />
            {data.region}
          </>
        </div>
      </div>
      <div className="mb-[10px] px-[15px] py-[20px] border rounded-xl">
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
      <div className="flex justify-between">
        {String(data.userId) === localStorage.getItem(STORAGE_KEYS.USER_ID) ? (
          <div>
            <button
              className="btn btn-sm btn-warning text-white mr-[10px]"
              onClick={() =>
                navigate(`/recruitment/${postId}/review/edit/${reviewId}`)
              }
            >
              수정하기
            </button>
            <button
              className="btn btn-sm btn-error text-white"
              onClick={deleteReview}
            >
              삭제하기
            </button>
          </div>
        ) : (
          <div className="invisible ml-[10px]"></div>
        )}
        <Link to={"/review"} className="btn btn-sm btn-success text-white">
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetail;
