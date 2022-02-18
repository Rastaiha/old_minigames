import React, { Component } from 'react';
import { Layer, Stage, Rect } from 'react-konva';
import KonvaNode from './KonvaNode';

import DrawingModes from '../../../redux/reducers/whiteboardModes';
import {
  addNode,
  deselectNodes,
  selectNode,
  updateShapeProps,
  addPointsToLine,
  completeLine,
} from '../../../redux/actions/whiteboard';

import { connect } from 'react-redux';
import makeId from '../../../utils/makeId';

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.deselectAllOnTouchStage = this.deselectAllOnTouchStage.bind(this);
  }

  componentDidMount() {
    this.initDrawing(this.stageEl.getStage());
    this.layerEl && this.layerEl.getCanvas()._canvas.setAttribute('dir', 'rtl');
  }

  initDrawing(stage) {
    let activeLineId = null;
    let last_pos;
    let last_update = new Date();
    stage.on('mousemove touchmove', () => {
      if (activeLineId && new Date().getTime() - last_update.getTime() > 10) {
        last_update = new Date();
        let { x, y } = stage.getPointerPosition();
        if (!last_pos || last_pos.x !== x || last_pos.y !== y) {
          last_pos = { x, y };
          if (activeLineId) {
            this.props.addPointsToLine(activeLineId, [x, y]);
          }
        }
      }
    });
    stage.on('mousedown touchstart', () => {
      let globalCompositeOperation = 'source-over';
      if (this.props.mode === DrawingModes.EARASING) {
        globalCompositeOperation = 'destination-out';
      } else if (this.props.mode !== DrawingModes.PAINTING) {
        activeLineId = null;
        return;
      }
      let { x, y } = stage.getPointerPosition();
      activeLineId = makeId();
      this.props.addNode(
        'LINE',
        {
          ...this.props.paint,
          globalCompositeOperation,
          points: [x, y],
        },
        {},
        activeLineId
      );
    });
    stage.on('mouseup touchend', () => {
      if (activeLineId) {
        this.props.completeLine(activeLineId);
        activeLineId = null;
      }
    });
  }

  toDataURL() {
    return this.stageEl.getStage().toDataURL();
  }

  deselectAllOnTouchStage(e) {
    if (e.target === this.background) {
      this.props.deselectNodes();
    }
  }

  render() {
    const { pg } = this.props;
    console.log(pg);
    return (
      <Stage
        width={this.props.width}
        height={this.props.height}
        ref={(stageEl) => (this.stageEl = stageEl)}
        onMouseDown={this.deselectAllOnTouchStage}
        onTouchStart={this.deselectAllOnTouchStage}
      >
        <Layer ref={(layerEl) => (this.layerEl = layerEl)}>
          <Rect
            ref={(background) => (this.background = background)}
            x={0}
            y={0}
            fill="white"
            width={this.props.width}
            height={this.props.height}
          />
          {this.props.nodes.map((node) => (
            <KonvaNode
              key={node.id}
              mode={this.props.mode}
              {...node}
              onChange={(newAttrs) =>
                this.props.updateShapeProps(node.id, newAttrs)
              }
              onSelect={() => {
                this.props.deselectNodes();
                this.props.selectNode(node.id);
              }}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: state.whiteboard.present.mode,
  paint: state.whiteboard.present.paint,
  nodes: state.whiteboard.present.nodes,
});

export default connect(
  mapStateToProps,
  {
    addNode,
    deselectNodes,
    selectNode,
    updateShapeProps,
    addPointsToLine,
    completeLine,
  },
  null,
  {
    forwardRef: true,
  }
)(Drawing);
