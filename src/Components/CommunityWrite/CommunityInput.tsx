import { useEffect } from "react";
import { postImgUrl, previewImg } from "../../Utils/postImgUrl";
import fetchCall from "../../Utils/apiFetch";
import { useNavigate } from "react-router-dom";
import { useCommunityPostStore } from "../../store/CommunityPostStore";

const CommunityInput = () => {
  const navigate = useNavigate();
  const { formData, setFormData, resetForm, isSubmitting, setIsSubmitting } =
    useCommunityPostStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      const uploadedFiles = await Promise.all(
        Array.from(e.target.files).map(async file => {
          const fileUrl = await postImgUrl(file);
          const previewUrl = await previewImg(fileUrl);
          return {
            fileAddress: fileUrl,
            previewAddress: previewUrl,
          };
        }),
      );

      setFormData({ files: [...formData.files, ...uploadedFiles] });
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      alert("파일 업로드에 실패했습니다.");
    }
  };

  const removeFile = (index: number) => {
    setFormData({
      files: formData.files.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      const communityData = {
        title: formData.title,
        contents: formData.content,
        files: formData.files.map(file => ({
          fileAddress: file.fileAddress,
        })),
      };

      console.log("전송할 데이터:", communityData); // 데이터 확인용

      const response = await fetchCall(
        `/api/v1/communities`,
        "post",
        communityData,
      );

      if (response) {
        resetForm();
        navigate(`/community`);
      }
    } catch (err) {
      console.error("게시글 등록 중 오류:", err);
      alert("게시글 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    // URL 객체들 해제
    formData.files.forEach(file => {
      if (file.previewAddress) {
        URL.revokeObjectURL(file.previewAddress);
      }
    });

    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">커뮤니티 글쓰기</h2>

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
                placeholder="제목을 입력하세요"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">내용</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="내용을 입력해주세요"
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
                        src={file.previewAddress || file.fileAddress}
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
                {isSubmitting ? "등록 중..." : "글 등록하기"}
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

export default CommunityInput;
