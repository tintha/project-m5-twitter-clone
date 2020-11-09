import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { TweetFeedProvider } from "./components/TweetFeedsContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <CurrentUserProvider>
      <TweetFeedProvider>
        <App />
      </TweetFeedProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
