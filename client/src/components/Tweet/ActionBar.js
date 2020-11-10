import React from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";

const ActionBar = (props) => {
  const { tweetId, numLikes, numRetweets, likedByUser, setLikedByUser } = props;

  const handleLike = (e) => {
    console.log("cliked");

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
          console.log(resp.success);
          setLikedByUser(!likedByUser);
          console.log(`likedbyuser : ${likedByUser}`);
        } else if (resp.error) {
          console.log(resp.error);
          console.log(`likedbyuser : ${likedByUser}`);
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
        <FiHeart onClick={(e) => handleLike(e)} />
        {numLikes > 0 && <Number>{numLikes}</Number>}
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
