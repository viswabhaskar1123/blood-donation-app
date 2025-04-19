import axios from 'axios';
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
  DONOR_DELETE_REQUEST,
  DONOR_DELETE_SUCCESS,
  DONOR_DELETE_FAIL,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  DONATION_REQUEST_LIST_REQUEST,
  DONATION_REQUEST_LIST_SUCCESS,
  DONATION_REQUEST_LIST_FAIL,
  DONATION_REQUEST_UPDATE_REQUEST,
  DONATION_REQUEST_UPDATE_SUCCESS,
  DONATION_REQUEST_UPDATE_FAIL,
  BLOOD_REQUEST_LIST_REQUEST,
  BLOOD_REQUEST_LIST_SUCCESS,
  BLOOD_REQUEST_LIST_FAIL,
  BLOOD_REQUEST_UPDATE_REQUEST,
  BLOOD_REQUEST_UPDATE_SUCCESS,
  BLOOD_REQUEST_UPDATE_FAIL,
  BLOOD_STOCK_UPDATE_REQUEST,
  BLOOD_STOCK_UPDATE_SUCCESS,
  BLOOD_STOCK_UPDATE_FAIL,
} from '../constants/adminConstants';

// Get admin dashboard data
export const getAdminDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DASHBOARD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/admin/dashboard', config);

    dispatch({
      type: ADMIN_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all donors
export const listDonors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/admin/donors', config);

    dispatch({
      type: DONOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update donor
export const updateDonor = (donor) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/admin/donors/${donor._id}`, donor, config);

    dispatch({
      type: DONOR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete donor
export const deleteDonor = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/admin/donors/${id}`, config);

    dispatch({ type: DONOR_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DONOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all patients
export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/admin/patients', config);

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update patient
export const updatePatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/admin/patients/${patient._id}`, patient, config);

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete patient
export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/admin/patients/${id}`, config);

    dispatch({ type: PATIENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all donation requests
export const listDonationRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_REQUEST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/admin/donation-requests', config);

    dispatch({
      type: DONATION_REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATION_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update donation request status
export const updateDonationRequest = (id, status, adminNote) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONATION_REQUEST_UPDATE_REQUEST });

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
      `http://localhost:5000/api/admin/donation-requests/${id}`,
      { status, adminNote },
      config
    );

    dispatch({
      type: DONATION_REQUEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATION_REQUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get all blood requests
export const listBloodRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOOD_REQUEST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://localhost:5000/api/admin/blood-requests', config);

    dispatch({
      type: BLOOD_REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update blood request status
export const updateBloodRequest = (id, status, adminNote) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOOD_REQUEST_UPDATE_REQUEST });

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
      `http://localhost:5000/api/admin/blood-requests/${id}`,
      { status, adminNote },
      config
    );

    dispatch({
      type: BLOOD_REQUEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_UPDATE_FAIL,
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
