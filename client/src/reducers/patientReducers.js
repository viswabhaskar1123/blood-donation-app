import {
  PATIENT_DASHBOARD_REQUEST,
  PATIENT_DASHBOARD_SUCCESS,
  PATIENT_DASHBOARD_FAIL,
  PATIENT_BLOOD_REQUEST_CREATE_REQUEST,
  PATIENT_BLOOD_REQUEST_CREATE_SUCCESS,
  PATIENT_BLOOD_REQUEST_CREATE_FAIL,
  PATIENT_BLOOD_REQUEST_CREATE_RESET,
  PATIENT_BLOOD_REQUEST_HISTORY_REQUEST,
  PATIENT_BLOOD_REQUEST_HISTORY_SUCCESS,
  PATIENT_BLOOD_REQUEST_HISTORY_FAIL,
} from '../constants/patientConstants';

export const patientDashboardReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PATIENT_DASHBOARD_REQUEST:
      return { loading: true };
    case PATIENT_DASHBOARD_SUCCESS:
      return { loading: false, data: action.payload };
    case PATIENT_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientBloodRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_BLOOD_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case PATIENT_BLOOD_REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, request: action.payload };
    case PATIENT_BLOOD_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_BLOOD_REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const patientBloodRequestHistoryReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case PATIENT_BLOOD_REQUEST_HISTORY_REQUEST:
      return { loading: true };
    case PATIENT_BLOOD_REQUEST_HISTORY_SUCCESS:
      return { loading: false, requests: action.payload };
    case PATIENT_BLOOD_REQUEST_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
