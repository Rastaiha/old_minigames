import React, { Component } from 'react';
import {
  Container,
} from 'semantic-ui-react';
import PlotPage from './PlotPage'
import '../style.css';

export default class SpaceGame extends Component {
  render() {
    return (
      <Container>
        <PlotPage Xlabel="شعاع مداری" Ylabel="دوره تناوب" XlabelChar="r" YlabelChar="T" />
      </Container>
    )
  }
}