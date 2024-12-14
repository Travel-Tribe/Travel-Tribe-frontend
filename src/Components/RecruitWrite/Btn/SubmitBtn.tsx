import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";
import fetchCall from "../../../apis/fetchCall";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { CREW_CONDITION } from "../../../constants/CREW_CONDITION";
import { getContinentName } from "../../../utils/getContinentName";
import { mappingCountry } from "../../../utils/mappingCountry";
import { ErrorType } from "../../../type/types";
import { ERROR, SUCCESS } from "../../../constants/MESSAGE";
import Modal from "../../Common/Modal";

const SubmitBtn = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const { id: postId } = useParams();
  const postData = useRecruitPostStore(state => state.postData);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      setIsLoading(true);
      const response = await fetchCall<{
        data: {
          data: {
            postId: string;
            participationId: string;
          };
        };
        status: number;
      }>(
        "/api/v1/posts",
        "post",
        JSON.stringify({
          ...postData,
          limitSex: CREW_CONDITION[postData.limitSex],
          limitSmoke: CREW_CONDITION[postData.limitSmoke],
          continent: getContinentName(postData.continent),
          travelCountry: mappingCountry(postData.travelCountry, "ko"),
        }),
      );
      console.log("등록하기 클릭 응답: ", response);
      console.log("결제정보 응답: ", response.data.data);

      if (
        response.status === 201 &&
        response.data.data.postId &&
        response.data.data.participationId
      ) {
        // 결제 페이지로 이동
        alert(SUCCESS.CREATE_POST);
        navigate(
          `/recruitment/${response.data.data.postId}/pay/${response.data.data.participationId}`,
        );
      }
    } catch (error) {
      setModalMessage(
        `${ERROR.POST} ${(error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage}`,
      );
      throw new Error(
        (
          error as AxiosError<ErrorType>
        ).response?.data?.errors[0]?.errorMessage,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handelEditPost = async () => {
    try {
      setIsLoading(true);
      await fetchCall(
        `/api/v1/posts/${postId}`,
        "put",
        JSON.stringify({
          ...postData,
          limitSex: CREW_CONDITION[postData.limitSex],
          limitSmoke: CREW_CONDITION[postData.limitSmoke],
          continent: getContinentName(postData.continent),
          travelCountry: mappingCountry(postData.travelCountry, "ko"),
        }),
      );
      setShowModal(true);
      setModalMessage(`${SUCCESS.EDIT_POST}`);
    } catch (error) {
      setModalMessage(
        `${ERROR.POST} ${(error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage}`,
      );
      throw new Error(
        (
          error as AxiosError<ErrorType>
        ).response?.data?.errors[0]?.errorMessage,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn w-[130px] h-[35px] btn-success text-white"
        onClick={postId ? handelEditPost : handlePost}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : postId ? "수정하기" : "등록하기"}
      </button>
      <Modal
        isOpen={showModal}
        onClose={
          modalMessage === SUCCESS.EDIT_POST
            ? () => {
                setShowModal(false);
                queryClient.invalidateQueries(["travelPlan", postId]);
                navigate(`/recruitment`);
              }
            : () => setShowModal(false)
        }
        message={modalMessage}
      />
    </>
  );
});

export default SubmitBtn;
