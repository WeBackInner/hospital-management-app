import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function StaffList() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const storedStaff = localStorage.getItem('staff');
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedStaff = staff.filter(item => item.id !== id);
    setStaff(updatedStaff);
    localStorage.setItem('staff', JSON.stringify(updatedStaff));
  };

  return (
    <div>
      <h2>Staff List</h2>
      <Link to="/add-staff">Add Staff + </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/edit-staff/${item.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffList;
