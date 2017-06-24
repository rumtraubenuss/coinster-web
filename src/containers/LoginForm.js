import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { doFoo } from '../actions';

const mapStateToProps = () => ({
  foo: 'FOO',
});
const mapDispatchToProps = { doFoo };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
