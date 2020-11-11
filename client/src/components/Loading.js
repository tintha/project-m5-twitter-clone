import React from "react";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return <Wrapper></Wrapper>;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled(FiLoader)`
  animation: ${rotate} 1s linear infinite;
`;

export default Loading;
