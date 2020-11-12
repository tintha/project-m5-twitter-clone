import React from "react";
import Icon from "react-icons-kit";
import styled from "styled-components";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const PostFailed = () => {
  return (
    <Wrapper>
      <Icon icon={bomb} size={25} />
      <span>An error has occurred. Tweet not sent, please try again.</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  color: red;
  font-weight: bold;
`;

export default PostFailed;
