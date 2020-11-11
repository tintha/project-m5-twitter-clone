import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./home/HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./Tweet/TweetDetails";
import Profile from "./profile/Profile";
import Sidebar from "./Sidebar";

import { CurrentUserContext } from "./home/CurrentUserContext";
import { TweetFeedContext } from "./home/TweetFeedsContext";
import { ProfileProvider } from "./profile/ProfileContext";

function App() {
  const { status, currentUser } = useContext(CurrentUserContext);
  const { allTweets, feedStatus, setNewTweetPost } = useContext(
    TweetFeedContext
  );

  return (
    <Main>
      <Router>
        <Sidebar />
        <Content>
          <Switch>
            <Route exact path="/">
              <h1>Home</h1>
              <HomeFeed
                status={status}
                allTweets={allTweets}
                feedStatus={feedStatus}
                setNewTweetPost={setNewTweetPost}
              />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profile">
              <ProfileProvider>
                <Profile currentUser={currentUser} />
              </ProfileProvider>
            </Route>
          </Switch>
        </Content>
      </Router>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
`;

const Content = styled.div``;

export default App;
