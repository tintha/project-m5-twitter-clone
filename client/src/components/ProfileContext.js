import React from "react";
import { useParams } from "react-router";

export const ProfileContext = React.createContext(null);

export const ProfileProvider = ({ children }) => {
  const params = useParams();
  const [loadingProfile, setLoadingProfile] = React.useState("loading");
  const [loadingFeed, setLoadingFeed] = React.useState("loading");
  const [profileInfo, setProfileInfo] = React.useState({});
  const [userFeed, setUserFeed] = React.useState([]);
  const [feedDetails, setFeedDetails] = React.useState({});

  React.useEffect(() => {
    fetch(`/api/${params.profile}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileInfo({ ...data.profile });
        setLoadingProfile("iddle");
      });
  }, [params.profile]);

  React.useEffect(() => {
    fetch(`/api/${params.profile}/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserFeed([...data.tweetIds]);
        setFeedDetails({ ...data.tweetsById });
        setLoadingFeed("iddle");
      });
  }, [params.profile]);

  return (
    <ProfileContext.Provider
      value={{
        loadingProfile,
        loadingFeed,
        profileInfo,
        userFeed,
        feedDetails,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
