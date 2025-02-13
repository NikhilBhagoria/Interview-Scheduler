import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import InterviewForm from './components/InterviewForm/InterviewForm';
import GlobalStyles from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const theme = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  background: '#f8f9fa',
  text: '#212529',
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/schedule" element={<InterviewForm />} />
            <Route path="/edit/:id" element={<InterviewForm />} />
          </Routes>
          <ToastContainer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 