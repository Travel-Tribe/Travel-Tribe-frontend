export interface UserType {
  userId: number;
  username: string;
  password: string;
  email: string;
  nickname: string;
  phone: string;
  profileCheck: boolean;
  mbti: string;
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
  langAbilities: string[];
  visitedCountries: string[];
  age: number | null;
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
  fileAddress: string | File;
}

export interface ItineraryVisitType {
  latitude: number;
  longitude: number;
  orderNumber: number;
}

// 하루 일정 정보
export interface DayType {
  dayDetails: DayDetail[];
  itineraryVisits: ItineraryVisit[];
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
  days: Day[];
}

export interface ReviewType {
  userId: number;
  postId: string;
  reviewId: string;
  continent: string;
  country: string;
  region: string;
  title: string;
  contents: string;
  files: File[];
  nickname: string;
  travelStartDate: string;
  travelEndDate: string;
  createDate: string;
  participants: string;
}

export interface FileType {
  fileAddress: string;
  previewAddress?: string;
}

/** */
// 참가하기 관련 //
/** */

export interface ParticipationType {
  participationId: number;
  postId: number;
  userId: string;
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
  title: string;
  content: string;
  continent: string;
  country: string;
  region: string;
  createdAt: string;
  files: [{ fileName: string }];
}
