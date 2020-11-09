import React from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

const ActionBar = () => {
  return (
    <Wrapper>
      <FiMessageCircle />
      <FiRepeat />
      <FiHeart />
      <FiUpload />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default ActionBar;
