import React from "react";
import { useNavigate } from "react-router-dom";
import { useReviewStore } from "../../store/reviewStore";
import fetchCall from "../../Utils/apiFetch";
import RecruitInfo from "./RecruitInfo";

const ReviewInput = () => {
  // TODO: 실제 구현 시 useParams()로 변경
  const TEST_POST_ID = 1;
  const postId = TEST_POST_ID;
  const navigate = useNavigate();
  const { formData, setFormData, resetForm, isSubmitting, setIsSubmitting } =
    useReviewStore();

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
    if (!postId) return;

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    if (!formData.contents.trim()) {
      alert("내용을 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        ...formData,
        postId,
        userId: 1,
        nickname: "currentUser",
      };

      const response = await fetchCall(
        `/api/v1/posts/${postId}/reviews`,
        "post",
        reviewData,
      );

      if (response) {
        document.getElementById("successAlert")?.classList.remove("hidden");
        resetForm();

        setTimeout(() => {
          navigate(`/posts/${postId}/reviews`);
        }, 3000);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      document.getElementById("errorAlert")?.classList.remove("hidden");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      title: "",
      contents: "",
      files: [],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">여행 후기 작성</h2>

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

            {postId && <RecruitInfo postId={postId.toString()} />}

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
                className={`btn btn-success flex-1 text-white ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "후기 등록하기"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                초기화
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewInput;
