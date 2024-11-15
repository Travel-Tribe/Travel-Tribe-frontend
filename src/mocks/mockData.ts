import { number, string } from "zod";

interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  nickname: string;
  phone: string;
  profileCheck: boolean;
}

export const UserMockData: User[] = [
  {
    userId: 1,
    username: "testUser",
    password: "password123",
    email: "test@example.com",
    nickname: "tester",
    phone: "123-456-7890",
    profileCheck: true,
  },
  {
    userId: 2,
    username: "testUser2",
    password: "password123",
    email: "test2@example.com",
    nickname: "tester2",
    phone: "123-456-7891",
    profileCheck: false,
  },
  {
    userId: 3,
    username: "testUser3",
    password: "password123",
    email: "test3@example.com",
    nickname: "tester3",
    phone: "123-456-7892",
    profileCheck: true,
  },
  {
    userId: 4,
    username: "testUser4",
    password: "password123",
    email: "test4@example.com",
    nickname: "tester4",
    phone: "123-456-7893",
    profileCheck: true,
  },
  {
    userId: 5,
    username: "testUser5",
    password: "password123",
    email: "test5@example.com",
    nickname: "tester5",
    phone: "123-456-7894",
    profileCheck: true,
  },
];

interface UserProfile {
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
}

export const UserProfileData: { [key: string]: UserProfile } = {
  "1": {
    id: 1,
    userId: 1,
    introduction: "안녕하세요! 여행을 좋아하는 개발자입니다.",
    mbti: "ISTJ",
    smoking: "NO",
    gender: "MALE",
    birth: "1990-01-01",
    ratingAvg: null,
    fileAddress: "",
    langAbilities: ["Korean", "English", "Japanese"],
    visitedCountries: ["Japan", "Canada", "France"],
  },
  "3": {
    id: 2,
    userId: 3,
    introduction: "여행과 사진을 좋아하는 모험가입니다.",
    mbti: "ENFP",
    smoking: "YES",
    gender: "FEMALE",
    birth: "1995-05-15",
    ratingAvg: 4.5,
    fileAddress: "",
    langAbilities: ["Korean", "Spanish"],
    visitedCountries: ["Spain", "Brazil", "Italy"],
  },
  "4": {
    id: 3,
    userId: 4,
    introduction: "안녕하세요! 사진 찍는 여행가입니다.",
    mbti: "ENFP",
    smoking: "YES",
    gender: "FEMALE",
    birth: "1995-06-20",
    ratingAvg: 4.8,
    fileAddress: "",
    langAbilities: ["Korean", "French"],
    visitedCountries: ["Italy", "Spain", "Australia"],
  },
  "5": {
    id: 4,
    userId: 5,
    introduction: "안녕하세요! 다양한 문화를 경험하는 것을 좋아합니다.",
    mbti: "INTJ",
    smoking: "NO",
    gender: "MALE",
    birth: "1988-11-12",
    ratingAvg: 4.5,
    fileAddress: "",
    langAbilities: ["Korean", "German", "Spanish"],
    visitedCountries: ["Germany", "Mexico", "Thailand"],
  },
};

export const DuplicateMockData = {
  email: ["test@example.com"],
  nickname: ["tester"],
  phone: ["123-456-7890"],
};

interface EmailCode {
  email: string;
  code: string;
}
export const EmailChangeMockData: EmailCode = {
  email: "t@t.com",
  code: "670127",
};

// 상세 일정 정보
interface DayDetail {
  title: string;
  description: string;
  fileAddress: string;
}

// 방문 장소 정보
interface ItineraryVisit {
  latitude: number;
  longitude: number;
  orderNumber: number;
}

// 하루 일정 정보
interface Day {
  dayDetails: DayDetail[];
  itineraryVisits: ItineraryVisit[];
}

