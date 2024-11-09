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
  title: string;
  description: string;
  fileAddress: string;
}

interface ItineraryVisit {
  latitude: number;
  longitude: number;
  orderNumber: number;
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
    travelStartDate: "2023-04-01",
    travelEndDate: "2023-04-03",
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
    deadline: "2023-03-25",
    days: [
      {
        dayDetails: [
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
        ],
        itineraryVisits: [
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 1,
          },
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 2,
          },
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 3,
          },
        ],
      },
    ],
  },
  {
    userId: "2",
    postId: "2",
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
        dayDetails: [
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
          {
            title: "dayDetails_title",
            description: "dayDetails_description",
            fileAddress: "dayDetails_fileAddress",
          },
        ],
        itineraryVisits: [
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 1,
          },
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 2,
          },
          {
            latitude: 37.12,
            longitude: 25.12,
            orderNumber: 3,
          },
        ],
      },
    ],
  },
];
