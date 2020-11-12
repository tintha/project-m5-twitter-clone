import React from "react";
import styled, { keyframes } from "styled-components";

const LikeButton = () => {
  return <Wrapper />;
};

const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1.5);
  }
`;

const fade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const colorChange = keyframes`
from {
  background-color: #3b041e;
}
to {
  background-color: #db1f78;
}
`;

const Wrapper = styled.div`
  background-color: none;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  animation: ${scale} 500ms, ${fade} 500ms forwards, ${colorChange} 500ms;
`;

export default LikeButton;