// 여행 계획 정보
export interface TravelPlan {
  postId?: number;
  userId?: number;
  title: string;
  travelStartDate: string; // "YYYY-MM-DD"
  travelEndDate: string; // "YYYY-MM-DD"
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  region: string;
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

export const RecruitMockData: TravelPlan[] = [
  {
    postId: 1,
    userId: 1,
    title: "도쿄 미식 여행",
    travelStartDate: "2023-4-1",
    travelEndDate: "2023-4-3",
    maxParticipants: 6,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    accommodationFee: 500000,
    otherExpenses: 100000,
    airplaneFee: 400000,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "UNRELATED",
    limitSmoke: "NO",
    deadline: "2023-3-25",
    days: [
      {
        dayDetails: [
          {
            title: "센소지 아사쿠사",
            description: "도쿄에서 가장 오래된 절, 주변 먹거리 골목 탐방",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄 스카이트리",
            description: "도쿄의 랜드마크에서 도시 전경 감상과 점심",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "도쿄 야시장",
            description: "현지 먹거리와 일본의 전통을 느낄 수 있는 야시장 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.7147,
            longitude: 139.7967,
            orderNumber: 1,
          },
          {
            latitude: 35.71,
            longitude: 139.8107,
            orderNumber: 2,
          },
          {
            latitude: 35.6892,
            longitude: 139.7028,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장",
            description: "신선한 해산물과 일본 전통 식문화 체험",
            fileAddress:
              "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
          },
          {
            title: "하라주쿠 & 오모테산도",
            description: "일본의 패션 중심지와 트렌디한 카페 방문",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "시부야 스크램블 교차로",
            description: "세계적으로 유명한 교차로와 주변 맛집 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6654,
            longitude: 139.7707,
            orderNumber: 1,
          },
          {
            latitude: 35.6715,
            longitude: 139.7031,
            orderNumber: 2,
          },
          {
            latitude: 35.6591,
            longitude: 139.7005,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "메이지 신궁",
            description: "도쿄의 대표적인 신사, 평화로운 도시 속 자연 산책",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄타워",
            description: "일본의 상징적인 타워에서 점심과 전망 감상",
            fileAddress:
              "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg",
          },
          {
            title: "긴자",
            description:
              "도쿄의 럭셔리 쇼핑가와 미슐랭 레스토랑에서 마지막 저녁",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6763,
            longitude: 139.6993,
            orderNumber: 1,
          },
          {
            latitude: 35.6586,
            longitude: 139.7454,
            orderNumber: 2,
          },
          {
            latitude: 35.6722,
            longitude: 139.7649,
            orderNumber: 3,
          },
        ],
      },
    ],
  },
  {
    postId: 2,
    userId: 2,
    title: "도쿄 미식 여행",
    travelStartDate: "2023-4-1",
    travelEndDate: "2023-4-3",
    maxParticipants: 3,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    otherExpenses: 500000,
    airplaneFee: 400000,
    accommodationFee: 200000,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "UNRELATED",
    limitSmoke: "NO",
    deadline: "2023-3-25",
    days: [
      {
        dayDetails: [
          {
            title: "센소지 아사쿠사",
            description: "도쿄에서 가장 오래된 절, 주변 먹거리 골목 탐방",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄 스카이트리",
            description: "도쿄의 랜드마크에서 도시 전경 감상과 점심",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "도쿄 야시장",
            description: "현지 먹거리와 일본의 전통을 느낄 수 있는 야시장 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.7147,
            longitude: 139.7967,
            orderNumber: 1,
          },
          {
            latitude: 35.71,
            longitude: 139.8107,
            orderNumber: 2,
          },
          {
            latitude: 35.6892,
            longitude: 139.7028,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장",
            description: "신선한 해산물과 일본 전통 식문화 체험",
            fileAddress:
              "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
          },
          {
            title: "하라주쿠 & 오모테산도",
            description: "일본의 패션 중심지와 트렌디한 카페 방문",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "시부야 스크램블 교차로",
            description: "세계적으로 유명한 교차로와 주변 맛집 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6654,
            longitude: 139.7707,
            orderNumber: 1,
          },
          {
            latitude: 35.6715,
            longitude: 139.7031,
            orderNumber: 2,
          },
          {
            latitude: 35.6591,
            longitude: 139.7005,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "메이지 신궁",
            description: "도쿄의 대표적인 신사, 평화로운 도시 속 자연 산책",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄타워",
            description: "일본의 상징적인 타워에서 점심과 전망 감상",
            fileAddress:
              "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg",
          },
          {
            title: "긴자",
            description:
              "도쿄의 럭셔리 쇼핑가와 미슐랭 레스토랑에서 마지막 저녁",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6763,
            longitude: 139.6993,
            orderNumber: 1,
          },
          {
            latitude: 35.6586,
            longitude: 139.7454,
            orderNumber: 2,
          },
          {
            latitude: 35.6722,
            longitude: 139.7649,
            orderNumber: 3,
          },
        ],
      },
    ],
  },
  {
    postId: 3,
    userId: 3,
    title: "도쿄 미식 여행",
    travelStartDate: "2023-4-1",
    travelEndDate: "2023-4-3",
    maxParticipants: 3,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    otherExpenses: 500000,
    airplaneFee: 400000,
    accommodationFee: 200000,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "UNRELATED",
    limitSmoke: "NO",
    deadline: "2024-11-29",

    days: [
      {
        dayDetails: [
          {
            title: "센소지 아사쿠사",
            description: "도쿄에서 가장 오래된 절, 주변 먹거리 골목 탐방",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄 스카이트리",
            description: "도쿄의 랜드마크에서 도시 전경 감상과 점심",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "도쿄 야시장",
            description: "현지 먹거리와 일본의 전통을 느낄 수 있는 야시장 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.7147,
            longitude: 139.7967,
            orderNumber: 1,
          },
          {
            latitude: 35.71,
            longitude: 139.8107,
            orderNumber: 2,
          },
          {
            latitude: 35.6892,
            longitude: 139.7028,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장",
            description: "신선한 해산물과 일본 전통 식문화 체험",
            fileAddress:
              "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
          },
          {
            title: "하라주쿠 & 오모테산도",
            description: "일본의 패션 중심지와 트렌디한 카페 방문",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
          {
            title: "시부야 스크램블 교차로",
            description: "세계적으로 유명한 교차로와 주변 맛집 탐방",
            fileAddress:
              "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6654,
            longitude: 139.7707,
            orderNumber: 1,
          },
          {
            latitude: 35.6715,
            longitude: 139.7031,
            orderNumber: 2,
          },
          {
            latitude: 35.6591,
            longitude: 139.7005,
            orderNumber: 3,
          },
        ],
      },
      {
        dayDetails: [
          {
            title: "메이지 신궁",
            description: "도쿄의 대표적인 신사, 평화로운 도시 속 자연 산책",
            fileAddress:
              "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
          },
          {
            title: "도쿄타워",
            description: "일본의 상징적인 타워에서 점심과 전망 감상",
            fileAddress:
              "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg",
          },
          {
            title: "긴자",
            description:
              "도쿄의 럭셔리 쇼핑가와 미슐랭 레스토랑에서 마지막 저녁",
            fileAddress:
              "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
          },
        ],
        itineraryVisits: [
          {
            latitude: 35.6763,
            longitude: 139.6993,
            orderNumber: 1,
          },
          {
            latitude: 35.6586,
            longitude: 139.7454,
            orderNumber: 2,
          },
          {
            latitude: 35.6722,
            longitude: 139.7649,
            orderNumber: 3,
          },
        ],
      },
    ],
  },
];

export interface ReviewTypes {
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
}

interface File {
  fileAddress: string;
}

export const ReviewData: ReviewTypes[] = [
  {
    postId: "1",
    reviewId: "1",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    title: "1박 2일 뚜벅이 강릉 여행 후기",
    contents: `강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다. 
      강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다.`,
    files: [
      { fileAddress: "/images/gangneung1.jpg" },
      { fileAddress: "/images/gangneung2.jpg" },
    ],
    userId: 1,
    nickname: "tester1",
    travelStartDate: "2022-1-1",
    travelEndDate: "2022-1-3",
    createDate: "2022-1-4",
  },
];

export interface Participations {
  participationId: number;
  postId: number;
  userId: string;
  ParticipationStatus: string;
  DepositStatus: string;
  RatingStatus: string;
  depositReturnDate: Date | null;
}

export const ParticipationsData: Participations[] = [
  {
    participationId: 1,
    postId: 1,
    userId: "1",
    ParticipationStatus: "JOIN",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: null,
  },
  {
    participationId: 2,
    postId: 2,
    userId: "3",
    ParticipationStatus: "TRAVEL_FINISHED",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: new Date("2023-04-14"),
  },
  {
    participationId: 3,
    postId: 2,
    userId: "4",
    ParticipationStatus: "TRAVEL_FINISHED",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: new Date("2023-04-14"),
  },
  {
    participationId: 4,
    postId: 2,
    userId: "5",
    ParticipationStatus: "TRAVEL_FINISHED",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: new Date("2023-04-14"),
  },
  {
    participationId: 5,
    postId: 1,
    userId: "3",
    ParticipationStatus: "JOIN",
    DepositStatus: "UNPAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: new Date("2023-04-14"),
  },
  {
    participationId: 6,
    postId: 3,
    userId: "1",
    ParticipationStatus: "TRAVEL_FINISHED",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: null,
  },
  {
    participationId: 7,
    postId: 3,
    userId: "4",
    ParticipationStatus: "TRAVEL_FINISHED",
    DepositStatus: "DEPOSIT_PAID",
    RatingStatus: "NOT_RATED",
    depositReturnDate: null,
  },
];

// 결제 데이터 인터페이스
export interface Payment {
  depositId: string;
  postId: number;
  participationId: number;
  userId: string;
  amount: number;
}

export const PaymentsData: Payment[] = [
  {
    depositId: "T1234567890",
    postId: 1,
    participationId: 1,
    userId: "1",
    amount: 10000,
  },
  {
    depositId: "T1234567891",
    postId: 2,
    participationId: 2,
    userId: "3",
    amount: 10000,
  },
  {
    depositId: "T1234567892",
    postId: 2,
    participationId: 3,
    userId: "4",
    amount: 10000,
  },
];

export const kakaoPayReadyResponse = {
  depositId: "T1234567893",
  next_redirect_pc_url: "https://payment-demo.kakaopay.com/online",
};
