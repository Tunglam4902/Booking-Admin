import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/getuserlist');
      setData(response.data);

      const initialRoles = {};
      response.data.forEach((user) => {
        if (!initialRoles[user.user_id]) {
          initialRoles[user.user_id] = [];
        }
        initialRoles[user.user_id].push(user.name);
      });
      setSelectedRoles(initialRoles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateUserRoles = async (userId, newRole) => {
    try {
      const isChecked = selectedRoles[userId]?.includes(newRole);
  
      
      const currentRoleCount = selectedRoles[userId]?.length || 0;
  
      if (isChecked && currentRoleCount > 1) {
        
        await axios.post('http://localhost:3001/user/removeRole', { userId, role: newRole });
      } else if (!isChecked) {
        
        await axios.post('http://localhost:3001/user/addRole', { userId, role: newRole });
      }
  
      
      fetchData();
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };
  

  const renderUserList = () => {
    const sortedData = [...data].sort((a, b) => a.user_id - b.user_id);
  
    return sortedData.reduce((acc, user) => {
      const existingUser = acc.find((u) => u.user_id === user.user_id);
  
      if (existingUser) {
        existingUser.roles.push(user.name);
      } else {
        acc.push({ ...user, roles: [user.name] });
      }
  
      return acc;
    }, []).map(renderUser);
  };
  

  const renderUser = (user) => (
    <div key={user.user_id} className='admin-userlist'>
      <div className='user-info'>
        <strong>Username:</strong> {user.username}, <strong>User ID:</strong> {user.user_id}
      </div>
      <div className='role-selection'>
        {renderCheckbox('Admin', 'ROLE_ADMIN', user.user_id)}
        {renderCheckbox('User', 'ROLE_USER', user.user_id)}
        {renderCheckbox('Moderator', 'ROLE_MODERATOR', user.user_id)}
      </div>
    </div>
  );

  const renderCheckbox = (label, role, userId) => (
    <>
      <label htmlFor={`roleSelect_${userId}_${role}`}>{label}:</label>
      <input
        id={`roleSelect_${userId}_${role}`}
        type="checkbox"
        checked={selectedRoles[userId]?.includes(role)}
        onChange={() => updateUserRoles(userId, role)}
      />
    </>
  );

  return (
    <div className='admin-container'>
      <h1>Admin</h1>
      <ul>{renderUserList()}</ul>
    </div>
  );
};

export default Admin;
