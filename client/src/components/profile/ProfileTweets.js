import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import { ProfileContext } from "../ProfileContext";
import ActionBar from "../Tweet/ActionBar";
import Avatar from "../Tweet/Avatar";
import Media from "../Tweet/Media";

const Tweet = ({ tweetId }) => {
  const { feedDetails } = useContext(ProfileContext);
  const tweet = feedDetails[tweetId];

  return (
    <>
      <Wrapper>
        <RetweetContainer>
          {tweet.retweetFrom && (
            <>
              <FiRepeat /> <span>{tweet.retweetFrom.displayName} Remeowed</span>
            </>
          )}
        </RetweetContainer>
        <AvatarAndTweetContainer>
          <AvatarContainer>
            <Avatar src={tweet.author.avatarSrc} width="50" />
          </AvatarContainer>
          <TweetContainer>
            <TweetLink to={`/${tweet.author.handle}`} key={tweet.author.handle}>
              <Bold>{tweet.author.displayName}</Bold> @{tweet.author.handle}
            </TweetLink>
            - {moment(tweet.timestamp).format("MMM Do")}
            <TweetLink to={`/tweet/${tweetId}`} key={tweetId}>
              <TweetContents>{tweet.status}</TweetContents>
              {tweet.media.length > 0 && (
                <Media
                  src={tweet.media[0].url}
                  maxwidth={450}
                  maxheight={250}
                />
              )}
            </TweetLink>
            <ActionBar />
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

const TweetLink = styled(Link)`
  text-decoration: none;
`;

export default Tweet;
