import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetFeedContext } from "./TweetFeedsContext";
import Tweet from "./Tweet/Tweet";

const HomeFeed = () => {
  const { status } = useContext(CurrentUserContext);
  const { allTweets, feedStatus } = useContext(TweetFeedContext);

  return (
    <Wrapper>
      {status === "loading" ? (
        <p>...loading</p>
      ) : (
        <>
          <ContentTitle>Home Feed</ContentTitle>
        </>
      )}

      {feedStatus === "loading" ? (
        <p>...loading</p>
      ) : (
        <>
          {allTweets.map((tweet) => {
            return <Tweet key={tweet} tweetId={tweet} />;
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: #000;
  font-weight: bold;
`;

export default HomeFeed;
