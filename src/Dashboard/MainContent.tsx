import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../apiService"; // Assurez-vous que fetchData gère les requêtes API
import {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../UserMainDataTypes";

const MainContent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis l'URL
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

    // Récupérer les informations principales de l'utilisateur
    const loadUserData = async () => {
      const response = await fetchData<UserMainData>(`/user/${id}`);
      if (response.error) setError(response.error);
      else setUserData(response.data);
    };

    // Récupérer l'activité de l'utilisateur
    const loadUserActivity = async () => {
      const response = await fetchData<UserActivity>(`/user/${id}/activity`);
      if (response.error) setError(response.error);
      else setUserActivity(response.data);
    };

    // Récupérer les sessions moyennes
    const loadAverageSessions = async () => {
      const response = await fetchData<UserAverageSessions>(
        `/user/${id}/average-sessions`
      );
      if (response.error) setError(response.error);
      else setAverageSessions(response.data);
    };

    // Récupérer les performances de l'utilisateur
    const loadUserPerformance = async () => {
      const response = await fetchData<UserPerformance>(
        `/user/${id}/performance`
      );
      if (response.error) setError(response.error);
      else setUserPerformance(response.data);
    };

    // Exécuter les fonctions pour récupérer les données
    loadUserData();
    loadUserActivity();
    loadAverageSessions();
    loadUserPerformance();
  }, [id]); // Recharger les données si l'ID change

  return (
    <div>
      <h1>Main Content for User {id}</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>User Data</h2>
          {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}

          <h2>User Activity</h2>
          {userActivity && <pre>{JSON.stringify(userActivity, null, 2)}</pre>}

          <h2>Average Sessions</h2>
          {averageSessions && (
            <pre>{JSON.stringify(averageSessions, null, 2)}</pre>
          )}

          <h2>User Performance</h2>
          {userPerformance && (
            <pre>{JSON.stringify(userPerformance, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
