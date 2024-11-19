import React, { useEffect, useState, createContext, ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../UserMainDataTypes";
import { fetchData } from "../Api/apiService";

// Définition des types pour le contexte
type UserDataContextType = {
  userData: UserMainData | null;
  userActivity: UserActivity | null;
  averageSessions: UserAverageSessions | null;
  userPerformance: UserPerformance | null;
  error: string | null;
};

// Création du contexte avec des valeurs par défaut
export const UserDataContext = createContext<UserDataContextType>({
  userData: null,
  userActivity: null,
  averageSessions: null,
  userPerformance: null,
  error: null,
});

interface MainContentProps {
  children: ReactNode;
}

const UserDataProvider: React.FC<MainContentProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserMainData | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity | null>(null);
  const [averageSessions, setAverageSessions] =
    useState<UserAverageSessions | null>(null);
  const [userPerformance, setUserPerformance] =
    useState<UserPerformance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("User ID is missing");
      return;
    }

    const loadUserData = async () => {
      try {
        // Récupérer les informations principales de l'utilisateur
        const mainDataResponse = await fetchData<UserMainData>(`/user/${id}`);
        if (mainDataResponse.error) throw new Error(mainDataResponse.error);
        setUserData(mainDataResponse.data);

        console.log("Main Data Response:", mainDataResponse.data);

        // Récupérer l'activité de l'utilisateur
        const activityResponse = await fetchData<UserActivity>(
          `/user/${id}/activity`
        );
        if (activityResponse.error) throw new Error(activityResponse.error);
        setUserActivity(activityResponse.data);

        // Récupérer les sessions moyennes
        const averageSessionsResponse = await fetchData<UserAverageSessions>(
          `/user/${id}/average-sessions`
        );
        if (averageSessionsResponse.error)
          throw new Error(averageSessionsResponse.error);
        setAverageSessions(averageSessionsResponse.data);

        // Récupérer les performances de l'utilisateur
        const performanceResponse = await fetchData<UserPerformance>(
          `/user/${id}/performance`
        );
        if (performanceResponse.error)
          throw new Error(performanceResponse.error);
        setUserPerformance(performanceResponse.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadUserData();
  }, [id]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        userActivity,
        averageSessions,
        userPerformance,
        error,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
