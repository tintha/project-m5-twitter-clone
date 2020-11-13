import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiUpload, FiHeart } from "react-icons/fi";
import LikeButton from "./LikeButton";
import { CurrentUserContext } from "../home/CurrentUserContext";

const ActionBar = (props) => {
  const { tweetId, numLikes, numRetweets, isLikedByUser, retweetFrom } = props;
  const [numberOfLikes, setNumberOfLikes] = useState(numLikes);
  const [likedByUser, setLikedByUser] = useState(isLikedByUser);
  const [numberOfRetweets, setNumberOfRetweets] = useState(numRetweets);
  const { currentUser } = useContext(CurrentUserContext);
  const [animate, setAnimate] = useState(false);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    setAnimate(true);
    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !likedByUser }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setLikedByUser(!likedByUser);
          likedByUser === true
            ? setNumberOfLikes(numberOfLikes - 1)
            : setNumberOfLikes(numberOfLikes + 1);
        } else if (resp.error) {
          console.log(resp.error);
        }
      });
  };

  const handleLikeKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleToggleLike(e);
    }
  };

  const handleClickVoid = (e) => {
    e.stopPropagation();
    console.log("Does nothing for now");
  };

  const handleKeyDownVoid = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleClickVoid(e);
    }
  };

  return (
    <Wrapper>
      <ActionDiv>
        <ActionButton
          tabIndex="0"
          onClick={(e) => handleClickVoid(e)}
          onKeyDown={(e) => handleKeyDownVoid(e)}
          aria-label="Reply to tweet"
          role="button"
          color="#b8e6f5"
          darkcolor="#0c7f96"
        >
          <FiMessageCircle />
        </ActionButton>
      </ActionDiv>
      <ActionDiv>
        <ActionButton
          tabIndex="0"
          onClick={(e) => handleClickVoid(e)}
          onKeyDown={(e) => handleKeyDownVoid(e)}
          aria-label="Retweet"
          role="button"
          color="#b5ebb6"
          darkcolor="#759c5f"
        >
          {retweetFrom && retweetFrom.handle === currentUser ? (
            <FiRepeat stroke="#759c5f" />
          ) : (
            <FiRepeat />
          )}
        </ActionButton>
        {numberOfRetweets > 0 && <Number>{numberOfRetweets}</Number>}
      </ActionDiv>
      <ActionDiv>
        <ActionButton
          tabIndex="0"
          onClick={(e) => handleToggleLike(e)}
          onKeyDown={(e) => handleLikeKeyPress(e)}
          aria-label="Like or unlike"
          role="button"
          color="#f5bae2"
          darkcolor="#a12561"
        >
          {likedByUser ? (
            <FiHeart fill="#f0226a" stroke="#f0226a" style={{ zIndex: 1 }} />
          ) : (
            <FiHeart />
          )}
          {likedByUser && animate && <LikeButton />}
        </ActionButton>
        {numberOfLikes > 0 && <Number>{numberOfLikes}</Number>}
      </ActionDiv>
      <ActionDiv>
        <ActionButton
          tabIndex="0"
          onClick={(e) => handleClickVoid(e)}
          onKeyDown={(e) => handleKeyDownVoid(e)}
          aria-label="Share tweet"
          role="button"
          color="#edb47e"
          darkcolor="#8c5826"
        >
          <FiUpload />
        </ActionButton>
      </ActionDiv>
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

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Number = styled.span`
  font-size: 14px;
  margin-left: 4px;
`;

const ActionButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 35px;
  border: none;
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.darkcolor};
    background-color: ${(props) => props.color};
  }
  &:focus {
    outline: none;
    background-color: ${(props) => props.color};
  }
`;

export default ActionBar;
