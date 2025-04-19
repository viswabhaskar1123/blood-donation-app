import {
    ADMIN_DASHBOARD_REQUEST,
    ADMIN_DASHBOARD_SUCCESS,
    ADMIN_DASHBOARD_FAIL,
    DONOR_LIST_REQUEST,
    DONOR_LIST_SUCCESS,
    DONOR_LIST_FAIL,
    DONOR_UPDATE_REQUEST,
    DONOR_UPDATE_SUCCESS,
    DONOR_UPDATE_FAIL,
    DONOR_UPDATE_RESET,
    DONOR_DELETE_REQUEST,
    DONOR_DELETE_SUCCESS,
    DONOR_DELETE_FAIL,
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAIL,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAIL,
    PATIENT_UPDATE_RESET,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_SUCCESS,
    PATIENT_DELETE_FAIL,
    DONATION_REQUEST_LIST_REQUEST,
    DONATION_REQUEST_LIST_SUCCESS,
    DONATION_REQUEST_LIST_FAIL,
    DONATION_REQUEST_UPDATE_REQUEST,
    DONATION_REQUEST_UPDATE_SUCCESS,
    DONATION_REQUEST_UPDATE_FAIL,
    DONATION_REQUEST_UPDATE_RESET,
    BLOOD_REQUEST_LIST_REQUEST,
    BLOOD_REQUEST_LIST_SUCCESS,
    BLOOD_REQUEST_LIST_FAIL,
    BLOOD_REQUEST_UPDATE_REQUEST,
    BLOOD_REQUEST_UPDATE_SUCCESS,
    BLOOD_REQUEST_UPDATE_FAIL,
    BLOOD_REQUEST_UPDATE_RESET,
    BLOOD_STOCK_UPDATE_REQUEST,
    BLOOD_STOCK_UPDATE_SUCCESS,
    BLOOD_STOCK_UPDATE_FAIL,
    BLOOD_STOCK_UPDATE_RESET,
  } from '../constants/adminConstants';
  
  export const adminDashboardReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case ADMIN_DASHBOARD_REQUEST:
        return { loading: true };
      case ADMIN_DASHBOARD_SUCCESS:
        return { loading: false, data: action.payload };
      case ADMIN_DASHBOARD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const donorListReducer = (state = { donors: [] }, action) => {
    switch (action.type) {
      case DONOR_LIST_REQUEST:
        return { loading: true };
      case DONOR_LIST_SUCCESS:
        return { loading: false, donors: action.payload };
      case DONOR_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const donorUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case DONOR_UPDATE_REQUEST:
        return { loading: true };
      case DONOR_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case DONOR_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case DONOR_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const donorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DONOR_DELETE_REQUEST:
        return { loading: true };
      case DONOR_DELETE_SUCCESS:
        return { loading: false, success: true };
      case DONOR_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const patientListReducer = (state = { patients: [] }, action) => {
    switch (action.type) {
      case PATIENT_LIST_REQUEST:
        return { loading: true };
      case PATIENT_LIST_SUCCESS:
        return { loading: false, patients: action.payload };
      case PATIENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const patientUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_UPDATE_REQUEST:
        return { loading: true };
      case PATIENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PATIENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PATIENT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const patientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_DELETE_REQUEST:
        return { loading: true };
      case PATIENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PATIENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const donationRequestListReducer = (state = { donationRequests: [] }, action) => {
    switch (action.type) {
      case DONATION_REQUEST_LIST_REQUEST:
        return { loading: true };
      case DONATION_REQUEST_LIST_SUCCESS:
        return { loading: false, donationRequests: action.payload };
      case DONATION_REQUEST_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const donationRequestUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case DONATION_REQUEST_UPDATE_REQUEST:
        return { loading: true };
      case DONATION_REQUEST_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case DONATION_REQUEST_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case DONATION_REQUEST_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const bloodRequestListReducer = (state = { bloodRequests: [] }, action) => {
    switch (action.type) {
      case BLOOD_REQUEST_LIST_REQUEST:
        return { loading: true };
      case BLOOD_REQUEST_LIST_SUCCESS:
        return { loading: false, bloodRequests: action.payload };
      case BLOOD_REQUEST_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const bloodRequestUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOOD_REQUEST_UPDATE_REQUEST:
        return { loading: true };
      case BLOOD_REQUEST_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case BLOOD_REQUEST_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOOD_REQUEST_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const bloodStockUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOOD_STOCK_UPDATE_REQUEST:
        return { loading: true };
      case BLOOD_STOCK_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case BLOOD_STOCK_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOOD_STOCK_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  