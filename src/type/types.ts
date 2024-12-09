export interface UserType {
  userId: number;
  username: string;
  password: string;
  email: string;
  nickname: string;
  phone: string;
  profileCheck: boolean;
  mbti: string;
  fileAddress: string;
}

export interface UserProfileType {
  id: number;
  userId: number;
  introduction: string;
  mbti: string;
  smoking: string;
  gender: string;
  birth: string;
  ratingAvg: null | number;
  fileAddress: string;
  langAbilities: string[] | undefined;
  visitedCountries: string[] | undefined;
  age: number | null;
  nickname: string;
  phone: string;
}

export interface AuthorProfileType {
  nickname: string;
  gender: string;
  ratingAvg: number | null;
  count: string;
  fileAddress: string;
  mbti: string;
}

export interface EmailCodeType {
  email: string;
  code: string;
}

/** */
// 모집 글 관련 //
/** */

export interface DayDetailType {
  title: string;
  description: string;
  fileAddress: string;
}

export interface ItineraryVisitType {
  latitude: number;
  longitude: number;
  orderNumber: number;
}

// 하루 일정 정보
export interface DayType {
  dayDetails: DayDetailType[];
  itineraryVisits: ItineraryVisitType[];
}

// 여행 계획 정보
export interface TravelPlanType {
  postId?: number;
  userId?: number;
  title: string;
  travelStartDate: string; // "YYYY-MM-DD"
  travelEndDate: string; // "YYYY-MM-DD"
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  region: string;
  status?: string;
  accommodationFee: number;
  airplaneFee: number;
  otherExpenses: number;
  limitMaxAge: number;
  limitMinAge: number;
  limitSex: string;
  limitSmoke: string;
  deadline: string; // "YYYY-MM-DD"
  nickname: string;
  mbti: string;
  profileFileAddress: string;
  days: DayType[];
}

export interface FileType {
  fileAddress: string;
  previewAddress?: string;
}

export interface ReviewType {
  userId: number;
  postId: number;
  reviewId: number;
  continent: string;
  country: string;
  region: string;
  title: string;
  contents: string;
  files: FileType[];
  nickname: string;
  travelStartDate: string;
  travelEndDate: string;
  createDate: string;
  mbti: string;
  profileFileAddress: string;
}

/** */
// 참가하기 관련 //
/** */

export interface ParticipationType {
  participationId: number;
  postId: number;
  userId: string;
  ParticipationStatus: string;
  ratingStatus: string;
}

/** */
// 결제 데이터 관련 //
/** */

// 결제 데이터 인터페이스
export interface PaymentType {
  depositId: string;
  postId: number;
  participationId: number;
  userId: string;
  amount: number;
}

/** */
// 투표 관련 //
/** */

export interface VotingType {
  postId: string;
  votingStartsId: number;
  votingStatus: string;
}

/** */
// 커뮤니티 글 관련 //
/** */

export interface CommunityType {
  communityId: number;
  userId: number;
  nickname: string;
  title: string;
  content: string;
  continent: string;
  country: string;
  region: string;
  createdAt: string;
  files: [{ fileName: string }];
}

export interface ErrorDetail {
  errorMessage: string;
}

export interface ErrorType {
  errors: ErrorDetail[];
}

export interface ApiResponse<T> {
  data: {
    data: T;
  };
}
