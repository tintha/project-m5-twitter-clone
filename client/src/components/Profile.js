import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const Profile = () => {
  const params = useParams();
  const [loadingProfile, setLoadingProfile] = useState("loading");
  const [loadingFeed, setLoadingFeed] = useState("loading");
  const [profileInfo, setProfileInfo] = useState({});
  const [userFeed, setUserFeed] = useState([]);
  const [feedDetails, setFeedDetails] = useState({});

  useEffect(() => {
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

  useEffect(() => {
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
    <>
      <div>
        Profile of {profileInfo.displayName} - @{profileInfo.handle}
        {profileInfo.timestamp}
      </div>
      <div>
        {loadingFeed !== "loading" &&
          userFeed.map((tweet) => {
            return <p key={tweet}>{feedDetails[tweet].status}</p>;
          })}
      </div>
    </>
  );
};

export default Profile;
