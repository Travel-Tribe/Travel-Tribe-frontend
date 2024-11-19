import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import MyProfile from "../Components/Mypage/MyProfile";
import ProfileEdit from "../Components/Mypage/ProfileEdit";
import MyCompletedTrips from "../Components/Mypage/MyCompletedTrips";
import MyTravelHistory from "../Components/Mypage/MyTravelHistory";
import MyAccountSettings from "../Components/Mypage/MyAccountSettings";
import PrivateRoutes from "../Components/Layout/PrivateRoutes";
import PublicOnlyRoutes from "../Components/Layout/PublicOnlyRoutes";
import Layout from "../Components/Layout";
import { ProfileRequiredRoutes } from "../Components/Layout/ProfileRequiredRoutes";
import HomeLayout from "../Components/Layout/HomeLayout";
import ReviewDetail from "../Page/ReviewDetail";
import ProfileCreate from "../Components/Mypage/ProfileCreate";
import ReviewEdit from "../Components/ReviewWrite/ReviewEdit";

const Error = React.lazy(() => import("../Page/Error"));
const SignIn = React.lazy(() => import("../Page/SignIn"));
const SignUp = React.lazy(() => import("../Page/SignUp"));
const Find = React.lazy(() => import("../Page/Find"));
const Recruitment = React.lazy(() => import("../Page/Recruitment"));
const RecruitWrite = React.lazy(() => import("../Page/RecruitWrite"));
const RecruitDetail = React.lazy(() => import("../Page/RecruitDetail"));
const Review = React.lazy(() => import("../Page/Review"));
const ReviewForm = React.lazy(() => import("../Page/ReviewForm"));
const MyPage = React.lazy(() => import("../Page/MyPage"));

const Router = (): JSX.Element => {
  return (
    <Suspense fallback={""}>
      <Routes>
        {/* 공개 전용 라우트 - 로그인하지 않은 사용자만 접근 가능 */}
        <Route element={<PublicOnlyRoutes />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/find" element={<Find />} />
        </Route>

        {/* Layout으로 감싸진 모든 페이지 */}
        <Route element={<Layout />}>
          {/* 로그인 필요한 라우트 */}
          <Route element={<PrivateRoutes />}>
            {/* 프로필 필수 라우트 */}
            <Route element={<ProfileRequiredRoutes />}>
              {/* 글쓰기 관련 */}
              <Route path="/recruitment/write" element={<RecruitWrite />} />
              <Route path="/recruitment/edit/:id" element={<RecruitWrite />} />
              <Route
                path="/recruitment/:postId/review/write"
                element={<ReviewForm />}
              />
              <Route
                path="/recruitment/:postId/review/edit/:id"
                element={<ReviewEdit />}
              />
            </Route>

            {/* 프로필 불필요 라우트 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<MyProfile />} />
              <Route path="myProfileEdit" element={<ProfileEdit />} />
              <Route path="completedTrips" element={<MyCompletedTrips />} />
              <Route path="travelHistory" element={<MyTravelHistory />} />
              <Route path="accountSettings" element={<MyAccountSettings />} />
              <Route path="profileCreate" element={<ProfileCreate />} />
            </Route>
          </Route>

          {/* 로그인 필요없는 일반 페이지 */}
          <Route element={<HomeLayout />}>
            <Route path="/review" element={<Review />} />
            <Route path="/recruitment" element={<Recruitment />} />
          </Route>

          <Route path="/" element={<Navigate to="/recruitment" replace />} />
          <Route path="/recruitment/:id" element={<RecruitDetail />} />
          <Route
            path="/recruitment/:postId/review/:reviewId"
            element={<ReviewDetail />}
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
