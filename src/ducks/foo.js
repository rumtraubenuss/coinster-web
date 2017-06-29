export const DO_FOO = 'DO_FOO';

const reducer = (state = {}) => state;

export const doFoo = () => {
  console.log('foo');
  return { type: DO_FOO };
};

export default reducer;
