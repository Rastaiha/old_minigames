import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

export default function GradeModal({ onSubmit, edges }) {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState(false);
  const [edge, setEdge] = useState(false);

  return (
    <>
      <Button basic fluid onClick={() => setOpen(true)}>
        ارزیابی
      </Button>
      <Modal open={open} size="mini">
        <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
          ارزیابی
        </Modal.Header>

        <Modal.Content>
          <Modal.Description style={{ textAlign: 'right' }}>
            <Form>
              <Form.Input
                label="نمره"
                required
                name="grade"
                placeholder="از ۱۰۰ نمره"
                type="number"
                value={grade}
                className="ltr-input rtl-placeholder"
                max={100}
                min={0}
                onChange={(e, { value }) => setGrade(value)}
              />
              <Form.Select
                label="انتقال"
                name="edge"
                value={edge}
                options={
                  edges
                    ? edges.map((edge) => ({
                        key: edge.id,
                        value: edge.id,
                        text: edge.text,
                      }))
                    : []
                }
                required
                className="ltr-input rtl-placeholder"
                onChange={(e, { value }) => setEdge(value)}
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
            positive
            onClick={() => {
              if (edge && grade) {
                onSubmit(grade, edge);
                setOpen(false);
              }
            }}
          >
            ثبت
          </Button>
          <Button primary onClick={() => setOpen(false)}>
            لغو
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
