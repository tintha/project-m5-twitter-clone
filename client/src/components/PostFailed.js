import React from "react";
import Icon from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const PostFailed = () => {
  return (
    <>
      <Icon icon={bomb} />
      <h1>An error has occurred.</h1>
      <p>Tweet not sent, please try again.</p>
    </>
  );
};

export default PostFailed;
