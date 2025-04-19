// actions/bloodActions.js
import axios from 'axios';
import {
  BLOOD_STOCK_REQUEST,
  BLOOD_STOCK_SUCCESS,
  BLOOD_STOCK_FAIL,
  BLOOD_STOCK_UPDATE_REQUEST,
  BLOOD_STOCK_UPDATE_SUCCESS,
  BLOOD_STOCK_UPDATE_FAIL,
} from '../constants/bloodConstants';

// Get blood stock
export const getBloodStock = () => async (dispatch) => {
  try {
    dispatch({ type: BLOOD_STOCK_REQUEST });

    const { data } = await axios.get('http://localhost:5000/api/blood/stock');

    dispatch({
      type: BLOOD_STOCK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update blood stock
export const updateBloodStock = (bloodGroup, units) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOOD_STOCK_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/admin/blood-stock/${bloodGroup}`,
      { units },
      config
    );

    dispatch({
      type: BLOOD_STOCK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_STOCK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
