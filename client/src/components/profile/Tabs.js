import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../../constants";

const TabLinks = ({ currentProfile }) => {
  return (
    <Wrapper>
      <Tab exact to={`/${currentProfile}`}>
        <SingleTabWrapper>Tweet</SingleTabWrapper>
      </Tab>

      <Tab exact to={`/${currentProfile}/media`}>
        <SingleTabWrapper>Media</SingleTabWrapper>
      </Tab>

      <Tab exact to={`/${currentProfile}/likes`}>
        <SingleTabWrapper>Likes</SingleTabWrapper>
      </Tab>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SingleTabWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 30px;
`;

const Tab = styled(NavLink)`
  text-decoration: none;
  color: ${COLORS.grayText};
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  &:hover {
    border-bottom: 2px solid ${COLORS.primary};
  }
  &.active {
    color: ${COLORS.primary};
    border-bottom: 2px solid ${COLORS.primary};
  }
`;

export default TabLinks;
