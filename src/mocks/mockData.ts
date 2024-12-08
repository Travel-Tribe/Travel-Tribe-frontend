import {
  CommunityType,
  EmailCodeType,
  ParticipationType,
  PaymentType,
  ReviewType,
  TravelPlanType,
  UserProfileType,
  UserType,
  VotingType,
} from "../type/types";

export const UserMockData: UserType[] = [
  {
    userId: 1,
    username: "testUser",
    password: "password123",
    email: "test@example.com",
    nickname: "tester",
    phone: "123-456-7890",
    profileCheck: true,
    mbti: "ISTJ",
    fileAddress: "",
  },
  {
    userId: 2,
    username: "testUser2",
    password: "password123",
    email: "test2@example.com",
    nickname: "tester2",
    phone: "123-456-7891",
    profileCheck: false,
    mbti: "INFJ",
    fileAddress: "",
  },
  {
    userId: 3,
    username: "testUser3",
    password: "password123",
    email: "test3@example.com",
    nickname: "tester3",
    phone: "123-456-7892",
    profileCheck: true,
    mbti: "ENTP",
    fileAddress: "",
  },
  {
    userId: 4,
    username: "testUser4",
    password: "password123",
    email: "test4@example.com",
    nickname: "tester4",
    phone: "123-456-7893",
    profileCheck: true,
    mbti: "ISTP",
    fileAddress: "",
  },
  {
    userId: 5,
    username: "testUser5",
    password: "password123",
    email: "test5@example.com",
    nickname: "tester5",
    phone: "123-456-7894",
    profileCheck: true,
    mbti: "ISFP",
    fileAddress: "",
  },
];

export const UserProfileData: { [key: string]: UserProfileType } = {
  "1": {
    id: 1,
    userId: 1,
    introduction: "안녕하세요! 여행을 좋아하는 개발자입니다.",
    mbti: "ISTJ",
    smoking: "비흡연자",
    gender: "남자",
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
    smoking: "흡연자",
    gender: "여자",
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
    smoking: "흡연자",
    gender: "여자",
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
    smoking: "비흡연자",
    gender: "남자",
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

export const EmailChangeMockData: EmailCodeType = {
  email: "t@t.com",
  code: "670127",
};

export const RecruitMockData: TravelPlanType[] = [
  {
    postId: 1,
    userId: 1,
    status: "모집중",
    title: "도쿄 미식 여행",
    travelStartDate: "2025-01-01",
    travelEndDate: "2025-04-03",
    maxParticipants: 6,
    travelCountry: "일본",
    continent: "아시아",
    region: "도쿄",
    accommodationFee: 500000,
    otherExpenses: 100000,
    airplaneFee: 400000,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "무관",
    limitSmoke: "무관",
    deadline: "2024-12-30",
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

export const ReviewData: ReviewType[] = [
  {
    postId: "1",
    reviewId: "1",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    userId: 3,
    nickname: "tester1",
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "1",
    reviewId: "2",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "1",
    reviewId: "3",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "5",
    reviewId: "4",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    userId: 3,
    nickname: "tester1",
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "5",
    reviewId: "5",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    userId: 2,
    nickname: "tester1",
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "6",
    reviewId: "6",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    userId: 4,
    nickname: "tester1",
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "7",
    reviewId: "7",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "8",
    reviewId: "8",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "9",
    reviewId: "9",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
  {
    postId: "10",
    reviewId: "10",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    participants: "4",
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
    travelStartDate: "2022-01-01",
    travelEndDate: "2022-01-03",
    createDate: "2022-01-04",
  },
];

export const ParticipationsData: ParticipationType[] = [
  {
    participationId: 1,
    postId: 1,
    userId: "1",
    ParticipationStatus: "TRAVEL_FINISHED",
    ratingStatus: "평가미완료",
  },
  {
    participationId: 2,
    postId: 1,
    userId: "2",
    ParticipationStatus: "TRAVEL_FINISHED",
    ratingStatus: "평가미완료",
  },
  {
    participationId: 3,
    postId: 1,
    userId: "3",
    ParticipationStatus: "TRAVEL_FINISHED",
    ratingStatus: "평가미완료",
  },
];

export const PaymentsData: PaymentType[] = [
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

export const votingStarts: VotingType = {
  postId: "5",
  votingStartsId: 1,
  votingStatus: "STARTING",
};

export const CommunityData: CommunityType[] = [
  {
    communityId: 1,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 2,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 3,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 4,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 5,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 6,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 7,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 8,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 9,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
  {
    communityId: 10,
    userId: 1,
    title: "일본 여행 후기",
    content: "오사카오사카",
    continent: "아시아",
    country: "일본",
    region: "오사카",
    createdAt: "2023-01-03",
    files: [{ fileName: "/images/gangneung1.jpg" }],
  },
];
