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
              {allTweets.map((tweetId) => {
                const {
                  retweetFrom,
                  author,
                  timestamp,
                  status,
                  media,
                  numLikes,
                  numRetweets,
                  isLiked,
                  isRetweeted,
                } = tweetsObjects[tweetId];
                return (
                  <SmallTweet
                    key={tweetId}
                    tweetId={tweetId}
                    retweetFrom={retweetFrom || null}
                    author={author}
                    timestamp={timestamp}
                    status={status}
                    media={media}
                    numLikes={numLikes}
                    numRetweets={numRetweets}
                    isLikedByUser={isLiked}
                    bio={author.bio}
                    numFollowing={author.numFollowing}
                    numFollowers={author.numFollowers}
                    isRetweetedByUser={isRetweeted}
                    currentProfile={null}
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
