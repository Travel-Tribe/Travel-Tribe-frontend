import fetchCall from "./apiFetch";

export const postImgUrl = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("입력 url: " + formData);
  const response = await fetchCall<{ data: { data: { fileUrl: string } } }>(
    "/api/v1/file/upload",
    "post",
    formData,
  );
  const fileUrl = response.data.data.fileUrl;
  console.log(fileUrl);
  console.log(
    "받은 url: ",
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/preview-image?fileUrl=${fileUrl}`,
  );

  // return `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/preview-image?fileUrl=${fileUrl}`;
  return `${fileUrl}`;
};

export const previewImg = async (imgUrl: string) => {
  const previewResponse = await fetchCall<Blob>(
    `/api/v1/file/preview?fileUrl=${imgUrl}`,
    "get",
    undefined,
    "blob",
  );

  if (previewResponse.data) {
    // const imgPreviewUrl = URL.createObjectURL(previewResponse.data);
    // 상태 업데이트 (미리보기 URL)
    return URL.createObjectURL(previewResponse.data);
  }
};
