import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostFailed from "../errors/PostFailed";

const Form = (props) => {
  const { setNewTweetPost } = props;
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
      <form>
        <label htmlFor="tweet"></label>
        <TweetInput
          name="tweet"
          placeholder="What's happening"
          value={tweet}
          onChange={handleChange}
        />
        <ButtonDiv>
          {charCount > 55 && <CharCount>{charCount}</CharCount>}
          {charCount >= 0 && charCount <= 55 && (
            <CharCount className="yellow">{charCount}</CharCount>
          )}
          {charCount < 0 && <CharCount className="red">{charCount}</CharCount>}
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={isDisabled}
          >
            Meow
          </Button>
        </ButtonDiv>
      </form>
      {isError && <PostFailed />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TweetInput = styled.textarea`
  border-radius: 5px;
  width: 500px;
  height: 120px;
  border: 3px solid #cccccc;
`;

const ButtonDiv = styled.div``;

const Button = styled.button`
  right: 0px;
  cursor: pointer;
  &:disabled {
    background-color: #e3ddda;
    cursor: not-allowed;
  }
`;

const CharCount = styled.span`
  margin-right: 10px;
  font-weight: bold;
  &.yellow {
    color: #f7ba00;
  }
  &.red {
    color: #ff2f00;
  }
`;

export default Form;
