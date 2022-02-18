import React from 'react';
import { Form } from 'semantic-ui-react';
import makeId from '../../utils/makeId';

export default function PasswordAndConfirm(props) {
  const passId = 'pass' + makeId(32);
  const confirmPassId = 'confirmPass' + makeId(32);

  const confirmPassword = () => {
    const pass = document.getElementById(passId);
    const confirmPass = document.getElementById(confirmPassId);
    if (pass.value !== confirmPass.value) {
      confirmPass.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPass.setCustomValidity('');
    }
  };
  return (
    <Form.Group unstackable>
      <Form.Input
        id={passId}
        name="password"
        required
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="رمز عبور"
        type="password"
        className="ltr-input rtl-placeholder"
        value={props.password}
        onChange={(e, { name, value }) => {
          props.handleChange(e, { name, value });
          confirmPassword();
        }}
        width={16}
      />

      <Form.Input
        id={confirmPassId}
        name="password_confirmation"
        required
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="تکرار رمز عبور"
        type="password"
        className="ltr-input rtl-placeholder"
        value={props.password_confirmation}
        onChange={(e, { name, value }) => {
          props.handleChange(e, { name, value });
          confirmPassword();
        }}
        width={16}
      />
    </Form.Group>
  );
}
