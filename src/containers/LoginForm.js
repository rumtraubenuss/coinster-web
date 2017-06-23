import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

const mapStateToProps = () => ({
  foo: 'FOO',
});

export default connect(mapStateToProps)(LoginForm);
