import React from "react";
import styled from "styled-components";

const Media = ({ src, maxwidth, maxheight, alt }) => {
  return (
    <Img src={`${src}`} maxwidth={maxwidth} maxheight={maxheight} alt={alt} />
  );
};

const Img = styled.img`
  width: ${(props) => props.maxwidth}px;
  height: ${(props) => props.maxheight}px;
  border-radius: 12px;
  object-fit: cover;
`;

export default Media;
