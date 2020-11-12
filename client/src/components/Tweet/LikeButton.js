import React from "react";
import styled, { keyframes } from "styled-components";
import { FiHeart } from "react-icons/fi";
import { COLORS } from "../../constants";

const LikeButton = (props) => {
  const { handleToggleLike, handleLikeKeyPress, isLikedByUser } = props;
  console.log(isLikedByUser);
  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => handleToggleLike(e)}
      onKeyDown={(e) => handleLikeKeyPress(e)}
      aria-label="Like or unlike"
      role="button"
    >
      {isLikedByUser ? (
        <FiHeart fill="#f0226a" stroke="#f0226a" />
      ) : (
        <FiHeart />
      )}
    </Wrapper>
  );
};

const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  display: block;
  border: none;
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: pink;
  }
  &:focus {
    color: #fff;
    background-color: pink;
    outline: none;
  }
`;

const Animate = styled.div`
  display: block;
  border: none;
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: pink;
    animation: ${scale} 1s;
  }
  &:focus {
    color: #fff;
    background-color: pink;
    outline: none;
  }
`;

export default LikeButton;
