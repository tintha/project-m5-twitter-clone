import React, { useContext } from "react";
import styled from "styled-components";
import { TweetFeedContext } from "./TweetFeedsContext";
import SmallTweet from "../Tweet/SmallTweet";
import Form from "./Form";
import { FiLoader } from "react-icons/fi";
import UnknownError from "../errors/UnknownError";

const HomeFeed = (props) => {
  const { allTweets, feedStatus, status, setNewTweetPost } = props;
  const { tweetsObjects } = useContext(TweetFeedContext);

  return (
    <Wrapper>
      {status === "loading" && <FiLoader />}
      {status === "error" && <UnknownError />}
      {status === "success" && <Form setNewTweetPost={setNewTweetPost} />}

      {feedStatus === "loading" && <FiLoader />}
      {feedStatus === "error" && <UnknownError />}
      {feedStatus === "success" && (
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
                isLikedByUser={tweetsObjects[tweet].isLiked}
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
