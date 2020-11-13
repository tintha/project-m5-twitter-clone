import React from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Tooltip = ({
  displayName,
  handle,
  avatar,
  bio,
  numFollowing,
  numFollowers,
  children,
}) => {
  return (
    <Tippy
      delay={1000}
      content={
        <Wrapper>
          <Avatar src={avatar} width="50" />
          <Bold>{displayName}</Bold>@{handle}
          <Text>{bio}</Text>
          <Text>
            <BoldSpan>{numFollowing}</BoldSpan> Following -{" "}
            <BoldSpan>{numFollowers}</BoldSpan> Followers
          </Text>
        </Wrapper>
      }
    >
      {children}
    </Tippy>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  left: 50%;
  width: 300px;
  height: 200px;
  border: 1px solid black;
  background-color: #fff;
  padding: 20px;
`;

const Bold = styled.p`
  font-weight: bold;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;
const Text = styled.p`
  margin-top: 10px;
`;

export default Tooltip;
