

import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateStudent.module.css'; 

function CreateStudent() {
  const [formData, setFormData] = useState({
    enrollment_code: '',
    student_name: '',
    gender: 'Girl',
    class: '',
    section: '',
    address: '',
    father_name: '',
    father_mobile_no: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateInput = () => {
    const { enrollment_code, father_mobile_no } = formData;

    // Validate mobile number to be exactly 10 digits
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(father_mobile_no)) {
      setError('Mobile number must be exactly 10 digits.');
      return false;
    }

    const enrollmentCodePattern = /^[0-9]{2}CIS[0-9]{4}$/;
    if (!enrollmentCodePattern.test(enrollment_code)) {
      setError('Enrollment code must follow the format: 23CIS1234.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    axios.post('http://localhost:5000/api/CreateStudents', formData)
      .then(response => {
        setSuccess('Student created successfully!');
        const timer = setTimeout(() => {
          setSuccess(null);
        }, 3000);
    
        setFormData({
          enrollment_code: '',
          student_name: '',
          gender: 'Girl',
          class: '',
          section: '',
          address: '',
          father_name: '',
          father_mobile_no: ''
        });
        setError(null);
        return () => clearTimeout(timer);
      })
      .catch(error => {
        setError('An error occurred while creating the student \n or\n  Student with this Enrollment Code already present');
        setSuccess(null);
      });
  };

  return (
    <div>
      <h1>Create Student</h1>
      <div className={styles.container}>
        {success && <p className={styles.successMessage}>{success}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="enrollment_code">Enrollment Code ( 23CIS1234 )</label>
            <input
              type="text"
              id="enrollment_code"
              name="enrollment_code"
              value={formData.enrollment_code}
              onChange={handleChange}
              maxLength={9}
              minLength={9}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="student_name">Student Name</label>
            <input
              type="text"
              id="student_name"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="father_name">Father's Name</label>
            <input
              type="text"
              id="father_name"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="father_mobile_no">Father's Mobile No</label>
            <input
              type="text"
              id="father_mobile_no"
              name="father_mobile_no"
              value={formData.father_mobile_no}
              onChange={handleChange}
              maxLength={10}
              minLength={10}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
