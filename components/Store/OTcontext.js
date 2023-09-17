
import React, { createContext, useState } from 'react';

const OTContext = createContext();

export const OTProvider = ({ children }) => {
  const [otInfo, setOTInfo] = useState(null);

  return (
    <OTContext.Provider value={{ otInfo, setOTInfo }}>
      {children}
    </OTContext.Provider>
  );
};

export default OTContext;
