import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import moment from "moment";
import { FiLoader } from "react-icons/fi";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import Media from "./Media";
import UnknownError from "../UnknownError";

const TweetDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState("loading");
  const [tweetInfo, setTweetInfo] = useState({});

  useEffect(() => {
    if (params.tweetId) {
      fetch(`/api/tweet/${params.tweetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTweetInfo({ ...data.tweet });
          setLoading("success");
        })
        .catch((error) => {
          setLoading("error");
        });
    }

    return function cleanup() {
      setLoading("loading");
    };
  }, [params.tweetId]);

  return (
    <Wrapper>
      {loading === "loading" && <FiLoader />}
      {loading === "error" && <UnknownError />}

      {loading === "success" && (
        <>
          <Avatar src={tweetInfo.author.avatarSrc} width="50" />
          <ProfileLink
            to={`/${tweetInfo.author.handle}`}
            key={tweetInfo.author.handle}
          >
            <p>{tweetInfo.author.displayName}</p>
            <p>@{tweetInfo.author.handle}</p>
          </ProfileLink>

          {tweetInfo.status}
          {tweetInfo.media.length > 0 && (
            <Media
              src={tweetInfo.media[0].url}
              maxwidth={450}
              maxheight={250}
            />
          )}
          <p>
            {moment(tweetInfo.timestamp).format("LT · MMM Do YYYY")} · Critter
            web app
          </p>
          <Divider />
          <ActionBar
            numLikes={tweetInfo.numLikes}
            numRetweets={tweetInfo.numRetweets}
            tweetId={params.tweetId}
            isLikedByUser={tweetInfo.isLiked}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
`;
export default TweetDetails;
