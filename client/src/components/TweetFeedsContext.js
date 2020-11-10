import React, { useEffect } from "react";

export const TweetFeedContext = React.createContext(null);

export const TweetFeedProvider = ({ children }) => {
  const [allTweets, setAllTweets] = React.useState([]);
  const [feedStatus, setFeedStatus] = React.useState("loading");
  const [tweetsObjects, setTweetsObjects] = React.useState({});
  const [newTweetPost, setNewTweetPost] = React.useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllTweets([...data.tweetIds]);
        setTweetsObjects({ ...data.tweetsById });
        setFeedStatus("iddle");
      });

    return function cleanup() {
      setFeedStatus("loading");
      setNewTweetPost(false);
    };
  }, [newTweetPost]);

  return (
    <TweetFeedContext.Provider
      value={{ allTweets, tweetsObjects, feedStatus, setNewTweetPost }}
    >
      {children}
    </TweetFeedContext.Provider>
  );
};
