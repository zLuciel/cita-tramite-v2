"use client";
import { createContext, useContext, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [documentSection, setDocumentSection] = useState([]);
  const [documentUser, setDocumentUser] = useState([]);
  const value = {
    user,
    setUser,
    documentSection,
    setDocumentSection,
    allUser, setAllUser,
    documentUser, setDocumentUser
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Context provider error");
  }
  return context;
};
