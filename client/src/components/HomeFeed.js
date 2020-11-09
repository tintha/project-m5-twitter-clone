import React from "react";
import styled from "styled-components";

import Tweet from "./Tweet/Tweet";

const HomeFeed = (props) => {
  const { allTweets, feedStatus, status } = props;

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
