import React from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import TechnicianDashboard from './components/TechnicianDashboard';
import DentistDashboard from './components/DentistDashboard';
import './App.css';

function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <header>
        <h1>OralVis Healthcare</h1>
        <div>
          <span>Welcome, {user.email} ({user.role}) </span>
          <button onClick={logout} style={{marginLeft: '15px', padding: '5px 10px'}}>
            Logout
          </button>
        </div>
      </header>
      <main>
        {user.role === 'technician' && <TechnicianDashboard />}
        {user.role === 'dentist' && <DentistDashboard />}
      </main>
    </div>
  );
}

export default App;