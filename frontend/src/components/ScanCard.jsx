import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ScanCard = ({ scan }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const generatePDF = async () => {
    try {
      // Create a temporary element to hold the PDF content
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #2c3e50; text-align: center;">OralVis Healthcare</h1>
          <h2 style="color: #3498db;">Patient Scan Report</h2>
          <hr>
          <h3>Patient Information</h3>
          <p><strong>Name:</strong> ${scan.patient_name}</p>
          <p><strong>ID:</strong> ${scan.patient_id}</p>
          <p><strong>Scan Type:</strong> ${scan.scan_type}</p>
          <p><strong>Region:</strong> ${scan.region}</p>
          <p><strong>Upload Date:</strong> ${new Date(scan.upload_date).toLocaleDateString()}</p>
          <hr>
          <h3>Scan Image</h3>
          <img src="http://localhost:5000/${scan.image_url}" style="max-width: 100%;" />
        </div>
      `;
      
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`scan-report-${scan.patient_id}.pdf`);
      
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="scan-card">
      <h3>{scan.patient_name} (ID: {scan.patient_id})</h3>
      <p><strong>Scan Type:</strong> {scan.scan_type}</p>
      <p><strong>Region:</strong> {scan.region}</p>
      <p><strong>Upload Date:</strong> {new Date(scan.upload_date).toLocaleDateString()}</p>
      
      <div className="image-preview">
        {imageError ? (
          <div className="image-placeholder">
            <span>Image not available</span>
          </div>
        ) : (
          <img 
            src={`http://localhost:5000/${scan.image_url}`} 
            alt={`Scan of ${scan.patient_name}`}
            onError={handleImageError}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}
      </div>
      
      <div className="actions">
        <button onClick={() => window.open(`http://localhost:5000/${scan.image_url}`, '_blank')}>
          View Full Image
        </button>
        <button onClick={generatePDF}>Download PDF Report</button>
      </div>
    </div>
  );
};

export default ScanCard;