import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import moment from "moment";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import Media from "./Media";
import UnknownError from "../errors/UnknownError";
import Loading from "../Loading";
import { COLORS } from "../../constants";
import Icon from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/typicons/arrowLeft";

const TweetDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState("loading");
  const [tweetInfo, setTweetInfo] = useState({});
  let history = useHistory();

  const handleGoBack = (e) => {
    history.goBack(-1);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleGoBack(e);
    }
  };

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
      <PageHeader>
        <IconDiv>
          <Icon icon={arrowLeft} size={28} />
        </IconDiv>
        <MeowLink
          onClick={(e) => handleGoBack(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          tabIndex="0"
          aria-label="Go back"
          role="button"
        >
          Meow
        </MeowLink>
      </PageHeader>
      {loading === "loading" && <Loading />}
      {loading === "error" && <UnknownError />}

      {loading === "success" && (
        <TweetWrapper>
          <TweetHeader>
            <AvatarDiv>
              <Avatar src={tweetInfo.author.avatarSrc} width="50" />
            </AvatarDiv>
            <NameAndHandle>
              <ProfileLink
                to={`/${tweetInfo.author.handle}`}
                key={tweetInfo.author.handle}
              >
                {tweetInfo.author.displayName}
              </ProfileLink>
              <p>@{tweetInfo.author.handle}</p>
            </NameAndHandle>
          </TweetHeader>
          <TweetText>
            <p>{tweetInfo.status}</p>
          </TweetText>
          {tweetInfo.media.length > 0 && (
            <MediaWrapper>
              <Media
                src={tweetInfo.media[0].url}
                maxwidth={580}
                maxheight={400}
                alt={`${tweetInfo.author.handle} avatar`}
              />
            </MediaWrapper>
          )}
          <Date>
            <p>
              {moment(tweetInfo.timestamp).format("LT · MMM Do YYYY")} · Critter
              web app
            </p>
          </Date>
          <CenteredBart>
            <ActionBar
              numLikes={tweetInfo.numLikes}
              numRetweets={tweetInfo.numRetweets}
              tweetId={params.tweetId}
              isLikedByUser={tweetInfo.isLiked}
              retweetFrom={tweetInfo.retweetFrom}
            />
          </CenteredBart>
        </TweetWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconDiv = styled.div`
  color: ${COLORS.grayBorder};
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid ${COLORS.grayBorder};
  margin-bottom: 10px;
  padding: 10px;
`;

const TweetWrapper = styled.div``;

const TweetHeader = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarDiv = styled.div`
  margin-left: 14px;
`;

const NameAndHandle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  color: ${COLORS.grayText};
`;

const TweetText = styled.div`
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 14px;
  margin-right: 14px;
`;

const MediaWrapper = styled.div`
  margin-left: 14px;
`;

const Date = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${COLORS.grayText};
  border-bottom: 1px solid ${COLORS.grayBorder};
  & > p {
    margin-left: 14px;
  }
`;

const CenteredBart = styled.div`
  display: flex;
  justify-content: center;
`;

const MeowLink = styled.div`
  cursor: pointer;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;
export default TweetDetails;
