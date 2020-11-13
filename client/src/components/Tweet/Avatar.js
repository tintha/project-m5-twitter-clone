import React from "react";
import styled from "styled-components";

const Avatar = ({ src, width, alt }) => {
  return <Img src={`${src}`} width={width} alt={alt} />;
};

const Img = styled.img`
  border-radius: 50%;
  width: ${(props) => props.width}px;
`;

export default Avatar;
