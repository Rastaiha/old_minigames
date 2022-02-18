import React, { Component } from 'react';
import { Group, Rect } from 'react-konva';
import Box from './Box';
import * as situations from './situations';

const FirstContainer = (props) => {
  let x = props.boxX;
  let counter = props.boxCounter;
  return (
    <Group x={props.x} y={props.y}>
      <Rect
        x={0}
        y={0}
        width={props.machineHeight}
        height={props.machineWidth}
        stroke="#4a574c"
        cornerRadius={5}
      />
      {props.boxes
        .filter((box) => {
          return box.props.situation === situations.IN_SHELL;
        })
        .map((box) => {
          x += props.boxWidth + 2;
          counter++;
          return (
            <Box
              key={box.id}
              id={box.id}
              boxX={x}
              boxY={2.5}
              boxWidth={props.boxWidth}
              {...box.props}
              mostLeftBox={counter === 1}
              onDragEnd={props.onDragEnd}
            />
          );
        })}
    </Group>
  );
};

export default FirstContainer;
