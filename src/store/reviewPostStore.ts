import { persist } from "zustand/middleware";
import { create } from "zustand";
import { ReviewType } from "../type/types";

type ReviewFormData = Omit<
  ReviewType,
  "postId" | "reviewId" | "userId" | "nickname" | "createDate"
>;

interface ReviewFormState {
  formData: ReviewFormData;
  setFormData: (data: Partial<ReviewFormData>) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const initialState: ReviewFormData = {
  continent: "",
  country: "",
  region: "",
  title: "",
  contents: "",
  travelStartDate: "",
  travelEndDate: "",
  participants: "",
  files: [],
};

export const useReviewPostStore = create<ReviewFormState>()(
  persist(
    set => ({
      formData: initialState,
      isSubmitting: false,
      setFormData: data =>
        set(state => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () => set({ formData: initialState }),
      setIsSubmitting: isSubmitting => set({ isSubmitting }),
    }),
    {
      name: "review-form-storage",
      partialize: state => ({
        ...state,
        formData: {
          ...state.formData,
          files: [],
        },
      }),
    },
  ),
);
