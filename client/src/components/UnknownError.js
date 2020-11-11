import React from "react";
import Icon from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const UnknownError = () => {
  return (
    <>
      <Icon icon={bomb} />
      <h1>An unknown error has occurred.</h1>
      <p>
        Please try refreshing the page, or contact support if the problem
        persists.
      </p>
    </>
  );
};

export default UnknownError;
