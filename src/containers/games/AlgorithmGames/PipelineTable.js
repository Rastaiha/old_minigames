import React, { Component } from 'react';
import { Grid, Input, Segment, Button } from 'semantic-ui-react';
import _ from 'lodash';
import './style.css';
import { correctTableInputs } from './pipelineGraphData';

const cuts = [
  '{s}',
  '{s,o}',
  '{s,h}',
  '{s,r}',
  '{s,v}',
  '{s,h,v}',
  '{s,h,r}',
  '{s,h,o}',
  '{s,r,v}',
  '{s,r,o}',
  '{s,o,v}',
  '{s,h,r,v}',
  '{s,h,r,o}',
  '{s,h,o,v}',
  '{s,r,o,v}',
  '{s,h,r,o,v}',
];

const Row = ({ index, name, vertices, hasAnswered, onInputChange }) => (
  <Grid.Row
    textAlign="center"
    style={{
      height: '60px',
    }}
  >
    <Grid.Column>
      <Segment>{name}</Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        {hasAnswered ? (
          <>{correctTableInputs[index]}</>
        ) : (
          <Input
            style={{
              width: '100%',
              maxWidth: '65px',
              height: '25px',
              boxShadow: 'none !important',
              // outline:'1px solid black',
              overflow: 'hidden',
              resize: 'none',
              textAlign: 'center',
            }}
            onChange={(e) => {
              onInputChange(e, index);
            }}
          />
        )}
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>{getThirdColumn(name, vertices)}</Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>{getFourthColumn(name, vertices)}</Segment>
    </Grid.Column>
  </Grid.Row>
);

function getThirdColumn(cutsName, vertices) {
  let subString = cutsName.slice(1, cutsName.length - 1);
  let vertexNames = subString.split(',');

  let outputFlow = 0;
  vertexNames.forEach((name) => {
    const vertex = _.find(vertices, function (vertice) {
      return vertice.props.name === name;
    });
    outputFlow += vertex.props.outputFlux;
  });

  return outputFlow;
}

function getFourthColumn(cutsName, vertices) {
  let subString = cutsName.slice(1, cutsName.length - 1);
  let vertexNames = subString.split(',');

  let inputFlow = 0;
  vertexNames.forEach((name) => {
    const vertex = _.find(vertices, function (vertice) {
      return vertice.props.name === name;
    });
    inputFlow += vertex.props.inputFlux;
  });

  return inputFlow;
}

class PipelineTable extends Component {
  state = {
    hasAnswered: false,
    inputs: ['', '', '', '', ''],
  };

  onButtonClick() {
    let check = true;
    this.state.inputs.forEach((text, index) => {
      if (text !== correctTableInputs[index]) {
        check = false;
      }
    });
    if (check) {
      this.setState({ hasAnswered: true });
    }
  }

  onInputChange(e, index) {
    if (index < 5) {
      const newInputs = this.state.inputs.map((text, i) => {
        return i === index ? e.target.value : text;
      });
      this.setState({ inputs: newInputs });
    }
  }

  render() {
    return (
      <div
        style={{
          overflow: 'auto',
          paddingBottom: '20px',
          maxHeight: window.innerHeight - 50 + 'px',
        }}
      >
        <Grid
          columns="equal"
          inverted
          style={{
            overflow: 'auto',
            paddingBottom: '20px',
            maxHeight: window.innerHeight - 50 + 'px',
          }}
        >
          {cuts.map((cut, index) => {
            return (
              <Row
                key={index}
                index={index}
                name={cut}
                vertices={this.props.vertices}
                hasAnswered={this.state.hasAnswered}
                onInputChange={this.onInputChange.bind(this)}
              />
            );
          })}
          <Grid.Row
          style={{
            marginLeft: '16px'
          }}
          >
            <Button
              color="blue"
              id="checkButton"
              onClick={this.onButtonClick.bind(this)}
            >
              Check Answers
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default PipelineTable;
