import { useNavigate, useParams } from "react-router-dom";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import fetchCall from "../Utils/apiFetch";
import { useQuery } from "react-query";
import { useCallback } from "react";
import { CommunityListProps } from "../mocks/mockData";

const ReviewDetail = (): JSX.Element => {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["communityData", id],
    queryFn: async () => {
      const response = await fetchCall<{
        data: { data: [CommunityListProps] };
      }>(`/api/v1/communities/${id}`, "get");
      console.log("communityData", response.data.data);
      return response.data.data[0];
    },
  });

  const deleteCommunities = useCallback(async () => {
    await fetchCall(`/api/v1/communities/${id}`, "delete");
    alert(`${data.title}이 삭제되었습니다.`);
  }, []);

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
      </div>
      <div className="w-[100%] min-x-[600px] mb-[10px] px-[15px] py-[20px] border bg-white radius-10px">
        <div className="mb-[20px] whitespace-pre-line">{data.content}</div>
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
        <div className="mt-[10px]">작성일: {data.createdAt}</div>
      </div>
      <div className="w-[100%] min-x-[600px] flex justify-between">
        {String(data.userId) === localStorage.getItem(STORAGE_KEYS.USER_ID) ? (
          <div className="gap-[10px]">
            <button
              className="btn bg-custom-blue text-white"
              onClick={() => navigate(`/community/edit/${id}`)}
            >
              수정하기
            </button>
            <button
              className="btn bg-custom-red text-white"
              onClick={deleteCommunities}
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
