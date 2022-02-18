import React, { Component } from 'react';
import TextWidget from './TextWidget';
import SmallAnswerWidget from './SmallAnswerWidget';
import BigAnswerWidget from './BigAnswerWidget';
import VideoWidget from './VideoWidget';
import ImageWidget from './ImageWidget';
import GameWidget from './GameWidget';
import MultiAnswerWidget from './MultiAnswerWidget';

export default class Widget extends Component {
  render() {
    let widget;
    switch (this.props.widget_type) {
      case 'Description':
        widget = <TextWidget {...this.props} />;
        break;
      case 'ProblemSmallAnswer':
        widget = <SmallAnswerWidget {...this.props} />;
        break;
      case 'ProblemMultiChoice':
        widget = <MultiAnswerWidget {...this.props} />;
        break;
      case 'ProblemBigAnswer':
        widget = <BigAnswerWidget {...this.props} />;
        break;
      case 'Video':
        widget = <VideoWidget {...this.props} />;
        break;
      case 'Image':
        widget = <ImageWidget {...this.props} />;
        break;
      case 'Game':
        widget = <GameWidget {...this.props} />;
        break;
      default:
        return <div>اشتباهی رخ داده!</div>;
    }
    return <div className="widget-view-container">{widget}</div>;
  }
}
