import React, { useContext } from "react";
import moment from "moment";
import { FiMapPin, FiCalendar, FiLink } from "react-icons/fi";
import { ProfileContext } from "./ProfileContext";
import Avatar from "../Tweet/Avatar";
import SmallTweet from "../Tweet/SmallTweet";
import UnknownError from "../errors/UnknownError";
import Loading from "../Loading";

const Profile = ({ currentUser }) => {
  const {
    loadingProfile,
    loadingFeed,
    profileInfo,
    userFeed,
    feedDetails,
  } = useContext(ProfileContext);

  return (
    <>
      <div>
        {loadingProfile === "loading" && <Loading />}
        {loadingProfile === "error" && <UnknownError />}
        {loadingProfile === "success" && (
          <>
            <img src={profileInfo.bannerSrc} alt="" />
            <Avatar src={profileInfo.avatarSrc} width="100" alt="" />
            {profileInfo.handle !== currentUser &&
              (profileInfo.isBeingFollowedByYou ? (
                <button>Following</button>
              ) : (
                <button>Follow</button>
              ))}

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
            {profileInfo.url && (
              <>
                <FiLink />
                <p>{profileInfo.url}</p>
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
        {loadingFeed === "loading" && <Loading />}
        {loadingFeed === "error" && <UnknownError />}
        {loadingFeed === "success" &&
          userFeed.map((tweet) => {
            return (
              <SmallTweet
                key={tweet}
                tweetId={tweet}
                retweetFrom={feedDetails[tweet].retweetFrom}
                author={feedDetails[tweet].author}
                timestamp={feedDetails[tweet].timestamp}
                status={feedDetails[tweet].status}
                media={feedDetails[tweet].media}
                numLikes={feedDetails[tweet].numLikes}
                numRetweets={feedDetails[tweet].numRetweets}
                isLikedByUser={feedDetails[tweet].isLiked}
              />
            );
          })}
      </div>
    </>
  );
};

export default Profile;
