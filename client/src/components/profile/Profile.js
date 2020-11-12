import React, { useContext } from "react";
import moment from "moment";
import styled from "styled-components";
import { FiMapPin, FiCalendar, FiLink } from "react-icons/fi";
import { ProfileContext } from "./ProfileContext";
import Avatar from "../Tweet/Avatar";
import SmallTweet from "../Tweet/SmallTweet";
import UnknownError from "../errors/UnknownError";
import Loading from "../Loading";
import { COLORS } from "../../constants";
import TabLinks from "./Tabs";

const Profile = ({ currentUser }) => {
  const {
    loadingProfile,
    loadingFeed,
    profileInfo,
    userFeed,
    feedDetails,
  } = useContext(ProfileContext);

  return (
    <ProfileWholeContainer>
      {loadingProfile === "loading" && <Loading />}
      {loadingProfile === "error" && <UnknownError />}
      {loadingProfile === "success" && (
        <>
          <Banner bannerSrc={profileInfo.bannerSrc}>
            <AvatarDiv>
              <Avatar
                src={profileInfo.avatarSrc}
                width="100"
                alt={`${profileInfo.handle} avatar`}
              />
            </AvatarDiv>
          </Banner>

          <FollowButtonDiv>
            {profileInfo.handle !== currentUser &&
              (profileInfo.isBeingFollowedByYou ? (
                <FollowButton>Following</FollowButton>
              ) : (
                <FollowButton>Follow</FollowButton>
              ))}
          </FollowButtonDiv>
          <ProfileInfos>
            <DisplayName>{profileInfo.displayName}</DisplayName>
            <Handle>
              @{profileInfo.handle}
              {profileInfo.handle !== currentUser &&
                profileInfo.isFollowingYou && (
                  <FollowsYou>Follows you</FollowsYou>
                )}
            </Handle>
            <Bio>{profileInfo.bio}</Bio>
            <MoreDetails>
              {profileInfo.location && (
                <Location>
                  <FiMapPin />
                  <OptionalDetails>{profileInfo.location}</OptionalDetails>
                </Location>
              )}
              {profileInfo.url && (
                <Website>
                  <FiLink />
                  <OptionalDetails>{profileInfo.url}</OptionalDetails>
                </Website>
              )}
              <Joined>
                <FiCalendar />
                <OptionalDetails>
                  Joined {moment(profileInfo.joined).format("MMMM YYYY")}
                </OptionalDetails>
              </Joined>
            </MoreDetails>
            <Followers>
              <FollowingFollowers>
                <Bold>{profileInfo.numFollowing}</Bold>
                <OptionalDetails>Following</OptionalDetails>
              </FollowingFollowers>
              <FollowingFollowers>
                <Bold>{profileInfo.numFollowers}</Bold>
                <OptionalDetails>Followers</OptionalDetails>
              </FollowingFollowers>
            </Followers>
          </ProfileInfos>
        </>
      )}

      {loadingFeed === "loading" && <Loading />}
      {loadingFeed === "error" && <UnknownError />}
      {loadingFeed === "success" && (
        <TabLinks currentProfile={profileInfo.handle}></TabLinks>
      )}
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
    </ProfileWholeContainer>
  );
};

const ProfileWholeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileInfos = styled.div`
  padding: 20px;
`;

const Banner = styled.div`
  background-image: url(${(props) => props.bannerSrc});
  width: 100%;
  height: 200px;
  background-size: cover;
  position: relative;
`;

const AvatarDiv = styled.div`
  position: absolute;
  top: 140px;
  left: 14px;
  border: 5px solid #fff;
  border-radius: 50%;
`;

const FollowButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80px;
`;

const FollowButton = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 6px 16px 6px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const DisplayName = styled.div`
  font-size: 1rem;
  color: #000;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Handle = styled.div`
  color: ${COLORS.grayText};
`;

const FollowsYou = styled.span`
  background-color: ${COLORS.lightGray};
  margin-left: 10px;
  border-radius: 6px;
  padding: 2px;
  color: ${COLORS.grayText};
`;

const Bio = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MoreDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  color: ${COLORS.grayText};
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Website = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Joined = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OptionalDetails = styled.span`
  color: ${COLORS.grayText};
  margin-left: 4px;
  margin-right: 8px;
`;

const Followers = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowingFollowers = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

export default Profile;
