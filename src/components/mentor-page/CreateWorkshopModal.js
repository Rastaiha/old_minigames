import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { create } from '../../redux/actions/fsm';
import { connect } from 'react-redux';

function CreateWorkshopModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const closeModal = () => {
    setOpen(false);
    if (!!props.onClose) {
      props.onClose();
    }
  };

  return (
    <Modal
      onClose={closeModal}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      style={{ direction: 'rtl', textAlign: 'right' }}
      trigger={props.trigger}
    >
      <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
        ساخت کارگاه
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              required
              label="نام‌کارگاه"
              className="rtl-input rtl-placeholder"
              onChange={(e, { name, value }) => setName(value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions
        style={{
          textAlign: 'left',
        }}
      >
        <Button onClick={() => props.create({ name })} positive>
          ایجاد
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default connect(null, { create })(CreateWorkshopModal);
