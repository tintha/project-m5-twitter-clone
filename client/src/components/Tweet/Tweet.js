import React, { useContext } from "react";
import styled from "styled-components";
import { TweetFeedContext } from "../TweetFeedsContext";
import ActionBar from "./ActionBar";
import { FiRepeat } from "react-icons/fi";
import Avatar from "./Avatar";
import Media from "./Media";
import moment from "moment";
import { Link } from "react-router-dom";

const Tweet = ({ tweetId }) => {
  const { tweetsObjects } = useContext(TweetFeedContext);
  const { id, status, timestamp, author, media, retweetFrom } = tweetsObjects[
    tweetId
  ];

  return (
    <>
      <TweetLink to={`/tweet/${id}`} key={id}>
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
              <Bold>{author.displayName}</Bold> @{author.handle} -{" "}
              {moment(timestamp).format("MMM Do")}
              <TweetContents>{status}</TweetContents>
              {media.length > 0 && (
                <Media src={media[0].url} maxwidth={450} maxheight={250} />
              )}
              <ActionBar />
            </TweetContainer>
          </AvatarAndTweetContainer>
          <Divider />
        </Wrapper>
      </TweetLink>
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
