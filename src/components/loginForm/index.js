import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { doFoo } from './ducks';

const mapStateToProps = () => ({
  foo: 'FOO',
});
const mapDispatchToProps = { doFoo };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
