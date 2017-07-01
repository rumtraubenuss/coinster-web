export const LOAD = 'coinster/prices/LOAD';
export const LOAD_SUCCESS = 'coinster/prices/LOAD_SUCCESS';
export const LOAD_ERROR = 'coinster/prices/LOAD_ERROR';

const initialState = {
  prices: {},
  loading: false,
  lastReloadDate: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      default: return state;
  }
};

export const loadPrices = () => ({ type: LOAD });

export default reducer;
