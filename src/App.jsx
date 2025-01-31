import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StaffList from './components/StaffList';
import AddStaff from './components/AddStaff';
import EditStaff from './components/EditStaff';
import AssetList from './components/AssetList';
import AddAsset from './components/AddAsset';
import EditAsset from './components/EditAsset';

function App() {
  return (
    <div className="container">
      <h1>Hospital Management System (WeBackIn)</h1>
      <nav>
        <Link to="/">Staff</Link>
        <Link to="/assets">Assets</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StaffList />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/edit-staff/:id" element={<EditStaff />} />
        <Route path="/assets" element={<AssetList />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/edit-asset/:id" element={<EditAsset />} />
      </Routes>
    </div>
  );
}

export default App;
