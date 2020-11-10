import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
      <Wrapper>
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
            <Anchor to={`/${author.handle}`} key={author.handle}>
              <Bold>{author.displayName}</Bold> @{author.handle}
            </Anchor>
            - {moment(timestamp).format("MMM Do")}
            <Anchor to={`/tweet/${tweetId}`} key={tweetId}>
              <TweetContents>{status}</TweetContents>
              {media.length > 0 && (
                <Media src={media[0].url} maxwidth={450} maxheight={250} />
              )}
            </Anchor>
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

const Bold = styled.span`
  font-weight: bold;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const Anchor = styled(Link)`
  text-decoration: none;
`;

export default SmallTweet;
