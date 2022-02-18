import React, { Component } from 'react';
import { Circle, Rect, Transformer, Image, Line, Text } from 'react-konva';
import PropTypes from 'prop-types';
import DrawingModes from '../../../redux/reducers/whiteboardModes';

export default class KonvaNode extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    mode: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    shapeProps: PropTypes.object.isRequired,
    transformerProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onTransformEnd = this.onTransformEnd.bind(this);
  }

  checkTransform() {
    if (this.props.mode === DrawingModes.MOVE) {
      this.node.draggable(true);
      if (this.props.isSelected) {
        this.transformer.nodes([this.node]);
        this.transformer.getLayer().batchDraw();
      }
    } else {
      this.node.draggable(false);
    }
  }

  componentWillMount() {
    switch (this.props.type) {
      case 'IMG':
        this.Node = Image;
        break;
      case 'CIRCLE':
        this.Node = Circle;
        break;
      case 'LINE':
        this.Node = Line;
        break;
      case 'TEXT':
        this.Node = Text;
        this.onTransform = () => {
          this.node.setAttrs({
            width: this.node.width() * this.node.scaleX(),
            scaleX: 1,
          });
        };
        this.onDblTap = this.onDblClick = () => {
          const this_node = this.node;
          const this_transformer = this.transformer;
          this_node.hide();
          this_transformer.hide();
          // create textarea over canvas with absolute position
          // first we need to find position for textarea
          // how to find it?
          // at first lets find position of text node relative to the stage:
          let textPosition = this_node.absolutePosition();
          // then lets find position of stage container on the page:
          let stageBox = this_node
            .getStage()
            .container()
            .getBoundingClientRect();
          // so position of textarea will be the sum of positions above:
          let areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
          };
          // create textarea and style it
          let textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          // apply many styles to match text on canvas as close as possible
          // remember that text rendering on canvas and on the textarea can be different
          // and sometimes it is hard to make it 100% the same. But we will try...
          textarea.value = this_node.text();
          textarea.style.zIndex = 100000;
          textarea.style.position = 'absolute';
          textarea.style.top = areaPosition.y + 'px';
          textarea.style.left = areaPosition.x + 'px';
          textarea.style.width =
            this_node.width() - this_node.padding() * 2 + 'px';
          textarea.style.height =
            this_node.height() - this_node.padding() * 2 + 5 + 'px';
          textarea.style.fontSize = this_node.fontSize() + 'px';
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.lineHeight = this_node.lineHeight();
          textarea.style.fontFamily = this_node.fontFamily();
          textarea.style.transformOrigin = 'left top';
          textarea.style.textAlign = this_node.align();
          textarea.style.color = this_node.fill();
          let rotation = this_node.rotation();
          let transform = '';
          if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
          }
          let px = 0;
          let isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
          if (isFirefox) {
            px += 2 + Math.round(this_node.fontSize() / 20);
          }
          transform += 'translateY(-' + px + 'px)';
          textarea.style.transform = transform;
          textarea.style.height = 'auto';
          // after browsers resized it we can set actual value
          textarea.style.height = textarea.scrollHeight + 3 + 'px';
          textarea.focus();
          const removeTextarea = () => {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            this_node.show();
            this_transformer.show();
            this_node.getLayer().batchDraw();
            // this_transformer.forceUpdate();
          };

          const setTextareaWidth = (newWidth) => {
            if (!newWidth) {
              // set width for placeholder
              newWidth = this_node.placeholder.length * this_node.fontSize();
            }
            // some extra fixes on different browsers
            let isSafari = /^((?!chrome|android).)*safari/i.test(
              navigator.userAgent
            );
            let isFirefox =
              navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
              newWidth = Math.ceil(newWidth);
            }
            let isEdge =
              document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
              newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
          };
          textarea.addEventListener('keydown', (e) => {
            if (textarea.value.length > 0) {
              const english = /^[A-Za-z0-9]*$/;
              if (english.test(textarea.value[0])) {
                if (this_node.align() === 'right') {
                  this_node.align('left');
                  textarea.style.textAlign = 'left';
                }
              } else if (this_node.align() === 'left') {
                this_node.align('right');
                textarea.style.textAlign = 'right';
              }
            }
            let scale = this_node.getAbsoluteScale().x;
            setTextareaWidth(this_node.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
              textarea.scrollHeight + this_node.fontSize() + 'px';
          });
          const handleOutsideClick = (e) => {
            if (e.target !== textarea) {
              this.props.onChange({
                ...this.props.shapeProps,
                text: textarea.value,
              });
              removeTextarea();
            }
          };
          setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
          });
        };
        break;
      case 'RECT':
      default:
        this.Node = Rect;
    }
  }

  componentDidMount() {
    this.checkTransform();
  }

  componentDidUpdate() {
    this.checkTransform();
  }

  onDragEnd(e) {
    this.props.onChange({
      ...this.props.shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  onTransformEnd() {
    this.props.onChange({
      ...this.props.shapeProps,
      x: this.node.x(),
      y: this.node.y(),
      width: this.node.width(),
      scaleX: this.node.scaleX(),
      scaleY: this.node.scaleY(),
      rotation: this.node.rotation(),
    });
  }

  render() {
    const nodeProps = {
      ref: (node) => (this.node = node),
      image: this.image,
      ...this.props.shapeProps,
      onClick: this.props.onSelect,
      onTouchEnd: this.props.onSelect,
      onDragEnd: this.onDragEnd,
      onTransformEnd: this.onTransformEnd,
      onDblClick: this.onDblClick,
      onDblTap: this.onDblTap,
      onTransform: this.onTransform,
    };
    const Node = this.Node;

    return (
      <>
        <Node {...nodeProps} />
        {this.props.isSelected && (
          <Transformer
            ref={(transformer) => (this.transformer = transformer)}
            {...this.props.transformerProps}
          />
        )}
      </>
    );
  }
}
