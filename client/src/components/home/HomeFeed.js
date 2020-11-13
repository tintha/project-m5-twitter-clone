import React, { useContext } from "react";
import styled from "styled-components";
import { TweetFeedContext } from "./TweetFeedsContext";
import SmallTweet from "../Tweet/SmallTweet";
import Form from "./Form";
import Loading from "../Loading";
import UnknownError from "../errors/UnknownError";
import { COLORS } from "../../constants";

const HomeFeed = (props) => {
  const {
    allTweets,
    feedStatus,
    status,
    setNewTweetPost,
    currentUserAvatar,
    currentUser,
  } = props;
  const { tweetsObjects } = useContext(TweetFeedContext);

  return (
    <>
      <PageHeader>Home</PageHeader>
      {status === "loading" && <Loading />}
      {status === "error" && <UnknownError />}
      {status === "success" && (
        <>
          <Form
            setNewTweetPost={setNewTweetPost}
            currentUserAvatar={currentUserAvatar}
            currentUser={currentUser}
          />

          {feedStatus === "loading" && <Loading />}
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
                    bio={tweetsObjects[tweet].author.bio}
                    numFollowing={tweetsObjects[tweet].author.numFollowing}
                    numFollowers={tweetsObjects[tweet].author.numFollowers}
                    isRetweetedByUser={tweetsObjects[tweet].isRetweeted}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid ${COLORS.grayBorder};
  margin-bottom: 10px;
  padding: 10px;
`;

export default HomeFeed;
