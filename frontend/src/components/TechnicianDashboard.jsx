import React, { useState } from 'react';
import API from '../services/api';

const TechnicianDashboard = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_id: '',
    scan_type: 'RGB',
    region: 'Frontal',
    image: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('patient_name', formData.patient_name);
    data.append('patient_id', formData.patient_id);
    data.append('scan_type', formData.scan_type);
    data.append('region', formData.region);
    data.append('image', formData.image);

    try {
      await API.post('/scans', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Scan uploaded successfully!');
      setFormData({
        patient_name: '',
        patient_id: '',
        scan_type: 'RGB',
        region: 'Frontal',
        image: null
      });
      // Clear file input
      document.getElementById('image-input').value = '';
    } catch (error) {
      setMessage('Error uploading scan: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Upload Patient Scan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            placeholder="Enter patient's full name"
          />
        </div>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            required
            placeholder="Enter patient ID"
          />
        </div>
        <div>
          <label>Scan Type:</label>
          <select name="scan_type" value={formData.scan_type} onChange={handleChange}>
            <option value="RGB">RGB</option>
          </select>
        </div>
        <div>
          <label>Region:</label>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="Frontal">Frontal</option>
            <option value="Upper Arch">Upper Arch</option>
            <option value="Lower Arch">Lower Arch</option>
          </select>
        </div>
        <div>
          <label>Scan Image (JPG/PNG):</label>
          <input
            id="image-input"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload Scan</button>
      </form>
      {message && <div className={message.includes('Error') ? 'error' : ''} style={{marginTop: '15px', padding: '10px'}}>{message}</div>}
    </div>
  );
};

export default TechnicianDashboard;