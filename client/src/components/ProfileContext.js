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
    if (params.profile) {
      fetch(`/api/${params.profile}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfileInfo({ ...data.profile });
          setLoadingProfile("success");
        })
        .catch((error) => {
          setLoadingProfile("error");
        });

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
          setLoadingFeed("success");
        })
        .catch((error) => {
          setLoadingFeed("error");
        });
    }

    return function cleanup() {
      setLoadingProfile("loading");
      setLoadingFeed("loading");
    };
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
