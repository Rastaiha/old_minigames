import React, { Component } from 'react';
import { Group, Rect } from 'react-konva';
import Box from './Box';
import * as situations from './situations';

const SecondContainer = (props) => {
  return (
    <Group x={props.x} y={props.y}>
      <Rect
        x={0}
        y={0}
        width={props.boxWidth + 5}
        height={props.boxWidth + 5}
        stroke="blue"
        cornerRadius={5}
      />
      {props.box !== null ? (
        <Box
          key={props.box.id}
          id={props.box.id}
          boxX={2.5}
          boxY={2.5}
          boxWidth={props.boxWidth}
          {...props.box.props}
          mostLeftBox={true}
          onDragEnd={props.onDragEnd}
        />
      ) : (
        <></>
      )}
    </Group>
  );
};

export default SecondContainer;
