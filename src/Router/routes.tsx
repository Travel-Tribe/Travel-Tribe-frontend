import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Suspense } from "react";

const Error = React.lazy(() => import("../Page/Error"));
const SignIn = React.lazy(() => import("../Page/SignIn"));
const SignUp = React.lazy(() => import("../Page/SignUp"));
const Find = React.lazy(() => import("../Page/Find"));
const Recruitment = React.lazy(() => import("../Page/Recruitment"));
const RecruitForm = React.lazy(() => import("../Page/RecruitForm"));
const RecruitPost = React.lazy(() => import("../Page/RecruitPost"));
const Review = React.lazy(() => import("../Page/Review"));
const ReviewForm = React.lazy(() => import("../Page/ReviewForm"));
const ReviewPost = React.lazy(() => import("../Page/ReviewPost"));
const MyPage = React.lazy(() => import("../Page/MyPage"));

const Router = (): JSX.Element => {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Navigate to="/recruitment" replace />} />

        {/* 모집 관련 라우트 */}
        <Route path="/recruitment" element={<Recruitment />}>
          <Route path="write" element={<RecruitForm />} />
          <Route path="edit/:id" element={<RecruitForm />} />
          <Route path=":id" element={<RecruitPost />} />
        </Route>

        <Route path="/review" element={<Review />}>
          <Route path="write" element={<ReviewForm />} />
          <Route path="edit/:id" element={<ReviewForm />} />
          <Route path=":id" element={<ReviewPost />} />
        </Route>

        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
