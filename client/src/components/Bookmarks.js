import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const Bookmarks = () => {
  return <PageHeader>Bookmarks</PageHeader>;
};

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

export default Bookmarks;
