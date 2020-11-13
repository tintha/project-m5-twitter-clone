import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { COLORS } from "../../constants";
import Icon from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/typicons/arrowLeft";

const PageHeader = () => {
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

  return (
    <PageHeaderDiv>
      <IconDiv>
        <Icon icon={arrowLeft} size={28} />
      </IconDiv>
      <BackLink
        onClick={(e) => handleGoBack(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        tabIndex="0"
        aria-label="Go back"
        role="button"
      >
        Back
      </BackLink>
    </PageHeaderDiv>
  );
};

const BackLink = styled.div`
  cursor: pointer;
`;

const IconDiv = styled.div`
  color: ${COLORS.grayBorder};
`;

const PageHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid ${COLORS.grayBorder};
  margin-bottom: 10px;
  padding: 10px;
`;

export default PageHeader;
