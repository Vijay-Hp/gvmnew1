import React, { createContext, useState } from "react";

export const dataContext = createContext({
  purchaseData: {},
  updatePurchaseData: () => {},
  updateDropdownPurchaseData: () => {},
});

export default function DataContextProvider({ children }) {
  const [purchaseData, setPurchaseData] = useState({});

  const updatePurchaseData = (data) => {
    console.log("updatePurchaseData");
    setPurchaseData(data);
  };
  const updateDropdownPurchaseData = (data) => {
    setPurchaseData({ ...purchaseData, dropDownValue: data });
  };
  console.log("purchaseData", purchaseData);
  return (
    <dataContext.Provider
      value={{
        purchaseData,
        setPurchaseData,
        handleDataChange: updatePurchaseData,
        updateDropdownPurchaseData,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}
