import React, { Component } from 'react';
import {
  Container,
  Button,
  Tab,
} from 'semantic-ui-react';
import {
  updatePageNumber,
} from '../../../redux/actions/blockChain'
import PublicPrivateKeyPane from './PublicPrivateKeyPane'
import SignPane from './SignPane'
import VerifyPane from './VerifyPane'
import '../style.css';
import { connect } from 'react-redux';

class MessageGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
    }
  }

  render() {
    return (
      <Container>
        {this.props.pageNumber === 0 &&
          <PublicPrivateKeyPane />
        }
        {this.props.pageNumber === 1 &&
          <SignPane />
        }
        {this.props.pageNumber === 2 &&
          <VerifyPane />
        }
        <div
          style={{
            direction: 'rtl',
            position: 'fixed',
            bottom: '0',
            left: '0',
          }}
        >
          <Button
            disabled={this.props.pageNumber === 0}
            color='blue'
            onClick={
              () => this.props.updatePageNumber(0)
            }
          >
            کلیدها
          </Button>

          <Button
            disabled={this.props.pageNumber === 1}
            color='blue'
            onClick={
              () => this.props.updatePageNumber(1)
            }
          >
            امضا
          </Button>

          <Button
            disabled={this.props.pageNumber === 2}
            color='blue'
            onClick={
              () => this.props.updatePageNumber(2)
            }
          >
            تایید امضا
          </Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  pageNumber: state.blockChain.pageNumber,
})

export default connect(
  mapStateToProps,
  {
    updatePageNumber,
  }
)(MessageGame)