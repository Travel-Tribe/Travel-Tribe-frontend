export const DUPLICATION: { [key: string]: string } = Object.freeze({
  NOT: "이메일 중복 검사와 닉네임 중복 검사를 모두 완료해주세요.", // 중복검사 안함
  FAIL_EMAIL: "이미 사용 중인 email입니다.", // 아이디 중복
  FAIL_PHONE: "이미 사용 중인 전화번호입니다.", // 전화번호 중복
  FAIL_NICKNAME: "이미 사용 중인 닉네임입니다.", // 닉네임 중복
  PASS: "사용가능합니다.", // 통과
});

export const VALIDATION: { [key: string]: string } = Object.freeze({
  INVALID_EMAIL: "올바른 이메일 형식이 아닙니다.", // 이메일 유효성 검사 통과 x
  INVALID_PASSWORD_UNDER_EIGHT: "비밀번호는 8자 이상이어야 합니다.", // 비밀번호 유효성 검사 통과 x
  INVALID_PASSWORD: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
  NOT_SAME_PASSWORD: "비밀번호가 일치하지 않습니다.", // 비밀번호가 다릅니다.
  INVALID_NAME: "이름은 2자 이상이어야 합니다.", // 이름 유효성 검사 통과 x
  INVALID_PHONE: "올바른 전화번호 형식이 아닙니다.", // 전화번호 유효성 검사 통과 x
  INVALID_NICKNAME_UNDER_TWO: "닉네임은 2자 이상이어야 합니다.",
  INVALID_NICKNAME_OVER_TEN: "닉네임은 10자 이하여야 합니다.",
  INVALID_NICKNAME: "닉네임은 한글, 영문, 숫자만 사용 가능합니다.", // 닉네임 유효성 검사 통과 x

  EMPTY_EMAIL: "이메일을 입력해 주세요.",
  EMPTY_PASSWORD: "비밀번호를 입력해 주세요.",

  EMPTY_TITLE: "제목을 입력해주세요.",
  EMPTY_CONTENT: "내용을 입력해주세요.",
});

export const ERROR: { [key: string]: string } = Object.freeze({
  DEFAULT: "에러가 발생했습니다. 다시 한 번 시도해주세요.",

  SIGNIN: "이메일 또는 비밀번호가 올바르지 않습니다.", // 로그인 에러
  SIGNUP: "회원가입 처리 중 문제가 발생했습니다.", // 회원가입 에러
  REQUIRED_PROFILE: "프로필 작성이 필요한 서비스입니다.",
  POST: "글 등록에 실패했습니다.", // 글 등록 에러
  EDIT_PROFILE: "", // 프로필 수정 에러
  ACCESS_TOKEN: "", // 토큰 에러

  LOAD_POST_LIST: "Post를 불러오는데 실패했습니다.", // 글 목록 불러오기 에러
  LOAD_POST: "게시글을 찾을 수 없습니다.", // 포스트 불러오기 에러
  LOAD_MY_POST: "", // 내가 작성한 글 불러오기 에러
  LOAD_MY_PARTICIPATION_LIST: "", // 내 참여 목록 불러오기 에러
  LOAD_USER_INFO: "", // 유저 정보 불러오기 에러
  LOAD_USER_PROFILE: "", // 유저 프로필 불러오기 에러

  PARTICIPATION: "참여 신청 처리 중 오류가 발생했습니다.", // 참가 에러
  PAY_APPROVE_FAIL: "결제 승인에 실패했습니다.",
  PAY_LOAD_FAIL: "결제 정보를 불러오는데 실패했습니다.",
  PAY_INFO_FAIL: "결제 정보를 찾을 수 없습니다.",

  WRITING: "", // 글 작성 에러

  CANCEL_MEMBERSHIP: "", // 회원 탈퇴 에러

  CHANGE_PASSWORD: "", // 비밀번호 변경 에러
  CHANGE_EMAIL: "", // 이메일 변경 에러
  EMAIL_VERIFICATION: "", // 이메일 인증 에러

  FIND_EMAIL: "", // 아이디 찾기 에러
  FIND_PASSWORD: "입력하신 정보와 일치하는 계정을 찾을 수 없습니다.", // 비밀번호 찾기 에러
  GOOGLE_MAP: "", // 구글 맵 에러
});

export const SUCCESS: { [key: string]: string } = Object.freeze({
  SIGNIN: "", // 로그인 성공
  SIGNUP: "회원가입이 완료되었습니다.", // 회원가입 성공
  EDIT_PROFILE: "", // 프로필 수정 성공

  CREATE_POST: "게시글이 등록되었습니다.",
  EDIT_POST: "게시글이 수정되었습니다.",
  DELETE_POST: "게시글이 삭제되었습니다.",

  CREATE_REVIEW: "리뷰가 등록되었습니다.",
  EDIT_REVIEW: "리뷰가 수정되었습니다.",
  DELETE_REVIEW: "리뷰가 삭제되었습니다.",

  PAY_APPROVE_SUCCESS: "결제가 성공적으로 완료되었습니다!",

  CANCEL_MEMBERSHIP: "", // 회원 탈퇴 성공
  CHANGE_EMAIL: "", // 이메일 변경 성공
  CHANGE_PASSWORD: "", // 비밀번호 변경 성공
  FIND_EMAIL: "", // 아이디 찾기 성공
});
