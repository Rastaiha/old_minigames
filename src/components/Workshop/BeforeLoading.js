import React from 'react';
import { Segment, Placeholder } from 'semantic-ui-react';

export default function BeforeLoading () {
  return (
    <Segment loading>
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  );
}
