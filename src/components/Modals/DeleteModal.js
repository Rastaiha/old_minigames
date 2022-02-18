import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default function DeleteModal({
  delBtnText,
  title,
  description,
  onDelete,
  delTrigger,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {delTrigger ? (
        <div onClick={() => setOpen(!open)}>{delTrigger}</div>
      ) : (
        <Button negative onClick={() => setOpen(!open)}>
          {delBtnText}
        </Button>
      )}

      <Modal open={open} size="mini">
        <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
          {title}
        </Modal.Header>

        <Modal.Content>
          <Modal.Description style={{ textAlign: 'right' }}>
            {description}
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions
          style={{
            textAlign: 'left',
          }}
        >
          <Button negative onClick={onDelete}>
            حذف
          </Button>
          <Button primary onClick={() => setOpen(false)}>
            لغو
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
