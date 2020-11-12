import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostFailed from "../errors/PostFailed";
import { COLORS } from "../../constants";
import Avatar from "../Tweet/Avatar";

const Form = (props) => {
  const { setNewTweetPost, currentUserAvatar } = props;
  const [tweet, setTweet] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const maxChar = 280;
  let charCount = maxChar - tweet.length;

  useEffect(() => {
    tweet.length > maxChar || tweet.length === 0
      ? setDisabled(true)
      : setDisabled(false);
  }, [tweet]);

  const handleChange = (e) => {
    const tweetInput = e.target.value;
    setTweet(tweetInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/tweet`, {
      method: "POST",
      body: JSON.stringify({ status: tweet }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTweet("");
          setNewTweetPost(true);
        }
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  return (
    <Wrapper>
      <AvatarDiv>
        <Avatar src={currentUserAvatar} width="30" />
      </AvatarDiv>
      <FormDiv>
        <form>
          <label htmlFor="tweet"></label>
          <TweetInput
            name="tweet"
            placeholder="What's happening?"
            value={tweet}
            onChange={handleChange}
          />
          <ButtonDiv>
            {charCount > 55 && <CharCount>{charCount}</CharCount>}
            {charCount >= 0 && charCount <= 55 && (
              <CharCount className="yellow">{charCount}</CharCount>
            )}
            {charCount < 0 && (
              <CharCount className="red">{charCount}</CharCount>
            )}
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={isDisabled}
            >
              Meow
            </Button>
          </ButtonDiv>
        </form>
      </FormDiv>
      {isError && <PostFailed />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 6px solid ${COLORS.grayBorder};
  width: 100%;
`;

const AvatarDiv = styled.div`
  padding: 10px;
`;

const FormDiv = styled.div`
  width: 100%;
  margin-top: 14px;
`;

const TweetInput = styled.textarea`
  border-radius: 5px;
  width: 100%;
  height: 120px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  right: 0px;
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 6px 16px 6px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CharCount = styled.span`
  margin-right: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${COLORS.grayText};
  &.yellow {
    color: #f7ba00;
  }
  &.red {
    color: #ff2f00;
  }
`;

export default Form;
