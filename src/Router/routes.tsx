import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import MyProfile from "../components/mypage/MyProfile.tsx";
import ProfileEdit from "../components/mypage/ProfileEdit.tsx";
import MyCompletedTrips from "../components/mypage/MyCompletedTrips.tsx";
import MyTravelHistory from "../components/mypage/MyTravelHistory.tsx";
import MyAccountSettings from "../components/mypage/MyAccountSettings.tsx";
import PrivateLayout from "../components/layout/PrivateLayout.tsx";
import PublicOnlyLayout from "../components/layout/PublicOnlyLayout.tsx";
import Layout from "../components/layout/index.tsx";
import ProfileRequiredLayout from "../components/layout/ProfileRequiredLayout.tsx";
import HomeLayout from "../components/layout/HomeLayout.tsx";
import ReviewDetail from "../page/ReviewDetail.tsx";
import ProfileCreate from "../components/mypage/ProfileCreate.tsx";
import MyVoting from "../components/mypage/MyVoting.tsx";
import ReviewEdit from "../components/reviewWrite/ReviewEdit.tsx";
import CommunityForm from "../page/CommunityForm.tsx";
import CommunityEdit from "../components/communityWrite/CommunityEdit.tsx";
import CommunityDetail from "../page/CommunityDetail.tsx";
import PaymentPage from "../page/PaymentPage.tsx";
import PaymentResultPage from "../page/PaymentResultPage.tsx";

const Error = React.lazy(() => import("../page/Error.tsx"));
const SignIn = React.lazy(() => import("../page/SignIn.tsx"));
const SignUp = React.lazy(() => import("../page/SignUp.tsx"));
const Find = React.lazy(() => import("../page/Find.tsx"));
const Recruitment = React.lazy(() => import("../page/Recruitment.tsx"));
const RecruitWrite = React.lazy(() => import("../page/RecruitWrite.tsx"));
const RecruitDetail = React.lazy(() => import("../page/RecruitDetail.tsx"));
const Review = React.lazy(() => import("../page/Review.tsx"));
const ReviewForm = React.lazy(() => import("../page/ReviewForm.tsx"));
const MyPage = React.lazy(() => import("../page/MyPage.tsx"));
const Community = React.lazy(() => import("../page/Community.tsx"));

const Router = (): JSX.Element => {
  return (
    <Suspense fallback={""}>
      <Routes>
        {/* 공개 전용 라우트 - 로그인하지 않은 사용자만 접근 가능 */}
        <Route element={<PublicOnlyLayout />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/find" element={<Find />} />
        </Route>

        {/* Layout으로 감싸진 모든 페이지 */}
        <Route element={<Layout />}>
          {/* 로그인 필요한 라우트 */}
          <Route element={<PrivateLayout />}>
            {/* 프로필 필수 라우트 */}
            {/* 결제 관련 */}
            <Route element={<ProfileRequiredLayout />}>
              <Route
                path="/recruitment/:postId/pay"
                element={<PaymentPage />}
              />
              <Route
                path="/recruitment/:postId/pay/:participationId"
                element={<PaymentPage />}
              />
              <Route path="/payment/result" element={<PaymentResultPage />} />
              {/* 글쓰기 관련 */}
              <Route path="/recruitment/write" element={<RecruitWrite />} />
              <Route path="/recruitment/edit/:id" element={<RecruitWrite />} />
              {/* 리뷰 작성 관련 */}
              <Route
                path="/recruitment/:postId/review/write"
                element={<ReviewForm />}
              />
              <Route
                path="/recruitment/:postId/review/edit/:id"
                element={<ReviewEdit />}
              />
              {/* 일반 글 작성 관련 */}
              <Route path="/community/write" element={<CommunityForm />} />
              <Route path="/community/edit/:id" element={<CommunityEdit />} />
            </Route>

            {/* 프로필 불필요 라우트 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<MyProfile />} />
              <Route path="profile-edit" element={<ProfileEdit />} />
              <Route path="completed-trips" element={<MyCompletedTrips />} />
              <Route path="review" element={<MyTravelHistory />} />
              <Route path="account-settings" element={<MyAccountSettings />} />
              <Route path="profile-create" element={<ProfileCreate />} />
              <Route path="voting" element={<MyVoting />} />
            </Route>
          </Route>

          {/* 로그인 필요없는 일반 페이지 */}
          <Route element={<HomeLayout />}>
            <Route path="/review" element={<Review />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/community" element={<Community />} />
          </Route>

          <Route path="/" element={<Navigate to="/recruitment" replace />} />
          <Route path="/recruitment/:id" element={<RecruitDetail />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
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
