import React, { useContext, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

const Profile = ({ currentUser }) => {
  const {
    loadingProfile,
    loadingFeed,
    profileInfo,
    userFeed,
    feedDetails,
  } = useContext(ProfileContext);
  const [numberFollowing, setNumberFollowing] = useState(null);
  const [numberFollower, setNumberFollowers] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (loadingFeed === "success") {
      setNumberFollowing(profileInfo.numFollowing);
      setNumberFollowers(profileInfo.numFollowers);
      setIsFollowing(profileInfo.isBeingFollowedByYou);
    }
  }, [
    loadingFeed,
    profileInfo.numFollowing,
    profileInfo.numFollowers,
    profileInfo.isBeingFollowedByYou,
  ]);

  const handleClickFollow = (e) => {
    fetch(`/api/${profileInfo.handle}/follow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setNumberFollowers(numberFollower + 1);
          setIsFollowing(!isFollowing);
        } else if (resp.error) {
          console.log(resp.error);
        }
      });
  };

  const handleClickUnfollow = (e) => {
    fetch(`/api/${profileInfo.handle}/unfollow`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setNumberFollowers(numberFollower - 1);
          setIsFollowing(!isFollowing);
        } else if (resp.error) {
          console.log(resp.error);
        }
      });
  };

  const unfollowBtn = React.useRef(null);

  const handleMouseEnterUnfollow = () => {
    unfollowBtn.current.innerText = "Unfollow";
  };

  const handleMouseLeaveUnfollow = () => {
    unfollowBtn.current.innerText = "Following";
  };

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
              (isFollowing ? (
                <FollowingButton
                  onClick={() => handleClickUnfollow()}
                  onMouseEnter={() => handleMouseEnterUnfollow()}
                  onMouseLeave={() => handleMouseLeaveUnfollow()}
                  ref={unfollowBtn}
                >
                  Following
                </FollowingButton>
              ) : (
                <FollowButton onClick={() => handleClickFollow()}>
                  Follow
                </FollowButton>
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
                {numberFollowing > 0 ? (
                  <>
                    <StyledLink to={`/${profileInfo.handle}/following`}>
                      <Bold>{numberFollowing}</Bold>
                      <OptionalDetails>Following</OptionalDetails>
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <Bold>{numberFollowing}</Bold>
                    <OptionalDetails>Following</OptionalDetails>
                  </>
                )}
              </FollowingFollowers>
              <FollowingFollowers>
                {numberFollower > 0 ? (
                  <>
                    <StyledLink to={`/${profileInfo.handle}/followers`}>
                      <Bold>{numberFollower}</Bold>
                      <OptionalDetails>Followers</OptionalDetails>
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <Bold>{numberFollower}</Bold>
                    <OptionalDetails>Followers</OptionalDetails>
                  </>
                )}
              </FollowingFollowers>
            </Followers>
          </ProfileInfos>

          {loadingFeed === "loading" && <Loading />}
          {loadingFeed === "error" && <UnknownError />}
          {loadingFeed === "success" && (
            <TabLinks currentProfile={profileInfo.handle}></TabLinks>
          )}
          {loadingFeed === "success" &&
            userFeed.map((tweetId) => {
              const {
                retweetFrom,
                author,
                timestamp,
                status,
                media,
                numLikes,
                numRetweets,
                isLiked,
                isRetweeted,
              } = feedDetails[tweetId];
              return (
                <SmallTweet
                  key={tweetId}
                  tweetId={tweetId}
                  retweetFrom={retweetFrom || null}
                  author={author}
                  timestamp={timestamp}
                  status={status}
                  media={media}
                  numLikes={numLikes}
                  numRetweets={numRetweets}
                  isLikedByUser={isLiked}
                  bio={author.bio}
                  numFollowing={author.numFollowing}
                  numFollowers={author.numFollowers}
                  isRetweetedByUser={isRetweeted}
                  currentProfile={profileInfo.handle}
                />
              );
            })}
        </>
      )}
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
  background-color: #fff;
  color: ${COLORS.primary};
  padding: 6px 16px 6px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid ${COLORS.primary};
  cursor: pointer;
  margin-right: 10px;
  outline: none;
  width: 120px;
  &:hover {
    color: #fff;
    background-color: ${COLORS.primary};
  }
  &:focus {
    color: ${COLORS.primary};
    background-color: ${COLORS.grayBorder};
  }
`;

const FollowingButton = styled.button`
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 6px 16px 6px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border: 1px solid ${COLORS.primary};
  width: 120px;
  outline: none;
  &:hover {
    color: ${COLORS.primary};
    background-color: #fff;
  }
  &:focus {
    color: ${COLORS.primary};
    background-color: ${COLORS.grayBorder};
  }
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

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Profile;
