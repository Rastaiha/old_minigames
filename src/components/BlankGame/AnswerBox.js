import React, { Component } from 'react';
import { Flag, Segment, Grid } from 'semantic-ui-react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import './style.css';

export default function AnswerBox({ text }) {
  const [{ isDragging }, drag] = useDrag({
    item: { text, type: ItemTypes.ANSWER },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      id="answerBox"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <Segment textAlign="center" compact>
        {text}
      </Segment>
    </div>
  );
}
