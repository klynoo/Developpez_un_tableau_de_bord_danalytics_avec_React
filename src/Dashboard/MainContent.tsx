import React, { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import DailyActivity from "../DailyActivity";

const MainContent = () => {
  const { userData, error } = useContext(UserDataContext);

  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>Loading...</p>;

  const { id, userInfos, todayScore } = userData;

  return (
    <div>
      <h1>
        {userInfos.firstName}'s Profile (ID: {id})
      </h1>
      <p>Age: {userInfos.age}</p>
      <p>Score: {todayScore}</p>

      {/* <DailyActivity data={userData} /> */}
    </div>
  );
};

export default MainContent;
