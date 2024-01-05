import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Perform any initial data fetching or setup logic here if needed
  }, []);

  const handleLogout = () => {
    // Remove the token from cookies
    localStorage.removeItem('token');
    
    // Redirect to the login page after logout
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Add content for the Home Page */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
