export const DO_FOO = 'DO_FOO';

const reducer = (state = {}) => state;

export const doFoo = () => {
  return { type: DO_FOO };
};

export default reducer;
