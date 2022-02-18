import React from 'react';
import { Rect } from 'react-konva';
import CodingGame from '../CodingGame/CodingGame';

const Rectangle = (props) => {
  return <Rect width={props.width} height={props.height} stroke="red" />;
};

const FirstCodingGame = () => {
  return <CodingGame container={Rectangle} game={1}/>;
};

export default FirstCodingGame;
