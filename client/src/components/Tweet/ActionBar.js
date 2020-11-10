import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

const ActionBar = (props) => {
  const { tweetId, numLikes, numRetweets, isLikedByUser } = props;
  const [numberOfLikes, setNumberOfLikes] = useState(numLikes);
  const [likedByUser, setLikedByUser] = useState(isLikedByUser);

  const handleToggleLike = (e) => {
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

  return (
    <Wrapper>
      <FiMessageCircle />
      <ActionDiv>
        <FiRepeat />
        {numRetweets > 0 && <Number>{numRetweets}</Number>}
      </ActionDiv>
      <ActionDiv>
        <FiHeart className="heart-icon" onClick={(e) => handleToggleLike(e)} />
        {numberOfLikes > 0 && <Number>{numberOfLikes}</Number>}
      </ActionDiv>
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

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.span`
  font-size: 14px;
  margin-left: 4px;
`;

export default ActionBar;
