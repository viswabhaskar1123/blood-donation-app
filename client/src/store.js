import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // fixed import

// Reducers
import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/authReducers';

import {
  adminDashboardReducer,
  donorListReducer,
  donorUpdateReducer,
  donorDeleteReducer,
  patientListReducer,
  patientUpdateReducer,
  patientDeleteReducer,
  donationRequestListReducer,
  donationRequestUpdateReducer,
  bloodRequestListReducer,
  bloodRequestUpdateReducer,
  bloodStockUpdateReducer,
} from './reducers/adminReducers';

import {
  donorDashboardReducer,
  donationCreateReducer,
  donationHistoryReducer,
  donorBloodRequestCreateReducer,
  donorBloodRequestHistoryReducer,
} from './reducers/donorReducers';

import {
  patientDashboardReducer,
  patientBloodRequestCreateReducer,
  patientBloodRequestHistoryReducer,
} from './reducers/patientReducers';

import { bloodStockReducer } from './reducers/bloodReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  
  adminDashboard: adminDashboardReducer,
  donorList: donorListReducer,
  donorUpdate: donorUpdateReducer,
  donorDelete: donorDeleteReducer,
  patientList: patientListReducer,
  patientUpdate: patientUpdateReducer,
  patientDelete: patientDeleteReducer,
  donationRequestList: donationRequestListReducer,
  donationRequestUpdate: donationRequestUpdateReducer,
  bloodRequestList: bloodRequestListReducer,
  bloodRequestUpdate: bloodRequestUpdateReducer,
  bloodStockUpdate: bloodStockUpdateReducer,
  
  donorDashboard: donorDashboardReducer,
  donationCreate: donationCreateReducer,
  donationHistory: donationHistoryReducer,
  donorBloodRequestCreate: donorBloodRequestCreateReducer,
  donorBloodRequestHistory: donorBloodRequestHistoryReducer,
  
  patientDashboard: patientDashboardReducer,
  patientBloodRequestCreate: patientBloodRequestCreateReducer,
  patientBloodRequestHistory: patientBloodRequestHistoryReducer,
  
  bloodStock: bloodStockReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// ✅ Use native browser Redux DevTools support (no extra package)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
