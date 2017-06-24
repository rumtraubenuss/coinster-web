import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const LoginForm = ({ foo, doFoo }) => (
  <div>
    <form>
      <FieldGroup
        id="formLoginEmail"
        type="email"
        placeholder="Email"
      />
      <FieldGroup
        id="formLoginPassword"
        type="password"
        placeholder="Password"
      />
    </form>
    <button type="button" onClick={doFoo}>{foo}</button>
  </div>
);

export default LoginForm;
