import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { createState } from '../../redux/actions/fsm';
import { connect } from 'react-redux';

function CreateStateModal({ setOpen, open, createState, FSMId }) {
  const [name, setName] = useState('');
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
        ساخت گام جدید
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              required
              label="نام"
              className="rtl-input rtl-placeholder"
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Select
              required
              label="نوع گام"
              className="rtl-input rtl-placeholder"
              options={[
                {
                  key: 'team',
                  value: 'team',
                  text: 'تیمی',
                },
              ]}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions
        style={{
          textAlign: 'left',
        }}
      >
        <Button
          onClick={() =>
            createState({ stateName: name, FSMId }).then(() => {
              window.location.reload();
            })
          }
          positive
        >
          ایجاد
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default connect(null, { createState })(CreateStateModal);
