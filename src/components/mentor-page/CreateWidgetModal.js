import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import CreateWidget from './CreateWidgets';
import { createWidget } from '../../redux/actions/fsm';
import { connect } from 'react-redux';

const widgetOptions = {
  Description: { value: 'Description', text: 'متن' },
  ProblemSmallAnswer: {
    value: 'ProblemSmallAnswer',
    text: 'سوال پاسخ کوتاه',
  },
  ProblemMultiChoice: {
    value: 'ProblemMultiChoice',
    text: 'سوال چندگزینه‌ای',
  },
  ProblemBigAnswer: {
    value: 'ProblemBigAnswer',
    text: 'سوال پاسخ بلند',
  },
  Video: { value: 'Video', text: 'فیلم' },
  Image: { value: 'Image', text: 'عکس' },
  Game: { value: 'Game', text: 'بازی' },
  PDF: { value: 'PDF', text: 'پی‌دی‌اف' },
};

class CreateWidgetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      page: 0,
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeModal = () => {
    this.setState({ open: false });
    if (!!this.props.onClose) {
      this.props.onClose();
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault();
    let { page, type } = this.state;
    if (page === 0) {
      if (type) {
        page += 1;
        this.setState({ page });
      }
    } else if (page === 1) {
      this.props.createWidget(this.widgetCreator.getData()).then(() => {
        window.location.reload();
      });
    }
    return false;
  };

  render() {
    const { closeModal, page, type } = this.state;
    return (
      <Modal
        onClose={closeModal}
        onOpen={() => this.setState({ open: true })}
        open={this.state.open}
        size={page === 0 ? 'mini' : 'small'}
        style={{ direction: 'rtl', textAlign: 'right' }}
        trigger={this.props.trigger}
      >
        <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
          ساخت ویجت جدید
          {type ? <small>({widgetOptions[type].text})</small> : ''}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              {page === 0 ? (
                <Form.Select
                  required
                  name="type"
                  options={Object.keys(widgetOptions).map(
                    (widgetOptionKey) => ({
                      key: widgetOptionKey,
                      value: widgetOptions[widgetOptionKey].value,
                      text: widgetOptions[widgetOptionKey].text,
                    })
                  )}
                  label="نوع ویجت را انتخاب کنید."
                  className="rtl-input rtl-placeholder"
                  onChange={this.handleChange}
                />
              ) : (
                <CreateWidget
                  widget_type={type}
                  ref={(ref) => (this.widgetCreator = ref)}
                  pageId={this.props.pageId}
                />
              )}
              <input id="submit-btn" type="submit" hidden />
            </Form>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions
          style={{
            textAlign: 'left',
          }}
        >
          <Button
            color="red"
            onClick={() => this.setState({ open: false, page: 0 })}
          >
            لغو
          </Button>
          <Button
            primary={page === 0 ? true : false}
            positive={page === 1 ? true : false}
            onClick={() => {
              document.getElementById('submit-btn').click();
            }}
          >
            {page === 0 ? 'بعدی' : 'ثبت'}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { createWidget })(CreateWidgetModal);
