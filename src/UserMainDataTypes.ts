interface UserMainData {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
  score?: undefined;
}

interface UserActivity {
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}

interface UserAverageSessions {
  userId: number;
  performance: {
    day: string;
    score: number;
  }[];
}

interface UserPerformance {
  userId: number;
  kind: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
  data: {
    value: number;
    kind: number;
  }[];
}

export type {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
};
