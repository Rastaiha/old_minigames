import React from 'react';
import { Line } from 'react-konva';
import CodingGame from '../CodingGame/CodingGame';

const CurvedLine = (props) => {
  const widthScale = window.innerWidth / 671;
  const heightScale = window.innerHeight / 381;

  return (
    <Line
      points={[
        10 * widthScale,
        10 * heightScale,
        10 * widthScale,
        200 * heightScale,
        100 * widthScale,
        250 * heightScale,
        150 * widthScale,
        230 * heightScale,
        300 * widthScale,
        300 * heightScale,
        350 * widthScale,
        100 * heightScale,
        400 * widthScale,
        120 * heightScale,
        450 * widthScale,
        20 * heightScale,
      ]}
      stroke="red"
      tension={0.3}
      closed
    />
  );
};

const SecondCodingGame = () => {
  return <CodingGame container={CurvedLine} game={2} />;
};

export default SecondCodingGame;
