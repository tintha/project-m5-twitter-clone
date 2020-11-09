import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

const TweetDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState("loading");
  const [tweetInfo, setTweetInfo] = useState({});

  useEffect(() => {
    fetch(`/api/tweet/${params.tweetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTweetInfo({ ...data.tweet });
        setLoading("iddle");
      });
  }, []);

  return (
    <Wrapper>
      {loading === "loading" ? <p>...loading</p> : <>{tweetInfo.status}</>}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TweetDetails;
