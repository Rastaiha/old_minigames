import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import BlankBox from './BlankBox';
import { ItemTypes } from './ItemTypes';
import './style.css';

const CodeLine = ({
  blanks,
  lineData,
  lineIndex,
  onDrop,
  help,
  situations,
  answers,
}) => {
  return (
    <div id="line">
      <Popup
        id='popup'
        content={help}
        trigger={
          help && (
            <Icon
              name="help circle"
              style={{
                verticalAlign: 'middle',
                display: 'table-cell',
              }}
            />
          )
        }
      />

      {lineData.map((data, index) => {
        if (data.type === ItemTypes.NOT_BLANK) {
          return (
            <div
              style={{
                display: 'inline',
                whiteSpace: 'pre',
                verticalAlign: 'middle',
                display: 'table-cell',
              }}
            >
              <b>{data.text}</b>
            </div>
          );
        } else if (data.type === ItemTypes.BLANK) {
          return (
            <div
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                display: 'table-cell',
              }}
            >
              <BlankBox
                text={blanks[data.blankIndex]}
                situation={situations[data.blankIndex]}
                index={index}
                lineIndex={lineIndex}
                onDrop={onDrop}
                blankIndex={data.blankIndex}
                answer={answers[data.blankIndex]}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CodeLine;
