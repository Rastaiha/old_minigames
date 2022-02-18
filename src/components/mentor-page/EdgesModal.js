import React, { useState } from 'react';
import { Modal, Button, Form, Icon, Divider } from 'semantic-ui-react';
import { editEdges } from '../../redux/actions/fsm';
import { connect } from 'react-redux';

function EdgesModal({
  setOpen,
  open,
  states,
  state_id,
  editEdges,
  initEdges = [{ text: '', head: null, tail: state_id, priority: 1 }],
}) {
  const [edges, setEdges] = useState(initEdges);
  if (edges.length === 0) {
    if (initEdges.length === 0) {
      setEdges([{ text: '', head: null, tail: state_id, priority: 1 }]);
    } else {
      setEdges(initEdges);
    }
  } else if (edges[0].tail !== state_id) {
    setEdges(initEdges);
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      style={{ direction: 'rtl', textAlign: 'right' }}
    >
      <Modal.Header as="h3" style={{ textAlign: 'center', fontWeight: 800 }}>
        انتقال‌ها
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            {edges.map((edge, index) => (
              <>
                <Form.Input
                  required
                  label="توضیح"
                  className="rtl-input rtl-placeholder"
                  value={edge.text}
                  onChange={(e, { value }) =>
                    setEdges(
                      edges.map((item, idx) => {
                        if (idx !== index) {
                          return item;
                        }
                        return {
                          ...item,
                          text: value,
                        };
                      })
                    )
                  }
                />
                <Form.Select
                  required
                  label="مقصد"
                  className="rtl-input rtl-placeholder"
                  value={edge.head}
                  options={
                    states
                      ? states
                          .filter((state) => state.id !== state_id)
                          .map((state) => ({
                            key: state.id,
                            value: state.id,
                            text: state.name,
                          }))
                      : []
                  }
                  onChange={(e, { value }) =>
                    setEdges(
                      edges.map((item, idx) => {
                        if (idx !== index) {
                          return item;
                        }
                        return {
                          ...item,
                          head: value,
                        };
                      })
                    )
                  }
                />
                <Divider />
              </>
            ))}

            <div>
              <Icon
                name="plus square"
                color="green"
                style={{ margin: '0 2px 5px' }}
                onClick={() =>
                  setEdges([
                    ...edges,
                    { text: '', head: null, tail: state_id, priority: 1 },
                  ])
                }
              />
              <Icon
                name="minus square"
                color="red"
                style={{ margin: '0 2px 5px' }}
                disabled={edges.length > 1 ? false : true}
                onClick={() => {
                  if (edges.length > 1) {
                    setEdges(edges.slice(0, -1));
                  }
                }}
              />
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions
        style={{
          textAlign: 'left',
        }}
      >
        <Button
          onClick={() => {
            let error = false;
            edges.forEach((edge) => {
              if (!edge.head) {
                error = true;
              }
            });
            if (!error) {
              editEdges({ tail: state_id, edges });
            }
          }}
          positive
        >
          ذخیره
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
export default connect(null, { editEdges })(EdgesModal);
