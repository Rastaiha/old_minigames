import React, { Component } from 'react';
import {
  Container,
  Button,
  Tab,
} from 'semantic-ui-react';
import {
  updatePageNumber,
} from '../../../redux/actions/freeFall'
import FreeFall from './FreeFall'
import PlotPage from './PlotPage'
import { connect } from 'react-redux';

class FreeFallGame extends Component {
  render() {
    return (
      <Container>
        {
          this.props.pageNumber === 0 &&
          <>
            <FreeFall />
            <Button
              color='blue'
              style={{
                direction: 'rtl',
                position: 'fixed',
                top: '0',
                left: '0',
              }}
              onClick={
                () => this.props.updatePageNumber(1)
              }
            >
              نمودار
            </Button>
          </>
        }
        {
          this.props.pageNumber === 1 &&
          <>
            <PlotPage Xlabel="زمان" Ylabel="مسافت‌طی‌شده" XlabelChar="t" YlabelChar="y" />
            <Button
              color='blue'
              style={{
                direction: 'rtl',
                position: 'fixed',
                top: '0',
                left: '0',
              }}
              onClick={
                () => this.props.updatePageNumber(0)
              }
            >
              اندازه‌گیری
            </Button>
          </>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  pageNumber: state.freeFall.pageNumber,
})

export default connect(
  mapStateToProps,
  {
    updatePageNumber
  }
)(FreeFallGame)