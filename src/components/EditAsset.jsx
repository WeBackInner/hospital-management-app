import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditAsset() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      const assetList = JSON.parse(storedAssets);
      const assetToEdit = assetList.find(item => item.id === id);
      if (assetToEdit) {
        setName(assetToEdit.name);
        setType(assetToEdit.type);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type) {
      setError('Please fill in all fields.');
      return;
    }

    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      const assetList = JSON.parse(storedAssets);
      const updatedAssetList = assetList.map(item => {
        if (item.id === id) {
          return { ...item, name, type };
        }
        return item;
      });
      localStorage.setItem('assets', JSON.stringify(updatedAssetList));
      navigate('/assets');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Asset</h2>
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
        <button type="submit">Update Asset</button>
      </form>
    </div>
  );
}

export default EditAsset;
