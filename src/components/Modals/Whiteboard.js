import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import Drawing from '../konva/Drawing/Drawing';

import WhiteboardNav from './WhiteboardNav';

export default class WhiteboardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      stageWidth: 1000,
    };
    this.getDataURL = this.getDataURL.bind(this);
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    window.addEventListener('resize', this.checkSize);
  }

  componentDidUpdate() {
    this.checkSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
  }

  checkSize = () => {
    if (
      !!this.container &&
      this.state.stageWidth !== this.container.offsetWidth
    ) {
      this.setState({
        stageWidth: this.container.offsetWidth,
      });
    }
  };
  getDataURL() {
    return this.konva.toDataURL();
  }
  render = () => {
    const { open } = this.state;
    return (
      <>
        <Button
          as="a"
          onClick={this.open}
          style={{ padding: '5px 15px' }}
          basic
        >
          <img
            src={process.env.PUBLIC_URL + '/whiteboard.png'}
            alt="تخته"
            style={{ width: '20px' }}
          />
        </Button>
        <Modal
          open={open}
          onOpen={this.open}
          onClose={this.close}
          className="whiteboard"
        >
          <Modal.Content>
            <WhiteboardNav getDataURL={this.getDataURL} />
            <div ref={(node) => (this.container = node)}>
              <Drawing
                ref={(konva) => (this.konva = konva)}
                width={this.state.stageWidth}
                height={400}
              />
            </div>
          </Modal.Content>
          <i></i>
        </Modal>
      </>
    );
  };
}
