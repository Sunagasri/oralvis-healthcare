import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ScanCard from './ScanCard';

const DentistDashboard = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      const response = await API.get('/scans');
      setScans(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching scans:', error);
      setError('Failed to load scans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Patient Scans</h2>
        <div className="loading"></div>
        <p>Loading scans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Patient Scans</h2>
        <div className="error">{error}</div>
        <button onClick={fetchScans}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Patient Scans</h2>
      <div className="scans-container">
        {scans.length === 0 ? (
          <p>No scans available. When technicians upload scans, they will appear here.</p>
        ) : (
          scans.map(scan => (
            <ScanCard key={scan.id} scan={scan} />
          ))
        )}
      </div>
    </div>
  );
};

export default DentistDashboard;