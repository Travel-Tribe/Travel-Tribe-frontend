import { persist } from "zustand/middleware";
import { ReviewTypes } from "../mocks/mockData";
import { create } from "zustand";

type ReviewFormData = Omit<
  ReviewTypes,
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
  participants: "",
  travelStartDate: "",
  travelEndDate: "",
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
