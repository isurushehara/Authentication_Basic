import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getJSON } from '../api';

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
    <div>
      <h2>Welcome, {user?.username}</h2>
      <p>{protectedData}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
