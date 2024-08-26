
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QrScanner from 'react-qr-scanner';  
import styles from './Scanner.module.css'; 
import { BorderRight } from '@mui/icons-material';

const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleScanAgain = () => {
    setScanResult('');
    setStudent(null);
    setError(null);
  };

  useEffect(() => {
    if (scanResult) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/students/${scanResult}`)
        .then(response => {
          setStudent(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setError("Student not found");
          } else {
            setError("An error occurred ",error.response);
          }
          setLoading(false);
        });
    }
  }, [scanResult]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      
      { !scanResult && 
        <div>
          <h1> Scan QR Code ...!</h1>
          <p>{scanResult ? `Scan Successful` : 'No QR code scanned yet'}</p>
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          // style={{ width: '50%', height: '50vh' }}
          className={styles.QrScanner}

        />
        </div>
      }

      

      { error && (
        <div> 
          <h2>{error}</h2>
          <button className={styles.scanAgainButton} onClick={handleScanAgain}>Scan Again</button>
        </div>
      )}

      { scanResult && student && !error && (
        <div className={styles.container}>
          <div className={styles.scanAgain}> 
            <button onClick={handleScanAgain}>Scan Again</button>
          </div>
          <div className={styles.sections}>
            <section className={styles.details}>
              <h2 className={styles.heading}>Student Details</h2>
              <h2><strong>Student Name:</strong> {student.student_name}</h2>
              <h4><strong>Enrollment Code:</strong> {student.enrollment_code}</h4>
              <p><strong>Gender:</strong> {student.gender}</p>
              <p><strong>Class:</strong> {student.class}</p>
              <p><strong>Section:</strong> {student.section}</p>
              <p><strong>Address:</strong> {student.address}</p>
            </section>
            <section className={styles.guardian}>
              <h2 className={styles.heading}>Guardian Details</h2>
              <p><strong>Father's Name:</strong> {student.father_name}</p>
              <p><strong>Father's Mobile No:</strong> {student.father_mobile_no}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
