import React from 'react';
import { Form } from 'semantic-ui-react';

export default function MySelect(props) {
  return (
    <Form.Field {...props.field_props}>
      <select {...props}>
        <option value="" disabled selected hidden>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </Form.Field>
  );
}
