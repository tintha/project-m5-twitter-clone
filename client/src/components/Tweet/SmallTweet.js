import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import ActionBar from "../Tweet/ActionBar";
import Avatar from "../Tweet/Avatar";
import Media from "../Tweet/Media";
import { COLORS } from "../../constants";
import Tooltip from "./Tooltip";
import { ProfileContext } from "../profile/ProfileContext";

const SmallTweet = (props) => {
  const {
    tweetId,
    retweetFrom,
    author,
    timestamp,
    status,
    media,
    numLikes,
    numRetweets,
    isLikedByUser,
    bio,
    numFollowing,
    numFollowers,
    isRetweetedByUser,
  } = props;
  const { profileInfo } = useContext(ProfileContext);

  let history = useHistory();

  const handleTweetClick = (e) => {
    history.push(`/tweet/${tweetId}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    author.handle === profileInfo.handle
      ? window.scrollTo(0, 0)
      : history.push(`/${author.handle}`);
  };

  const handleTweetKeyPress = (e) => {
    if (e.code === "Enter") {
      history.push(`/tweet/${tweetId}`);
    }
  };

  const handleProfileKeyPress = (e) => {
    if (e.code === "Enter") {
      e.stopPropagation();
      author.handle === profileInfo.handle
        ? window.scrollTo(0, 0)
        : history.push(`/${author.handle}`);
    }
  };

  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => handleTweetClick(e)}
      onKeyDown={(e) => handleTweetKeyPress(e)}
      aria-label="View tweet"
      role="button"
    >
      <RetweetContainer>
        {retweetFrom && (
          <>
            <FiRepeat /> <span>{retweetFrom.displayName} Remeowed</span>
          </>
        )}
      </RetweetContainer>
      <AvatarAndTweetContainer>
        <AvatarContainer>
          <Avatar src={author.avatarSrc} width="50" alt={author.handle} />
        </AvatarContainer>
        <TweetContainer>
          <Header>
            <Tooltip
              displayName={author.displayName}
              handle={author.handle}
              avatar={author.avatarSrc}
              bio={bio}
              numFollowing={numFollowing}
              numFollowers={numFollowers}
            >
              <Bold
                tabIndex="0"
                onClick={(e) => handleProfileClick(e)}
                onKeyDown={(e) => handleProfileKeyPress(e)}
                aria-label="View profile"
                role="button"
              >
                {author.displayName}
              </Bold>
            </Tooltip>
            <HandleAndDate>
              @{author.handle} · {moment(timestamp).format("MMM Do")}
            </HandleAndDate>
          </Header>
          <TweetContents>{status}</TweetContents>
          {media && media.length > 0 && (
            <Media
              src={media[0].url}
              maxwidth={508}
              maxheight={270}
              alt={status}
            />
          )}
          <ActionBar
            numLikes={numLikes}
            numRetweets={numRetweets}
            tweetId={tweetId}
            isLikedByUser={isLikedByUser}
            retweetFrom={retweetFrom}
            isRetweetedByUser={isRetweetedByUser}
          />
        </TweetContainer>
      </AvatarAndTweetContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  width: 100%;
  padding: 10px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLORS.grayBorder};
  &:hover {
    cursor: pointer;
  }
`;

const RetweetContainer = styled.div`
  padding-left: 40px;
  padding-bottom: 10px;
`;

const AvatarAndTweetContainer = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  padding-right: 10px;
`;

const TweetContainer = styled.div``;

const Header = styled.div`
  display: flex;
`;

const HandleAndDate = styled.div`
  margin-left: 10px;
`;

const Bold = styled.div`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const TweetContents = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default SmallTweet;
