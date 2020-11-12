import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import ActionBar from "../Tweet/ActionBar";
import Avatar from "../Tweet/Avatar";
import Media from "../Tweet/Media";
import { COLORS } from "../../constants";

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
            <Header>
              <Bold
                tabIndex="0"
                onClick={(e) => handleProfileClick(e)}
                onKeyDown={(e) => handleProfileKeyPress(e)}
                aria-label="View profile"
                role="button"
              >
                {author.displayName}
              </Bold>
              <HandleAndDate>
                <p>
                  @{author.handle} · {moment(timestamp).format("MMM Do")}
                </p>
              </HandleAndDate>
            </Header>
            <TweetContents>{status}</TweetContents>
            {media.length > 0 && (
              <Media src={media[0].url} maxwidth={508} maxheight={270} />
            )}
            <ActionBar
              numLikes={numLikes}
              numRetweets={numRetweets}
              tweetId={tweetId}
              isLikedByUser={isLikedByUser}
            />
          </TweetContainer>
        </AvatarAndTweetContainer>
      </Wrapper>
    </>
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
  padding: 16px 0;
`;

export default SmallTweet;
