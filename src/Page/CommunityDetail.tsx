import { Link, useNavigate, useParams } from "react-router-dom";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import fetchCall from "../Utils/apiFetch";
import { useQuery, useQueryClient } from "react-query";
import { CommunityType, ErrorType } from "../type/types";
import { AxiosError } from "axios";

const ReviewDetail = (): JSX.Element => {
  const { id } = useParams<{
    id: string;
  }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["communityData", id],
    queryFn: async () => {
      const response = await fetchCall<{
        data: { data: CommunityType };
      }>(`/api/v1/communities/${id}`, "get");
      return response.data.data;
    },
  });

  const deleteCommunities = async () => {
    const response = await fetchCall<{ state: number }>(
      `/api/v1/communities/${id}`,
      "delete",
    );
    if (response.state === 200) {
      alert(`${data?.title}이 삭제되었습니다.`);
      queryClient.invalidateQueries("communityData");
      navigate(`/community`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(
      "에러",
      (error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage,
    );
    return (
      <>
        {
          (error as AxiosError<ErrorType>).response?.data?.errors[0]
            ?.errorMessage
        }
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mb-[10px]">
        <p className="text-[18px] font-bold mb-[5px]">{data?.title}</p>
      </div>
      <div className="mb-[10px] px-[15px] py-[20px] border rounded-xl bg-white">
        <div className="mb-[20px] whitespace-pre-line">{data?.content}</div>
        <div className="flex gap-[10px] items-center overScroll-x-scroll">
          {data?.files?.map((file: { fileName: string }, index: number) => (
            <img
              key={index}
              src={
                import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${file.fileName}`
              }
              alt=""
              className="w-[150px] h-[200px]"
            />
          ))}
        </div>
        <div className="mt-[10px]">작성일: {data?.createdAt}</div>
      </div>
      <div className="w-[100%] min-x-[600px] flex justify-between">
        {String(data?.userId) === localStorage.getItem(STORAGE_KEYS.USER_ID) ? (
          <div className="gap-[10px]">
            <button
              className="btn btn-sm btn-warning mr-[10px] text-white"
              onClick={() => navigate(`/community/edit/${id}`)}
            >
              수정하기
            </button>
            <button
              className="btn btn-sm btn-error text-white"
              onClick={deleteCommunities}
            >
              삭제하기
            </button>
          </div>
        ) : (
          <div className="invisible ml-[10px]"></div>
        )}
        <Link to={"/community"} className="btn btn-sm btn-success text-white">
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetail;
