import React, { Component } from 'react';
import TextWidget from './TextWidget';
import SmallAnswerWidget from './SmallAnswerWidget';
import BigAnswerWidget from './BigAnswerWidget';
import VideoWidget from './VideoWidget';
import ImageWidget from './ImageWidget';
import GameWidget from './GameWidget';
import MultiAnswerWidget from './MultiAnswerWidget';
import { Icon } from 'semantic-ui-react';
import DeleteModal from '../../Modals/DeleteModal';
import { deleteWidget } from '../../../redux/actions/fsm';
import { connect } from 'react-redux';

class Widget extends Component {
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
    return (
      <div className="widget-view-container">
        <div className="widget-view-icons">
          <div className="widget-delete-icons">
            <DeleteModal
              delTrigger={<Icon name="trash" style={{ cursor: 'pointer' }} />}
              title="آیا مایل به حذف ویجت هستید؟"
              description="آیا مایل به حذف ویجت هستید؟"
              onDelete={() =>
                this.props.deleteWidget({ id: this.props.id }).then(() => {
                  window.location.reload();
                })
              }
            />
          </div>
        </div>
        {widget}
      </div>
    );
  }
}

export default connect(null, { deleteWidget })(Widget);
