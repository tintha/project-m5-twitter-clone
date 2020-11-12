import React from "react";
import styled from "styled-components";

const Media = ({ src, maxwidth, maxheight }) => {
  return <Img src={`${src}`} maxwidth={maxwidth} maxheight={maxheight} />;
};

// const Img = styled.img`
//   width: ${(props) => props.maxwidth}px;
//   //max-height: ${(props) => props.maxheight}px;
//   height: 250px;
//   border-radius: 1rem;
//   object-fit: cover;
//   object-position: 0 0;
// `;

const Img = styled.div`
  width: ${(props) => props.maxwidth}px;
  height: ${(props) => props.maxheight}px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 12px;
`;

export default Media;
