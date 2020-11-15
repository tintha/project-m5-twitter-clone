import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./home/HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./Tweet/TweetDetails";
import Profile from "./profile/Profile";
import Sidebar from "./Sidebar";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./home/CurrentUserContext";
import { ProfileProvider } from "./profile/ProfileContext";
import Followers from "./profile/Followers";
import Following from "./profile/Following";
import FollowerTabs from "./profile/FollowersTabs";
import PageHeader from "./profile/PageHeader";

function App() {
  const { currentUser } = useContext(CurrentUserContext);

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
              <ProfileProvider>
                <Profile currentUser={currentUser} />
              </ProfileProvider>
            </Route>
            <Route exact path="/:profile/followers">
              <ProfileProvider>
                <PageHeader />
                <FollowerTabs />
                <Followers />
              </ProfileProvider>
            </Route>
            <Route exact path="/:profile/following">
              <ProfileProvider>
                <PageHeader />
                <FollowerTabs />
                <Following />
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
  justify-content: center;
  width: 790px;
  margin: auto;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLORS.grayBorder};
  border-right: 1px solid ${COLORS.grayBorder};
  width: 630px;
`;

export default App;
