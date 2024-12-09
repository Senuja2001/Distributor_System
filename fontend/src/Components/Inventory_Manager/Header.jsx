import React, { useEffect, useState } from 'react';

const Header = () => {
  const [lastLogin, setLastLogin] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setLastLogin(`${formattedDate} ${formattedTime}`);
  }, []);

  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className="text-xl">Distribution Management System</h1>
      <div className="text-sm">
        <p>Welcome Gividu Elladeniya...</p>
        <p>Last Login: {lastLogin}</p>
      </div>
    </header>
  );
};

export default Header;
