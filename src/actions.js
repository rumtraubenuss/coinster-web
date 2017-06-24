export const DO_FOO = 'DO_FOO';

export const doFoo = () => {
  console.log('foo');
  return { type: DO_FOO };
};
