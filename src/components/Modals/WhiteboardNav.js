import React, { Component } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import {
  changeMode,
  addNode,
  removeSelectednodes,
  deselectNodes,
} from '../../redux/actions/whiteboard';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DrawingModes from '../../redux/reducers/whiteboardModes';

const downloadURI = (uri, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

class WhiteboardNav extends Component {
  static propTypes = {
    mode: PropTypes.number.isRequired,
    addNode: PropTypes.func.isRequired,
    changeMode: PropTypes.func.isRequired,
    removeSelectednodes: PropTypes.func.isRequired,
    deselectNodes: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div className="whiteboard-nav">
        <ul>
          <li>
            <Icon
              className={
                this.props.mode === DrawingModes.MOVE ? 'selected' : ''
              }
              name="hand pointer"
              onClick={() => this.props.changeMode(DrawingModes.MOVE)}
            />
          </li>
          <li>
            <Icon
              name="font"
              onClick={() => {
                this.props.changeMode(DrawingModes.MOVE);
                this.props.addNode(
                  'TEXT',
                  {
                    text: 'اینجا بنویسید',
                    x: 50,
                    y: 80,
                    fontSize: 20,
                    draggable: true,
                    width: 200,
                    align: 'right',
                    fontFamily: 'iranyekan',
                  },
                  {
                    enabledAnchors: ['middle-left', 'middle-right'],
                    boundBoxFunc: function (oldBox, newBox) {
                      newBox.width = Math.max(30, newBox.width);
                      return newBox;
                    },
                  }
                );
              }}
            />
          </li>
          <li>
            <Icon
              name="square"
              onClick={() => {
                this.props.changeMode(DrawingModes.MOVE);
                this.props.addNode('RECT', {
                  x: 100,
                  y: 100,
                  width: 100,
                  height: 100,
                  fill: 'black',
                  shadowBlur: 3,
                });
              }}
            />
          </li>
          <li>
            <Icon
              name="circle"
              onClick={() => {
                this.props.changeMode(DrawingModes.MOVE);
                this.props.addNode('CIRCLE', {
                  x: 100,
                  y: 100,
                  width: 100,
                  height: 100,
                  fill: 'black',
                  shadowBlur: 3,
                });
              }}
            />
          </li>
          {/* <li>
            <Icon name="image" onClick={() => this.fileUploadEl.click()} />
            <input
              style={{ display: 'none' }}
              type="file"
              hidden
              ref={(fileUploadEl) => (this.fileUploadEl = fileUploadEl)}
              onChange={(e) => {
                const input = e.target;
                if (input.files && input.files[0]) {
                  const URL = window.webkitURL || window.URL;
                  const url = URL.createObjectURL(input.files[0]);
                  const img = new Image();
                  img.src = url;

                  img.onload = () => {
                    const img_width = img.width;
                    const img_height = img.height;

                    const max = 300;
                    const ratio =
                      img_width > img_height
                        ? img_width / max
                        : img_height / max;

                    this.props.changeMode(DrawingModes.MOVE);
                    this.props.addNode('IMG', {
                      image: img,
                      x: 50,
                      y: 30,
                      width: img_width / ratio,
                      height: img_height / ratio,
                      shadowBlur: 3,
                    });
                  };
                }
              }}
            />
          </li> */}
          <li>
            <Icon
              className={
                this.props.mode === DrawingModes.PAINTING ? 'selected' : ''
              }
              name="pencil alternate"
              onClick={() => {
                this.props.deselectNodes();
                this.props.changeMode(DrawingModes.PAINTING);
              }}
            />
          </li>
          <li>
            <Icon
              name="undo"
              onClick={this.props.onUndo}
              className={this.props.canUndo ? '' : 'disable'}
            />
          </li>
          <li>
            <Icon
              name="redo"
              onClick={this.props.onRedo}
              className={this.props.canRedo ? '' : 'disable'}
            />
          </li>

          <li>
            <Icon
              name="trash"
              onClick={() => this.props.removeSelectednodes()}
            />
          </li>
        </ul>
        <ul style={{ marginLeft: 'auto' }}>
          <li>
            <Icon
              name="save"
              onClick={() => {
                const dataURL = this.props.getDataURL();
                downloadURI(dataURL, 'stage.png');
              }}
            />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: state.whiteboard.present.mode,
  canUndo: state.whiteboard.past.length > 0,
  canRedo: state.whiteboard.future.length > 0,
});

export default connect(mapStateToProps, {
  addNode,
  changeMode,
  removeSelectednodes,
  deselectNodes,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(WhiteboardNav);
