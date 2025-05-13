"use client";
import React, { useCallback, useEffect, useState } from "react";
import useTheme from "./hooks/useTheme";
import { Loader } from "@mantine/core";
import useCompany from "./hooks/useCompany";

const ClientOnly: React.FC<{
  children: React.ReactNode;
  companyData: CompanyProps;
}> = ({ children, companyData }) => {
  const { onInitialMode, mode } = useTheme();
  const { onCompany, company } = useCompany();
  const [isReady, setIsReady] = useState(false);

  const getCompany = useCallback(async () => {
    onCompany(companyData);
  }, [companyData, onCompany]);

  const fetchData = useCallback(async () => {
    if (isReady) {
      onInitialMode();
      await getCompany();
    }
  }, [getCompany, isReady, onInitialMode]);

  useEffect(() => {
    fetchData();
    setIsReady(true);
  }, [fetchData]);

  if (!company || !isReady) {
    return (
      <div
        className="h-[100vh] w-full flex items-center 
        justify-center bg-black"
      >
        <Loader color="#ffffff" />
      </div>
    );
  }

  return (
    <>
      {children}

useEffect(() => {
  if (typeof window !== "undefined" && isReady) {
    window.Tawk_API = window.Tawk_API || {1778317c1dd8d3c7fca1ae7dea62a7d3dbd060fd};
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/1ir50m1at";
    document.body.appendChild(script);
  }
}, [isReady]);
      
    </>
  );
};

export default ClientOnly;
