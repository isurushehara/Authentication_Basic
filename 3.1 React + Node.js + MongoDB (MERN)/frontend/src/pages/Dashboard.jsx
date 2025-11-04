import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getJSON } from '../api';
import '../styles/dashboard.css';

export default function Dashboard(){
  const { user, token, logout } = useContext(AuthContext);
  const [protectedData, setProtectedData] = useState('');

  useEffect(() => {
    async function fetchData(){
      const { ok, data } = await getJSON('/api/protected', token);
      if (ok) setProtectedData(data.message);
      else {
        alert('Session expired');
        logout();
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h2>Welcome, {user?.username}</h2>
        <p>{protectedData}</p>
        <div className="actions">
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
