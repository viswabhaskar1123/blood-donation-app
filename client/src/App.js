// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminRegisterScreen from './screens/AdminRegisterScreen';
import DonorRegisterScreen from './screens/DonorRegisterScreen';
import PatientRegisterScreen from './screens/PatientRegisterScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminDonorsScreen from './screens/AdminDonorsScreen';
import AdminPatientsScreen from './screens/AdminPatientsScreen';
import AdminDonationRequestsScreen from './screens/AdminDonationRequestsScreen';
import AdminBloodRequestsScreen from './screens/AdminBloodRequestsScreen';
import AdminBloodStockScreen from './screens/AdminBloodStockScreen';
import DonorDashboardScreen from './screens/DonorDashboardScreen';
import DonorDonateScreen from './screens/DonorDonateScreen';
import DonorDonationHistoryScreen from './screens/DonorDonationHistoryScreen';
import DonorRequestBloodScreen from './screens/DonorRequestBloodScreen';
import DonorBloodRequestHistoryScreen from './screens/DonorBloodRequestHistoryScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import PatientRequestBloodScreen from './screens/PatientRequestBloodScreen';
import PatientBloodRequestHistoryScreen from './screens/PatientBloodRequestHistoryScreen';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/admin/register" element={<AdminRegisterScreen />} />
            <Route path="/donor/register" element={<DonorRegisterScreen />} />
            <Route path="/patient/register" element={<PatientRegisterScreen />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/admin/donors" element={<AdminDonorsScreen />} />
            <Route path="/admin/patients" element={<AdminPatientsScreen />} />
            <Route path="/admin/donation-requests" element={<AdminDonationRequestsScreen />} />
            <Route path="/admin/blood-requests" element={<AdminBloodRequestsScreen />} />
            <Route path="/admin/blood-stock" element={<AdminBloodStockScreen />} />
            
            {/* Donor Routes */}
            <Route path="/donor/dashboard" element={<DonorDashboardScreen />} />
            <Route path="/donor/donate" element={<DonorDonateScreen />} />
            <Route path="/donor/donation-history" element={<DonorDonationHistoryScreen />} />
            <Route path="/donor/request-blood" element={<DonorRequestBloodScreen />} />
            <Route path="/donor/blood-request-history" element={<DonorBloodRequestHistoryScreen />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboardScreen />} />
            <Route path="/patient/request-blood" element={<PatientRequestBloodScreen />} />
            <Route path="/patient/blood-request-history" element={<PatientBloodRequestHistoryScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
