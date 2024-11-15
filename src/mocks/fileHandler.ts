import { http, HttpResponse } from "msw";

export const fileHandler = [
  http.post("/api/v1/file/upload", async ({ request }) => {
    const formData = await request.formData(); // 특정 서버 구현에 따라 다름
    const file = formData.get("file");

    if (!file || typeof file !== "object") {
      return HttpResponse.json(false, {
        status: 400,
      });
    }

    const fakeUrl = URL.createObjectURL(file);

    return HttpResponse.json(
      { fileUrl: fakeUrl },
      {
        status: 201,
      },
    );
  }),
];
