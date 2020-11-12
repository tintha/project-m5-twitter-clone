import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiUpload, FiHeart } from "react-icons/fi";
import { COLORS } from "../../constants";
import LikeButton from "./LikeButton";

const ActionBar = (props) => {
  const { tweetId, numLikes, numRetweets, isLikedByUser, retweetFrom } = props;
  const [numberOfLikes, setNumberOfLikes] = useState(numLikes);
  const [likedByUser, setLikedByUser] = useState(isLikedByUser);
  const [retweeted, setRetweeted] = useState(false);
  useEffect(() => {
    retweetFrom && console.log(retweetFrom.handle);
  }, [retweetFrom]);

  const handleToggleLike = (e) => {
    e.stopPropagation();
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
        >
          <FiRepeat />
        </ActionButton>
        {numRetweets > 0 && <Number>{numRetweets}</Number>}
      </ActionDiv>
      <ActionDiv>
        <ActionButton
          tabIndex="0"
          onClick={(e) => handleToggleLike(e)}
          onKeyDown={(e) => handleLikeKeyPress(e)}
          aria-label="Like or unlike"
          role="button"
        >
          <FiHeart />
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
          className="like-btn"
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
  display: block;
  border: none;
  border-radius: 50%;
  padding: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: ${COLORS.secondary};
  }
  &:focus {
    color: #fff;
    background-color: ${COLORS.secondary};
    outline: none;
  }
`;

export default ActionBar;
