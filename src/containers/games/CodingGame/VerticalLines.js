import React, { Component } from 'react';
import VerticalLinesView from '../../../components/codingGame/VerticalLinesView';
import {
  createPoints,
  createPoint,
  updatePoint,
  createLine,
  resetPoints,
} from '../../../redux/actions/verticalLines';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon, Grid } from 'semantic-ui-react';
import './style.css';

class VerticalLines extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.props.createPoints(this.getInitialPoints());
  }

  getInitialPoints() {
    const widthScale = window.innerWidth / 671;
    return [
      {
        x: 100 * widthScale,
        y: this.returnY(100 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 130 * widthScale,
        y: this.returnY(130 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 300 * widthScale,
        y: this.returnY(300 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 360 * widthScale,
        y: this.returnY(360 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 380 * widthScale,
        y: this.returnY(380 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 470 * widthScale,
        y: this.returnY(470 * widthScale),
        isUsed: false,
        isSelected: false,
      },
      {
        x: 630 * widthScale,
        y: this.returnY(630 * widthScale),
        isUsed: false,
        isSelected: false,
      },
    ];
  }

  onDragEnd(id, e) {
    this.props.updatePoint(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  returnY(x) {
    const heightScale = window.innerHeight / 381;
    return -0.4 * x + 320 * heightScale;
  }

  onSelect(id) {
    const prePointSelected = _.find(this.props.points, (point) => {
      return point.props.isSelected;
    });
    const point = _.find(this.props.points, { id: id });

    if (!prePointSelected || prePointSelected.id === point.id) {
      this.props.updatePoint(id, {
        isSelected: !point.props.isSelected,
      });
    } else {
      this.props.updatePoint(prePointSelected.id, {
        isSelected: false,
        isUsed: true,
      });
      this.props.updatePoint(point.id, { isUsed: true });
      this.props.createLine(prePointSelected.id, point.id, {});
    }
  }

  reset() {
    this.props.resetPoints();
    this.props.createPoints(this.getInitialPoints());
  }

  render() {
    return (
      <>
        <VerticalLinesView
          points={this.props.points}
          lines={this.props.lines}
          onSelect={this.onSelect}
          onDragEnd={this.onDragEnd.bind(this)}
        />
        <Icon
          name="undo"
          onClick={this.reset.bind(this)}
          style={{
            top: '10px',
            left: '10px',
            cursor: 'pointer',
            position: 'absolute',
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  points: state.verticalLines.points,
  lines: state.verticalLines.lines,
});

export default connect(mapStateToProps, {
  createPoints,
  createPoint,
  updatePoint,
  createLine,
  resetPoints,
})(VerticalLines);
