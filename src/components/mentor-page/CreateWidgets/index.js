import React, { Component } from 'react';
import TextWidget from './TextWidget';
import SmallAnswerWidget from './SmallAnswerWidget';
import BigAnswerWidget from './BigAnswerWidget';
import LinkWidget from './LinkWidget';
import GameWidget from './GameWidget';
import MultiAnswerWidget from './MultiAnswerWidget';

export default class CreateWidget extends Component {
  getData = () => {
    let widget_type = this.props.widget_type;
    const data = this.widgetCreatorEl.getData();
    if (widget_type === 'PDF') {
      data.link = 'https://azu.github.io/slide-pdf.js/?slide=' + data.link;
      widget_type = 'Game';
    }
    return {
      ...data,
      pageId: this.props.pageId,
      widget_type,
    };
  };
  render() {
    switch (this.props.widget_type) {
      case 'Description':
        return <TextWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      case 'ProblemSmallAnswer':
        return (
          <SmallAnswerWidget ref={(ref) => (this.widgetCreatorEl = ref)} />
        );
      case 'ProblemMultiChoice':
        return (
          <MultiAnswerWidget ref={(ref) => (this.widgetCreatorEl = ref)} />
        );
      case 'ProblemBigAnswer':
        return <BigAnswerWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      case 'Video':
        return <LinkWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      case 'Image':
        return <LinkWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      case 'Game':
        return <GameWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      case 'PDF':
        return <LinkWidget ref={(ref) => (this.widgetCreatorEl = ref)} />;
      default:
        return <div>اشتباهی رخ داده!</div>;
    }
  }
}
