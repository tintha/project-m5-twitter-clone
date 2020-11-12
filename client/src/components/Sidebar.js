import React, { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";
import { COLORS } from "../constants";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { CurrentUserContext } from "./home/CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <Link to="/">
        <Logo style={{ width: "40px" }} />
      </Link>

      <SingleLinkContainer>
        <NavigationLink exact to="/">
          <FiHome />
          <LinkText>Home</LinkText>
        </NavigationLink>
      </SingleLinkContainer>
      <SingleLinkContainer>
        <NavigationLink exact to={`/${currentUser}`}>
          <FiUser />
          <LinkText>Profile</LinkText>
        </NavigationLink>
      </SingleLinkContainer>
      <SingleLinkContainer>
        <NavigationLink exact to="/notifications">
          <FiBell />
          <LinkText>Notifications</LinkText>
        </NavigationLink>
      </SingleLinkContainer>
      <SingleLinkContainer>
        <NavigationLink exact to="/bookmarks">
          <FiBookmark />
          <LinkText>Bookmarks</LinkText>
        </NavigationLink>
      </SingleLinkContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 160px;
`;

const SingleLinkContainer = styled.div`
  display: flex;
  padding: 2px;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: #000;
  display: block;
  border-radius: 1rem;
  padding: 10px;

  &:hover {
    background-color: ${COLORS.secondary};
  }
  &.active {
    color: ${COLORS.primary};
  }
`;

const LinkText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 10px;
`;

export default Sidebar;
