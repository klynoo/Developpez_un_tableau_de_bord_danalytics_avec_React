// src/context/UserDataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchData } from "../apiService";

type KeyData = {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
};

type UserData = {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore: number;
  keyData: KeyData;
};

interface UserDataContextProps {
  userData: UserData | null;
}

export const UserDataContext = createContext<UserDataContextProps>({
  userData: null,
});

interface UserDataProviderProps {
  userId: number;
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  userId,
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchData(userId)
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};
