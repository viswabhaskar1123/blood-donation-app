import {
  BLOOD_STOCK_REQUEST,
  BLOOD_STOCK_SUCCESS,
  BLOOD_STOCK_FAIL,
} from '../constants/bloodConstants';

export const bloodStockReducer = (state = { bloodStock: [] }, action) => {
  switch (action.type) {
    case BLOOD_STOCK_REQUEST:
      return { loading: true, bloodStock: [] };
    case BLOOD_STOCK_SUCCESS:
      return { loading: false, bloodStock: action.payload };
    case BLOOD_STOCK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
