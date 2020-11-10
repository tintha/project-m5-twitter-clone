import React from "react";
import styled from "styled-components";

import Tweet from "./Tweet/Tweet";

const HomeFeed = (props) => {
  const { allTweets, feedStatus, status } = props;

  return (
    <Wrapper>
      {status === "loading" && <p>...loading</p>}

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

export default HomeFeed;
