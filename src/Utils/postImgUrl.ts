import fetchCall from "./apiFetch";

export const postImgUrl = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetchCall<{ data: { data: { fileUrl: string } } }>(
    "/api/v1/file/upload",
    "post",
    formData,
  );
  const fileUrl = response.data.data.fileUrl;
  return `${fileUrl}`;
};

export const previewImg = async (imgUrl: string) => {
  const previewResponse = await fetchCall<{ data: Blob }>(
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
