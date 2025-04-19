import axios from 'axios';
import {
  PATIENT_DASHBOARD_REQUEST,
  PATIENT_DASHBOARD_SUCCESS,
  PATIENT_DASHBOARD_FAIL,
  PATIENT_BLOOD_REQUEST_CREATE_REQUEST,
  PATIENT_BLOOD_REQUEST_CREATE_SUCCESS,
  PATIENT_BLOOD_REQUEST_CREATE_FAIL,
  PATIENT_BLOOD_REQUEST_HISTORY_REQUEST,
  PATIENT_BLOOD_REQUEST_HISTORY_SUCCESS,
  PATIENT_BLOOD_REQUEST_HISTORY_FAIL,
} from '../constants/patientConstants';

// Get patient dashboard data
export const getPatientDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DASHBOARD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/patients/dashboard', config);

    dispatch({
      type: PATIENT_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create blood request (patient)
export const createPatientBloodRequest = (requestData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_BLOOD_REQUEST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/patients/request-blood', requestData, config);

    dispatch({
      type: PATIENT_BLOOD_REQUEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_BLOOD_REQUEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get blood request history (patient)
export const getPatientBloodRequestHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_BLOOD_REQUEST_HISTORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/patients/blood-requests', config);

    dispatch({
      type: PATIENT_BLOOD_REQUEST_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_BLOOD_REQUEST_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
