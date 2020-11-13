import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../../constants";
import { ProfileContext } from "./ProfileContext";

const TabLinks = () => {
  const { profileInfo } = useContext(ProfileContext);
  return (
    <Wrapper>
      <Tab exact to={`/${profileInfo.handle}/followers`}>
        <SingleTabWrapper>Followers</SingleTabWrapper>
      </Tab>

      <Tab exact to={`/${profileInfo.handle}/following`}>
        <SingleTabWrapper>Following</SingleTabWrapper>
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
