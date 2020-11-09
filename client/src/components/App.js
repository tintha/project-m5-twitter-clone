import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./Tweet/TweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

function App() {
  return (
    <Main>
      <Router>
        <Sidebar />
        <Content>
          <Switch>
            <Route exact path="/">
              <HomeFeed />
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
              <Profile />
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
