import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AssetList() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedAssets = assets.filter(item => item.id !== id);
    setAssets(updatedAssets);
    localStorage.setItem('assets', JSON.stringify(updatedAssets));
  };

  return (
    <div>
      <h2>Asset List</h2>
      <Link to="/add-asset">Add Asset</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/edit-asset/${item.id}`}>
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

export default AssetList;
