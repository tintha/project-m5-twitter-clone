import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { ProfileContext } from "../ProfileContext";
import Avatar from "../Tweet/Avatar";
import ProfileTweets from "./ProfileTweets";

const Profile = ({ currentUser }) => {
  const { loadingProfile, loadingFeed, profileInfo, userFeed } = useContext(
    ProfileContext
  );

  return (
    <>
      <div>
        {loadingProfile === "loading" ? (
          <p>...loading</p>
        ) : (
          <>
            <img src={profileInfo.bannerSrc} alt="" />
            <Avatar src={profileInfo.avatarSrc} width="100" alt="" />
            <p>{profileInfo.displayName}</p>
            <p>@{profileInfo.handle}</p>
            {profileInfo.handle !== currentUser &&
              profileInfo.isFollowingYou && <p>Follows you</p>}
            <p>{profileInfo.bio}</p>
            {profileInfo.location && (
              <>
                <FiMapPin />
                <p>{profileInfo.location}</p>
              </>
            )}
            <FiCalendar />
            <p>Joined {moment(profileInfo.joined).format("MMMM YYYY")}</p>
            <p>
              {profileInfo.numFollowing} Following {profileInfo.numFollowers}{" "}
              Followers
            </p>
          </>
        )}
      </div>

      <div>
        <h3>Tweets</h3>
        {loadingFeed === "loading" ? (
          <p>...loading</p>
        ) : (
          userFeed.map((tweet) => {
            return <ProfileTweets key={tweet} tweetId={tweet} />;
          })
        )}
      </div>
    </>
  );
};

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default Profile;
