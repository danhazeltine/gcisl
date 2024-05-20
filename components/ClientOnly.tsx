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

      <script src="//code.jivosite.com/widget/BjSM8hU42b" async></script>
      
    </>
  );
};

export default ClientOnly;
