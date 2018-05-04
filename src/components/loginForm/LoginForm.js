import React from 'react';
import { Button } from 'react-bootstrap';
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
    <Button
      onClick={doFoo}
      bsStyle="primary"
      bsSize="large"
      block
      disabled={false}
    >{foo}</Button>
  </div>
);

export default () => false;

// export default LoginForm;
