import React from "react";
import styled from "styled-components";

const Media = ({ src, maxwidth, maxheight }) => {
  return <Img src={`${src}`} maxwidth={maxwidth} maxheight={maxheight} />;
};

const Img = styled.img`
  max-width: ${(props) => props.maxwidth}px;
  max-height: ${(props) => props.maxheight}px;
  border-radius: 1rem;
`;

export default Media;
