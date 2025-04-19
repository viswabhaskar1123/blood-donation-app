import {
  DONOR_DASHBOARD_REQUEST,
  DONOR_DASHBOARD_SUCCESS,
  DONOR_DASHBOARD_FAIL,
  DONATION_CREATE_REQUEST,
  DONATION_CREATE_SUCCESS,
  DONATION_CREATE_FAIL,
  DONATION_CREATE_RESET,
  DONATION_HISTORY_REQUEST,
  DONATION_HISTORY_SUCCESS,
  DONATION_HISTORY_FAIL,
  DONOR_BLOOD_REQUEST_CREATE_REQUEST,
  DONOR_BLOOD_REQUEST_CREATE_SUCCESS,
  DONOR_BLOOD_REQUEST_CREATE_FAIL,
  DONOR_BLOOD_REQUEST_CREATE_RESET,
  DONOR_BLOOD_REQUEST_HISTORY_REQUEST,
  DONOR_BLOOD_REQUEST_HISTORY_SUCCESS,
  DONOR_BLOOD_REQUEST_HISTORY_FAIL,
} from '../constants/donorConstants';

export const donorDashboardReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DONOR_DASHBOARD_REQUEST:
      return { loading: true };
    case DONOR_DASHBOARD_SUCCESS:
      return { loading: false, data: action.payload };
    case DONOR_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_CREATE_REQUEST:
      return { loading: true };
    case DONATION_CREATE_SUCCESS:
      return { loading: false, success: true, donation: action.payload };
    case DONATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const donationHistoryReducer = (state = { donations: [] }, action) => {
  switch (action.type) {
    case DONATION_HISTORY_REQUEST:
      return { loading: true };
    case DONATION_HISTORY_SUCCESS:
      return { loading: false, donations: action.payload };
    case DONATION_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const donorBloodRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DONOR_BLOOD_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case DONOR_BLOOD_REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, request: action.payload };
    case DONOR_BLOOD_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_BLOOD_REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const donorBloodRequestHistoryReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case DONOR_BLOOD_REQUEST_HISTORY_REQUEST:
      return { loading: true };
    case DONOR_BLOOD_REQUEST_HISTORY_SUCCESS:
      return { loading: false, requests: action.payload };
    case DONOR_BLOOD_REQUEST_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
