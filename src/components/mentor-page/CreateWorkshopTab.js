import React, { useState } from 'react';
import {
  Container,
  Header,
  Button,
  Grid,
  Segment,
  Divider,
  Form,
} from 'semantic-ui-react';
import CreateWidgetModal from './CreateWidgetModal';
import Widget from './Widgets';
import EdgesModal from '../../components/mentor-page/EdgesModal';
import DeleteModal from '../Modals/DeleteModal';
import { deletePage } from '../../redux/actions/fsm';
import { connect } from 'react-redux';

function Preview({ name, widgets }) {
  return (
    <Grid columns={2} style={{ direction: 'ltr' }}>
      <Grid.Column computer={10} tablet={16} mobile={16}>
        <div className="workshop-content">
          {widgets
            .filter((widget) => !widget.widget_type.includes('Problem'))
            .sort((a, b) => a.id - b.id)
            .map((widget) => (
              <div style={{ margin: 5 }}>
                <Widget {...widget} />
              </div>
            ))}
        </div>
      </Grid.Column>
      <Grid.Column computer={6} tablet={16} mobile={16}>
        <div className="workshop-form">
          <Segment>
            <Header textAlign="center">{name}</Header>
            <Divider />
            <Form>
              {widgets
                .filter((widget) => widget.widget_type.includes('Problem'))
                .sort((a, b) => a.id - b.id)
                .map((widget) => (
                  <div style={{ margin: 5 }}>
                    <Widget {...widget} />
                  </div>
                ))}
              <Button positive fluid>
                ثبت پاسخ
              </Button>
            </Form>
          </Segment>
        </div>
      </Grid.Column>
    </Grid>
  );
}

function CreateWorkshopTab({ data, states, deletePage, page }) {
  const [edgesModalOpen, edgesModalSet] = useState(false);
  return (
    <Container>
      <div>
        <Button
          positive
          icon="exchange"
          onClick={() => edgesModalSet(!edgesModalOpen)}
        />
        {/* <span style={{ marginRight: 'auto', float: 'left' }}>
          <WhiteboardModal init={page.init_whiteboard}/>
        </span> */}
      </div>

      {page && page.widgets && page.widgets.length > 0 ? (
        <Preview {...page} name={page.state.name} />
      ) : (
        <div className="empty-widgets">
          <div>فعلا هیچ ویجتی در این گام موجود نیست!</div>
        </div>
      )}
      <CreateWidgetModal
        pageId={data.id}
        trigger={
          <Button primary style={{ margin: '30px auto', display: 'block' }}>
            ساختن ویجت
          </Button>
        }
      />
      <EdgesModal
        open={edgesModalOpen}
        setOpen={() => edgesModalSet(!edgesModalOpen)}
        states={states}
        state_id={data.id}
        initEdges={data.outward_edges}
      />

      <DeleteModal
        delBtnText="حذف گام"
        title={'حذف گام ' + data.name}
        description="آیا مایل به حذف گام هستید؟"
        onDelete={() =>
          deletePage({ id: data.id }).then(() => {
            window.location.reload();
          })
        }
      />
    </Container>
  );
}

export default connect(null, { deletePage })(CreateWorkshopTab);
