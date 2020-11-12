import React from "react";
import Icon from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import styled from "styled-components";

const UnknownError = () => {
  return (
    <>
      <Center>
        <Icon icon={bomb} size={50} />
        <h2>An unknown error has occurred.</h2>
        <p>
          Please try refreshing the page, or{" "}
          <a href="mailto:hello@meow.com">contact support</a> if the problem
          persists.
        </p>
      </Center>
    </>
  );
};

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  & > h2 {
    font-size: 1.3rem;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  & > p {
    font-size: 1rem;
  }
`;

export default UnknownError;
