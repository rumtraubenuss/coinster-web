import { connect } from 'react-redux';
import PriceList from './PriceList';

const mapStateToProps = () => ({});
const mapDispatchToProps = { foo: () => {} };

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
