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
export const EmailChangeMockData = {
  email: "t@t.com",
  code: "670127"
}

interface ItineraryVisit {
  point: string;
  order: number;
}

interface DayDetail {
  title: string;
  description: string;
  fileAddress: string;
}

interface Day {
  dayDetails: DayDetail[];
  itineraryVisits: ItineraryVisit[];
}

export interface TravelPlan {
  id: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  region: string;
  accommodationFee: number;
  airplaneFee: number;
  otherFee: number;
  limitMaxAge: number;
  limitMinAge: number;
  limitSex: string;
  limitSmoke: string;
  preferenceType: string;
  deadline: string;
  days: Day[];
}

export const RecruitMockData: TravelPlan[] = [
  {
    id: "1",
    title: "도쿄 미식 여행",
    travelStartDate: "2023-02-01",
    travelEndDate: "2023-02-03",
    maxParticipants: 6,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    accommodationFee: 500,
    airplaneFee: 400,
    otherFee: 200,
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
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "긴자 음식 투어1",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어2",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어3",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
        ],
        itineraryVisits: [
          { point: "긴자 거리", order: 1 },
          { point: "긴자 거리", order: 2 },
          { point: "긴자 거리", order: 3 },
          { point: "긴자 거리", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "파리 예술 여행",
    travelStartDate: "2023-04-10",
    travelEndDate: "2023-04-14",
    maxParticipants: 8,
    travelCountry: "FR",
    continent: "EUROPE",
    region: "파리",
    accommodationFee: 800,
    airplaneFee: 600,
    otherFee: 300,
    limitMaxAge: 50,
    limitMinAge: 18,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "예술",
    deadline: "2023-03-10",
    days: [
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "스위스 알프스 하이킹",
    travelStartDate: "2023-07-20",
    travelEndDate: "2023-07-23",
    maxParticipants: 10,
    travelCountry: "CH",
    continent: "EUROPE",
    region: "인터라켄",
    accommodationFee: 700,
    airplaneFee: 800,
    otherFee: 250,
    limitMaxAge: 45,
    limitMinAge: 21,
    limitSex: "모두",
    limitSmoke: "허용",
    preferenceType: "하이킹",
    deadline: "2023-06-20",
    days: [
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "몰디브 휴양 여행",
    travelStartDate: "2023-09-01",
    travelEndDate: "2023-09-04",
    maxParticipants: 5,
    travelCountry: "MV",
    continent: "ASIA",
    region: "말레",
    accommodationFee: 1000,
    airplaneFee: 1500,
    otherFee: 300,
    limitMaxAge: 60,
    limitMinAge: 30,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "휴양",
    deadline: "2023-08-01",
    days: [
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "뉴욕 문화 탐방",
    travelStartDate: "2023-05-15",
    travelEndDate: "2023-05-18",
    maxParticipants: 12,
    travelCountry: "US",
    continent: "NORTH_AMERICA",
    region: "뉴욕",
    accommodationFee: 900,
    airplaneFee: 700,
    otherFee: 350,
    limitMaxAge: 55,
    limitMinAge: 20,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "문화",
    deadline: "2023-04-20",
    days: [
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "타임스퀘어 투어1",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어2",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어3",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
        ],
        itineraryVisits: [
          { point: "타임스퀘어", order: 1 },
          { point: "타임스퀘어", order: 2 },
          { point: "타임스퀘어", order: 3 },
          { point: "타임스퀘어", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "로마 역사 투어",
    travelStartDate: "2023-10-05",
    travelEndDate: "2023-10-08",
    maxParticipants: 10,
    travelCountry: "IT",
    continent: "EUROPE",
    region: "로마",
    accommodationFee: 850,
    airplaneFee: 550,
    otherFee: 280,
    limitMaxAge: 65,
    limitMinAge: 25,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "역사",
    deadline: "2023-09-10",
    days: [
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "바티칸 시국 투어1",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어2",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어3",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
        ],
        itineraryVisits: [
          { point: "성 베드로 대성당", order: 1 },
          { point: "시스티나 예배당", order: 2 },
          { point: "시스티나 예배당", order: 3 },
          { point: "시스티나 예배당", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "도쿄 미식 여행",
    travelStartDate: "2023-02-01",
    travelEndDate: "2023-02-03",
    maxParticipants: 6,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    accommodationFee: 500,
    airplaneFee: 400,
    otherFee: 200,
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
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "긴자 음식 투어1",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어2",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어3",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
        ],
        itineraryVisits: [
          { point: "긴자 거리", order: 1 },
          { point: "긴자 거리", order: 2 },
          { point: "긴자 거리", order: 3 },
          { point: "긴자 거리", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "파리 예술 여행",
    travelStartDate: "2023-04-10",
    travelEndDate: "2023-04-14",
    maxParticipants: 8,
    travelCountry: "FR",
    continent: "EUROPE",
    region: "파리",
    accommodationFee: 800,
    airplaneFee: 600,
    otherFee: 300,
    limitMaxAge: 50,
    limitMinAge: 18,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "예술",
    deadline: "2023-03-10",
    days: [
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
    ],
  },
  {
    id: "9",
    title: "스위스 알프스 하이킹",
    travelStartDate: "2023-07-20",
    travelEndDate: "2023-07-23",
    maxParticipants: 10,
    travelCountry: "CH",
    continent: "EUROPE",
    region: "인터라켄",
    accommodationFee: 700,
    airplaneFee: 800,
    otherFee: 250,
    limitMaxAge: 45,
    limitMinAge: 21,
    limitSex: "모두",
    limitSmoke: "허용",
    preferenceType: "하이킹",
    deadline: "2023-06-20",
    days: [
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
    ],
  },
  {
    id: "10",
    title: "몰디브 휴양 여행",
    travelStartDate: "2023-09-01",
    travelEndDate: "2023-09-04",
    maxParticipants: 5,
    travelCountry: "MV",
    continent: "ASIA",
    region: "말레",
    accommodationFee: 1000,
    airplaneFee: 1500,
    otherFee: 300,
    limitMaxAge: 60,
    limitMinAge: 30,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "휴양",
    deadline: "2023-08-01",
    days: [
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
    ],
  },
  {
    id: "11",
    title: "뉴욕 문화 탐방",
    travelStartDate: "2023-05-15",
    travelEndDate: "2023-05-18",
    maxParticipants: 12,
    travelCountry: "US",
    continent: "NORTH_AMERICA",
    region: "뉴욕",
    accommodationFee: 900,
    airplaneFee: 700,
    otherFee: 350,
    limitMaxAge: 55,
    limitMinAge: 20,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "문화",
    deadline: "2023-04-20",
    days: [
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "타임스퀘어 투어1",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어2",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어3",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
        ],
        itineraryVisits: [
          { point: "타임스퀘어", order: 1 },
          { point: "타임스퀘어", order: 2 },
          { point: "타임스퀘어", order: 3 },
          { point: "타임스퀘어", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "12",
    title: "로마 역사 투어",
    travelStartDate: "2023-10-05",
    travelEndDate: "2023-10-08",
    maxParticipants: 10,
    travelCountry: "IT",
    continent: "EUROPE",
    region: "로마",
    accommodationFee: 850,
    airplaneFee: 550,
    otherFee: 280,
    limitMaxAge: 65,
    limitMinAge: 25,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "역사",
    deadline: "2023-09-10",
    days: [
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "바티칸 시국 투어1",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어2",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어3",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
        ],
        itineraryVisits: [
          { point: "성 베드로 대성당", order: 1 },
          { point: "시스티나 예배당", order: 2 },
          { point: "시스티나 예배당", order: 3 },
          { point: "시스티나 예배당", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
    ],
  },
  {
    id: "13",
    title: "도쿄 미식 여행",
    travelStartDate: "2023-02-01",
    travelEndDate: "2023-02-03",
    maxParticipants: 6,
    travelCountry: "JP",
    continent: "ASIA",
    region: "도쿄",
    accommodationFee: 500,
    airplaneFee: 400,
    otherFee: 200,
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
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "긴자 음식 투어1",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어2",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
          {
            title: "긴자 음식 투어3",
            description: "일본 전통 음식 시식",
            fileAddress: "img3.jpg",
          },
        ],
        itineraryVisits: [
          { point: "긴자 거리", order: 1 },
          { point: "긴자 거리", order: 2 },
          { point: "긴자 거리", order: 3 },
          { point: "긴자 거리", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "츠키지 시장 투어1",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어2",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
          {
            title: "츠키지 시장 투어3",
            description: "신선한 해산물 시식과 시장 탐방",
            fileAddress: "img2.jpg",
          },
        ],
        itineraryVisits: [
          { point: "츠키지 시장", order: 1 },
          { point: "츠키지 시장", order: 2 },
          { point: "츠키지 시장", order: 3 },
          { point: "츠키지 시장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "14",
    title: "파리 예술 여행",
    travelStartDate: "2023-04-10",
    travelEndDate: "2023-04-14",
    maxParticipants: 8,
    travelCountry: "FR",
    continent: "EUROPE",
    region: "파리",
    accommodationFee: 800,
    airplaneFee: 600,
    otherFee: 300,
    limitMaxAge: 50,
    limitMinAge: 18,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "예술",
    deadline: "2023-03-10",
    days: [
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "몽마르뜨 언덕 투어1",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어2",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
          {
            title: "몽마르뜨 언덕 투어3",
            description: "예술가 거리 산책",
            fileAddress: "img5.jpg",
          },
        ],
        itineraryVisits: [
          { point: "몽마르뜨 언덕", order: 1 },
          { point: "몽마르뜨 언덕", order: 2 },
          { point: "몽마르뜨 언덕", order: 3 },
          { point: "몽마르뜨 언덕", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "루브르 박물관 투어1",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어2",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
          {
            title: "루브르 박물관 투어3",
            description: "모나리자와 고대 유물 감상",
            fileAddress: "img4.jpg",
          },
        ],
        itineraryVisits: [
          { point: "루브르 박물관", order: 1 },
          { point: "루브르 박물관", order: 2 },
          { point: "루브르 박물관", order: 3 },
          { point: "루브르 박물관", order: 4 },
        ],
      },
    ],
  },
  {
    id: "15",
    title: "스위스 알프스 하이킹",
    travelStartDate: "2023-07-20",
    travelEndDate: "2023-07-23",
    maxParticipants: 10,
    travelCountry: "CH",
    continent: "EUROPE",
    region: "인터라켄",
    accommodationFee: 700,
    airplaneFee: 800,
    otherFee: 250,
    limitMaxAge: 45,
    limitMinAge: 21,
    limitSex: "모두",
    limitSmoke: "허용",
    preferenceType: "하이킹",
    deadline: "2023-06-20",
    days: [
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "융프라우 등반1",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반2",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
          {
            title: "융프라우 등반3",
            description: "알프스의 절경 감상",
            fileAddress: "img6.jpg",
          },
        ],
        itineraryVisits: [
          { point: "융프라우 정상", order: 1 },
          { point: "융프라우 정상", order: 2 },
          { point: "융프라우 정상", order: 3 },
          { point: "융프라우 정상", order: 4 },
        ],
      },
    ],
  },
  {
    id: "16",
    title: "몰디브 휴양 여행",
    travelStartDate: "2023-09-01",
    travelEndDate: "2023-09-04",
    maxParticipants: 5,
    travelCountry: "MV",
    continent: "ASIA",
    region: "말레",
    accommodationFee: 1000,
    airplaneFee: 1500,
    otherFee: 300,
    limitMaxAge: 60,
    limitMinAge: 30,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "휴양",
    deadline: "2023-08-01",
    days: [
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "산호초 스노클링1",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링2",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
          {
            title: "산호초 스노클링3",
            description: "산호초와 해양 생물 탐험",
            fileAddress: "img7.jpg",
          },
        ],
        itineraryVisits: [
          { point: "산호초 스노클링", order: 1 },
          { point: "산호초 스노클링", order: 2 },
          { point: "산호초 스노클링", order: 3 },
          { point: "산호초 스노클링", order: 4 },
        ],
      },
    ],
  },
  {
    id: "17",
    title: "뉴욕 문화 탐방",
    travelStartDate: "2023-05-15",
    travelEndDate: "2023-05-18",
    maxParticipants: 12,
    travelCountry: "US",
    continent: "NORTH_AMERICA",
    region: "뉴욕",
    accommodationFee: 900,
    airplaneFee: 700,
    otherFee: 350,
    limitMaxAge: 55,
    limitMinAge: 20,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "문화",
    deadline: "2023-04-20",
    days: [
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "타임스퀘어 투어1",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어2",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
          {
            title: "타임스퀘어 투어3",
            description: "뉴욕의 중심, 타임스퀘어 탐방",
            fileAddress: "img10.jpg",
          },
        ],
        itineraryVisits: [
          { point: "타임스퀘어", order: 1 },
          { point: "타임스퀘어", order: 2 },
          { point: "타임스퀘어", order: 3 },
          { point: "타임스퀘어", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "브로드웨이 공연 관람1",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람2",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
          {
            title: "브로드웨이 공연 관람3",
            description: "브로드웨이 유명 공연 관람",
            fileAddress: "img9.jpg",
          },
        ],
        itineraryVisits: [
          { point: "브로드웨이 극장", order: 1 },
          { point: "브로드웨이 극장", order: 2 },
          { point: "브로드웨이 극장", order: 3 },
          { point: "브로드웨이 극장", order: 4 },
        ],
      },
    ],
  },
  {
    id: "18",
    title: "로마 역사 투어",
    travelStartDate: "2023-10-05",
    travelEndDate: "2023-10-08",
    maxParticipants: 10,
    travelCountry: "IT",
    continent: "EUROPE",
    region: "로마",
    accommodationFee: 850,
    airplaneFee: 550,
    otherFee: 280,
    limitMaxAge: 65,
    limitMinAge: 25,
    limitSex: "모두",
    limitSmoke: "불가",
    preferenceType: "역사",
    deadline: "2023-09-10",
    days: [
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "바티칸 시국 투어1",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어2",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
          {
            title: "바티칸 시국 투어3",
            description: "성 베드로 대성당과 시스티나 예배당",
            fileAddress: "img12.jpg",
          },
        ],
        itineraryVisits: [
          { point: "성 베드로 대성당", order: 1 },
          { point: "시스티나 예배당", order: 2 },
          { point: "시스티나 예배당", order: 3 },
          { point: "시스티나 예배당", order: 4 },
        ],
      },
      {
        dayDetails: [
          {
            title: "콜로세움 탐방1",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방2",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
          {
            title: "콜로세움 탐방3",
            description: "고대 로마 경기장 탐방",
            fileAddress: "img11.jpg",
          },
        ],
        itineraryVisits: [
          { point: "콜로세움", order: 1 },
          { point: "콜로세움", order: 2 },
          { point: "콜로세움", order: 3 },
          { point: "콜로세움", order: 4 },
        ],
      },
    ],
  },
];
