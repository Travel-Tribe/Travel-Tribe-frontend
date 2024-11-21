import { create } from "zustand";

export interface FileData {
  fileAddress: string;
  previewAddress?: string;
}

// 게시글 데이터 타입 정의
type PostFormData = {
  title: string;
  content: string;
  files: FileData[];
};

// store의 상태와 액션 타입 정의
interface PostFormState {
  formData: PostFormData;
  setFormData: (data: Partial<PostFormData>) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

// 초기 상태 정의
const initialState: PostFormData = {
  title: "",
  content: "",
  files: [],
};

// store 생성
export const useCommunityPostStore = create<PostFormState>()(
  // persist(
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
  // {
  //   name: "community-post-storage",
  //   partialize: state => ({
  //     ...state,
  //     formData: {
  //       ...state.formData,
  //       files: [],
  //     },
  //   }),
  // },
  // ),
);
