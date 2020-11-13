import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useParams } from "react-router";
import Avatar from "../Tweet/Avatar";

const Followers = () => {
  const user = useParams().profile;
  const [listOfFollowing, setListOfFollowing] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/${user}/following`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setListOfFollowing([...data.following]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      <FollowersWrapper>
        {listOfFollowing.map((following) => {
          return (
            <Mapped key={following.handle}>
              <AvatarDiv>
                <Avatar
                  src={following.avatarSrc}
                  width="50"
                  alt={following.handle}
                />
              </AvatarDiv>
              <Details>
                <Bold>{following.displayName}</Bold>
                <GreyText>@{following.handle}</GreyText>
                <p>{following.bio}</p>
              </Details>
              <FollowButton>Follow</FollowButton>
            </Mapped>
          );
        })}
      </FollowersWrapper>
    </>
  );
};

const FollowersWrapper = styled.div`
  border-top: 1px solid ${COLORS.grayBorder};
`;

const Mapped = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${COLORS.grayBorder};
`;

const AvatarDiv = styled.div`
  padding: 10px;
`;

const Details = styled.div`
  padding: 10px;
  width: 100%;
`;

const Bold = styled.p`
  font-weight: bold;
`;

const GreyText = styled.p`
  color: ${COLORS.grayText};
  margin-bottom: 6px;
`;

const FollowButton = styled.div`
  border-radius: 10px;
  background-color: ${COLORS.primary};
  color: #fff;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

export default Followers;
