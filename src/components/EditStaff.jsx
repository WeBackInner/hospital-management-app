import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditStaff() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedStaff = localStorage.getItem('staff');
    if (storedStaff) {
      const staffList = JSON.parse(storedStaff);
      const staffToEdit = staffList.find(item => item.id === id);
      if (staffToEdit) {
        setName(staffToEdit.name);
        setRole(staffToEdit.role);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) {
      setError('Please fill in all fields.');
      return;
    }

    const storedStaff = localStorage.getItem('staff');
    if (storedStaff) {
      const staffList = JSON.parse(storedStaff);
      const updatedStaffList = staffList.map(item => {
        if (item.id === id) {
          return { ...item, name, role };
        }
        return item;
      });
      localStorage.setItem('staff', JSON.stringify(updatedStaffList));
      navigate('/');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Staff</h2>
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
        <button type="submit">Update Staff</button>
      </form>
    </div>
  );
}

export default EditStaff;
