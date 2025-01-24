import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function AddStaff() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) {
      setError('Please fill in all fields.');
      return;
    }

    const newStaff = {
      id: uuidv4(),
      name,
      role,
    };

    const storedStaff = localStorage.getItem('staff');
    const staffList = storedStaff ? JSON.parse(storedStaff) : [];
    staffList.push(newStaff);
    localStorage.setItem('staff', JSON.stringify(staffList));
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
