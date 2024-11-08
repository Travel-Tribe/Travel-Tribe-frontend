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

interface DayDetail {
  dayDatailId: number;
  title: string;
  description: string;
  fileAddress: string;
}

interface ItineraryVisit {
  itineraryVisitId: number;
  point: string;
  order: number;
}

interface Day {
  dayDetails: DayDetail[];
  itineraryVisits: ItineraryVisit[];
}

export interface TravelPlan {
  userId?: string;
  postId?: string;
  title: string;
  travelStartDate: string; // "YYYY-MM-DD"
  travelEndDate: string; // "YYYY-MM-DD"
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  region: string;
  accommodationFee: number;
  ectFee: number;
  airplaneFee: number;
  limitMaxAge: number;
  limitMinAge: number;
  limitSex: string;
  limitSmoke: string;
  preferenceType: string;
  deadline: string; // "YYYY-MM-DD"
  days: Day[];
}
export const RecruitMockData: TravelPlan[] = [
  {
    userId: "1",
    postId: "1",
    title: "도쿄 미식 여행",
    travelStartDate: "2023-02-01",
    travelEndDate: "2023-02-03",
    maxParticipants: 6,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    accommodationFee: 500,
    airplaneFee: 400,
    ectFee: 200,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "미식",
    deadline: "2023-01-15",
    days: [
      {
        dayDetails: [],
        itineraryVisits: [],
      },
      {
        dayDetails: [],
        itineraryVisits: [],
      },
      {
        dayDetails: [],
        itineraryVisits: [],
      },
    ],
  },
  {
    id: "19",
    title: "이스탄불 문화 체험 여행",
    travelStartDate: "2024-12-10",
    travelEndDate: "2024-12-20",
    maxParticipants: 10,
    travelCountry: "TR",
    continent: "ASIA",
    region: "이스탄불",
    accommodationFee: 700,
    airplaneFee: 500,
    otherFee: 300,
    limitMaxAge: 60,
    limitMinAge: 20,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "문화",
    deadline: "2024-11-30",
    days: [
      {
        dayDetails: [
          {
            title: "아야 소피아 투어",
            description: "고대 건축물과 문화 유산 탐방",
            fileAddress: "img13.jpg",
          },
          {
            title: "그랜드 바자 쇼핑",
            description: "이스탄불 전통 시장 쇼핑 투어",
            fileAddress: "img14.jpg",
          },
        ],
        itineraryVisits: [
          { point: "아야 소피아", order: 1 },
          { point: "그랜드 바자", order: 2 },
        ],
      },
      {
        dayDetails: [
          {
            title: "보스포루스 크루즈",
            description: "보스포루스 해협 크루즈 여행",
            fileAddress: "img15.jpg",
          },
          {
            title: "터키 전통 음식 체험",
            description: "로컬 음식 체험 및 요리 클래스",
            fileAddress: "img16.jpg",
          },
        ],
        itineraryVisits: [
          { point: "보스포루스 해협", order: 1 },
          { point: "로컬 음식점", order: 2 },
        ],
      },
    ],
  },
  {
    id: "20",
    title: "오스트리아 음악 여행",
    travelStartDate: "2025-01-05",
    travelEndDate: "2025-01-15",
    maxParticipants: 8,
    travelCountry: "AT",
    continent: "EUROPE",
    region: "빈",
    accommodationFee: 1000,
    airplaneFee: 700,
    otherFee: 200,
    limitMaxAge: 70,
    limitMinAge: 18,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "음악",
    deadline: "2024-12-20",
    days: [
      {
        dayDetails: [
          {
            title: "빈 필하모닉 공연 관람",
            description: "세계적인 오케스트라 공연 관람",
            fileAddress: "img17.jpg",
          },
          {
            title: "슈테판 대성당 탐방",
            description: "유서 깊은 대성당 탐방",
            fileAddress: "img18.jpg",
          },
        ],
        itineraryVisits: [
          { point: "빈 필하모닉", order: 1 },
          { point: "슈테판 대성당", order: 2 },
        ],
      },
      {
        dayDetails: [
          {
            title: "모차르트 생가 방문",
            description: "모차르트의 생가 및 기념관 탐방",
            fileAddress: "img19.jpg",
          },
          {
            title: "도나우 강 크루즈",
            description: "도나우 강을 따라 즐기는 크루즈 여행",
            fileAddress: "img20.jpg",
          },
        ],
        itineraryVisits: [
          { point: "모차르트 생가", order: 1 },
          { point: "도나우 강", order: 2 },
        ],
      },
    ],
  },
];

export interface Review {
  postId: string;
  reviewId: string;
  continent: string;
  country: string;
  region: string;
  title: string;
  contents: string;
  fileAddress: string;
}

export const reviewData: Review[] = [
  {
    postId: "1",
    reviewId: "1",
    continent: "ASIA",
    country: "KR",
    region: "강릉",
    title: "1박 2일 뚜벅이 강릉 여행 후기",
    contents:
      "강릉에서의 멋진 여행을 즐겼습니다. 바다도 보고 맛있는 음식도 먹고 좋은 시간이었습니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
  {
    postId: "2",
    reviewId: "2",
    continent: "EUROPE",
    country: "FR",
    region: "파리",
    title: "낭만적인 파리 여행기",
    contents:
      "에펠탑과 루브르 박물관을 방문했습니다. 파리는 정말 아름다운 도시입니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
  {
    postId: "3",
    reviewId: "3",
    continent: "NORTH AMERICA",
    country: "US",
    region: "뉴욕",
    title: "뉴욕에서의 하루",
    contents: "타임스퀘어, 센트럴 파크를 방문하며 뉴욕의 매력을 느꼈습니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
  {
    postId: "4",
    reviewId: "4",
    continent: "OCEANIA",
    country: "AU",
    region: "시드니",
    title: "호주의 자연과 도시를 만나다",
    contents:
      "오페라 하우스와 시드니 항구를 둘러보며 호주의 매력을 느꼈습니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
  {
    postId: "5",
    reviewId: "5",
    continent: "AFRICA",
    country: "EG",
    region: "카이로",
    title: "피라미드의 신비를 찾아서",
    contents:
      "카이로에서 피라미드를 방문하며 고대 이집트의 역사에 감탄했습니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
  {
    postId: "6",
    reviewId: "6",
    continent: "SOUTH AMERICA",
    country: "BR",
    region: "리우데자네이루",
    title: "삼바의 열정을 느끼다",
    contents:
      "리우데자네이루의 해변과 삼바 카니발을 경험하며 남미의 열정을 체험했습니다.",
    fileAddress: "/images/gangneung1.jpg",
  },
];
