import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TweetFeedContext } from "./TweetFeedsContext";
import SmallTweet from "./Tweet/SmallTweet";

const HomeFeed = (props) => {
  const { allTweets, feedStatus, status } = props;
  const { tweetsObjects } = useContext(TweetFeedContext);
  const [likedByUser, setLikedByUser] = useState(null);

  return (
    <Wrapper>
      {status === "loading" && <p>...loading</p>}

      {feedStatus === "loading" ? (
        <p>...loading</p>
      ) : (
        <>
          {allTweets.map((tweet) => {
            return (
              <SmallTweet
                key={tweet}
                tweetId={tweet}
                retweetFrom={tweetsObjects[tweet].retweetFrom}
                author={tweetsObjects[tweet].author}
                timestamp={tweetsObjects[tweet].timestamp}
                status={tweetsObjects[tweet].status}
                media={tweetsObjects[tweet].media}
                numLikes={tweetsObjects[tweet].numLikes}
                numRetweets={tweetsObjects[tweet].numRetweets}
                isLiked={tweetsObjects[tweet].isLiked}
              />
            );
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
