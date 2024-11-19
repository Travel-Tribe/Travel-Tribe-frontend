import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReviewPost } from "../../store/reviewPost";
import fetchCall from "../../Utils/apiFetch";
import RecruitInfo from "./RecruitInfo";
import { useQuery, useMutation, useQueryClient } from "react-query";

interface ReviewData {
  title: string;
  contents: string;
  files: { fileAddress: string }[];
  continent: string;
  country: string;
  region: string;
}

interface ApiResponse {
  data: {
    data: ReviewData;
  };
}

const ReviewEdit = () => {
  const params = useParams<{ postId: string; reviewId: string }>();
  const { postId, reviewId } = params;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { formData, setFormData, setIsSubmitting } = useReviewPost();

  // 리뷰 데이터 조회
  const { isLoading } = useQuery(
    ["review", postId, reviewId],
    async () => {
      const response = await fetchCall<ApiResponse>(
        `/api/v1/posts/${postId}/reviews/${reviewId}`,
        "get",
      );
      console.log("리뷰:", response);
      return response;
    },
    {
      onSuccess: response => {
        const reviewData = response.data.data;
        setFormData({
          title: reviewData.title,
          contents: reviewData.contents,
          files: reviewData.files || [],
          continent: reviewData.continent,
          country: reviewData.country,
          region: reviewData.region,
        });
      },
      onError: error => {
        console.error("Error fetching review:", error);
        alert("리뷰 데이터를 불러오는데 실패했습니다.");
        navigate("/review");
      },
    },
  );

  // 리뷰 수정 mutation
  const updateReviewMutation = useMutation(
    async (reviewData: ReviewData) => {
      return await fetchCall(
        `/api/v1/posts/${postId}/reviews/${reviewId}`,
        "put",
        reviewData,
      );
    },
    {
      onSuccess: () => {
        // 캐시 무효화
        queryClient.invalidateQueries(["review", postId, reviewId]);
        queryClient.invalidateQueries(["reviews"]); // 리뷰 목록도 함께 업데이트
        navigate(`/review/${reviewId}`);
      },
      onError: error => {
        console.error("Error updating review:", error);
        alert("리뷰 수정에 실패했습니다.");
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files).map(file => ({
      fileAddress: URL.createObjectURL(file),
    }));

    setFormData({ files: [...formData.files, ...newFiles] });
  };

  const removeFile = (index: number) => {
    setFormData({
      files: formData.files.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !reviewId) return;

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    if (!formData.contents.trim()) {
      alert("내용을 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      continent: formData.continent,
      country: formData.country,
      region: formData.region,
      title: formData.title,
      contents: formData.contents,
      files: formData.files.map(file => ({
        fileAddress: file.fileAddress,
      })),
    };

    updateReviewMutation.mutate(reviewData);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">여행 후기 수정</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">제목</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="후기 제목을 입력하세요"
                className="input input-bordered w-full"
              />
            </div>

            {postId && <RecruitInfo postId={postId} />}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">내용</span>
              </label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleInputChange}
                placeholder="여행 후기를 작성해주세요"
                className="textarea textarea-bordered h-32"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">사진 첨부</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
              {formData.files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={file.fileAddress}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="btn btn-circle btn-xs absolute top-1 right-1"
                        onClick={() => removeFile(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className={`btn btn-success flex-1 text-white ${
                  updateReviewMutation.isLoading ? "loading" : ""
                }`}
                disabled={updateReviewMutation.isLoading}
              >
                {updateReviewMutation.isLoading
                  ? "수정 중..."
                  : "후기 수정하기"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate(`/review/${reviewId}`)}
                disabled={updateReviewMutation.isLoading}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewEdit;
