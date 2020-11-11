import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import ActionBar from "../Tweet/ActionBar";
import Avatar from "../Tweet/Avatar";
import Media from "../Tweet/Media";

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
  } = props;

  let history = useHistory();

  const handleTweetClick = (e) => {
    history.push(`/tweet/${tweetId}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    history.push(`/${author.handle}`);
  };

  const handleTweetKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      history.push(`/tweet/${tweetId}`);
    }
  };

  const handleProfileKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      history.push(`/${author.handle}`);
    }
  };

  return (
    <>
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
            <Avatar src={author.avatarSrc} width="50" />
          </AvatarContainer>
          <TweetContainer>
            <Bold
              tabIndex="0"
              onClick={(e) => handleProfileClick(e)}
              onKeyDown={(e) => handleProfileKeyPress(e)}
              aria-label="View profile"
              role="button"
            >
              {author.displayName}
            </Bold>
            @{author.handle}- {moment(timestamp).format("MMM Do")}
            <TweetContents>{status}</TweetContents>
            {media.length > 0 && (
              <Media src={media[0].url} maxwidth={450} maxheight={250} />
            )}
            <ActionBar
              numLikes={numLikes}
              numRetweets={numRetweets}
              tweetId={tweetId}
              isLikedByUser={isLikedByUser}
            />
          </TweetContainer>
        </AvatarAndTweetContainer>
        <Divider />
      </Wrapper>
    </>
  );
};

const AvatarAndTweetContainer = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  padding-right: 10px;
`;

const TweetContainer = styled.div``;

const RetweetContainer = styled.div`
  padding-left: 40px;
  padding-bottom: 10px;
`;

const Wrapper = styled.div`
  background: white;
  padding: 16px;
  max-width: 500px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
`;

const TweetContents = styled.div`
  font-size: 16px;
  padding: 16px 0;
`;

const Bold = styled.div`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: pink;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default SmallTweet;
