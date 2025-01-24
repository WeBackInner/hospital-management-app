import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function AddAsset() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      setError('Please fill in all fields.');
      return;
    }

    const newAsset = {
      id: uuidv4(),
      name,
      type,
    };

    const storedAssets = localStorage.getItem('assets');
    const assetList = storedAssets ? JSON.parse(storedAssets) : [];
    assetList.push(newAsset);
    localStorage.setItem('assets', JSON.stringify(assetList));
    navigate('/assets');
  };

  return (
    <div className="form-container">
      <h2>Add Asset</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
}

export default AddAsset;
