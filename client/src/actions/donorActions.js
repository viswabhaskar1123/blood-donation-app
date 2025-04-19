import axios from 'axios';
import {
  DONOR_DASHBOARD_REQUEST,
  DONOR_DASHBOARD_SUCCESS,
  DONOR_DASHBOARD_FAIL,
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS,
  DONATION_CREATE_FAIL,
  DONATION_HISTORY_REQUEST,
  DONATION_HISTORY_SUCCESS,
  DONATION_HISTORY_FAIL,
  DONOR_BLOOD_REQUEST_CREATE_REQUEST,
  DONOR_BLOOD_REQUEST_CREATE_SUCCESS,
  DONOR_BLOOD_REQUEST_CREATE_FAIL,
  DONOR_BLOOD_REQUEST_HISTORY_REQUEST,
  DONOR_BLOOD_REQUEST_HISTORY_SUCCESS,
  DONOR_BLOOD_REQUEST_HISTORY_FAIL,
} from '../constants/donorConstants';

// Get donor dashboard data
export const getDonorDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_DASHBOARD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/donors/dashboard', config);

    dispatch({
      type: DONOR_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create donation request
export const createDonationRequest = (donationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/donors/donate', donationData, config);

    dispatch({
      type: DONATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get donation history
export const getDonationHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_HISTORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/donors/donations', config);

    dispatch({
      type: DONATION_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATION_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create blood request (donor)
export const createDonorBloodRequest = (requestData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_BLOOD_REQUEST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/donors/request-blood', requestData, config);

    dispatch({
      type: DONOR_BLOOD_REQUEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_BLOOD_REQUEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get blood request history (donor)
export const getDonorBloodRequestHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_BLOOD_REQUEST_HISTORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/donors/blood-requests', config);

    dispatch({
      type: DONOR_BLOOD_REQUEST_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_BLOOD_REQUEST_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
