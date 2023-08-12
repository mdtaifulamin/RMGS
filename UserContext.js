import React, { createContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext();

// UserContext Provider
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Update user information
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
