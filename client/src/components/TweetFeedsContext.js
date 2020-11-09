import React, { useEffect } from "react";

export const TweetFeedContext = React.createContext(null);

export const TweetFeedProvider = ({ children }) => {
  const [allTweets, setAllTweets] = React.useState([]);
  const [feedStatus, setFeedStatus] = React.useState("loading");
  const [tweetsObjects, setTweetsObjects] = React.useState({});

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
  }, []);

  return (
    <TweetFeedContext.Provider value={{ allTweets, tweetsObjects, feedStatus }}>
      {children}
    </TweetFeedContext.Provider>
  );
};
